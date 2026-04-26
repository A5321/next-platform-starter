import { NextResponse } from "next/server";
import { sql } from "../../../../lib/db";

function getPaypalBase() {
  return process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

async function getPaypalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing PayPal credentials");
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(`${getPaypalBase()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal token error: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.access_token;
}

async function getPaypalOrder(orderId, accessToken) {
  const res = await fetch(`${getPaypalBase()}/v2/checkout/orders/${orderId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal order fetch error: ${res.status} ${text}`);
  }

  return res.json();
}

function extractCompletedCapture(order) {
  const purchaseUnits = order && order.purchase_units ? order.purchase_units : [];

  for (const pu of purchaseUnits) {
    const captures = pu && pu.payments && pu.payments.captures
      ? pu.payments.captures
      : [];
    for (const cap of captures) {
      if (cap && cap.status === "COMPLETED") {
        return cap;
      }
    }
  }

  return null;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const orderId = (body.orderId || "").trim();
    const intent = body.intent;
    const scope = (body.scope || "").trim();
    const email = (body.email || "").trim().toLowerCase();

    if (!orderId || !intent) {
      return NextResponse.json(
        { success: false, error: "Missing orderId or intent" },
        { status: 400 }
      );
    }

    if (intent === "full" && !email) {
      return NextResponse.json(
        { success: false, error: "Missing email for full access" },
        { status: 400 }
      );
    }

    if (intent === "single" && !scope) {
      return NextResponse.json(
        { success: false, error: "Missing scope for single purchase" },
        { status: 400 }
      );
    }

    const existing = await sql`
      SELECT id, scope, access_type, valid_until
      FROM access_entitlements
      WHERE external_id = ${orderId}
      LIMIT 1
    `;

    if (existing.length > 0) {
      return NextResponse.json({
        success: true,
        duplicate: true,
        entitlement: existing[0],
      });
    }

    const accessToken = await getPaypalAccessToken();
    const order = await getPaypalOrder(orderId, accessToken);

    const orderStatus = order && order.status;
    const completedCapture = extractCompletedCapture(order);

    const isPaid =
      orderStatus === "COMPLETED" || Boolean(completedCapture);

    if (!isPaid) {
      return NextResponse.json(
        {
          success: false,
          error: "Order is not completed",
          paypalStatus: orderStatus || null,
        },
        { status: 400 }
      );
    }

    const amountValue =
      completedCapture && completedCapture.amount
        ? completedCapture.amount.value
        : order &&
          order.purchase_units &&
          order.purchase_units[0] &&
          order.purchase_units[0].amount
        ? order.purchase_units[0].amount.value
        : null;

    const amountCurrency =
      completedCapture && completedCapture.amount
        ? completedCapture.amount.currency_code
        : order &&
          order.purchase_units &&
          order.purchase_units[0] &&
          order.purchase_units[0].amount
        ? order.purchase_units[0].amount.currency_code
        : null;

    if (intent === "single" && amountValue !== "3.00") {
      return NextResponse.json(
        {
          success: false,
          error: "Unexpected amount for single access",
          amountValue,
          amountCurrency,
        },
        { status: 400 }
      );
    }

    if (intent === "full" && amountValue !== "10.00") {
      return NextResponse.json(
        {
          success: false,
          error: "Unexpected amount for full access",
          amountValue,
          amountCurrency,
        },
        { status: 400 }
      );
    }

    if (amountCurrency && amountCurrency !== "USD") {
      return NextResponse.json(
        {
          success: false,
          error: "Unexpected currency",
          amountCurrency,
        },
        { status: 400 }
      );
    }

    const userEmail = email || `anon_${orderId}@paypal.local`;

    const userRows = await sql`
      INSERT INTO users (email)
      VALUES (${userEmail})
      ON CONFLICT (email)
      DO UPDATE SET email = EXCLUDED.email
      RETURNING id
    `;

    const userId = userRows[0] && userRows[0].id;

    if (!userId) {
      throw new Error("Failed to create or load user");
    }

    const entitlementScope = intent === "single" ? scope : "full_site";
    const accessType = intent === "single" ? "single" : "subscription";

    let inserted;

    if (intent === "full") {
      inserted = await sql`
        INSERT INTO access_entitlements
          (user_id, scope, access_type, valid_until, source, external_id)
        VALUES
          (
            ${userId},
            ${entitlementScope},
            ${accessType},
            now() + interval '30 days',
            ${"paypal"},
            ${orderId}
          )
        RETURNING id, scope, access_type, valid_until, external_id
      `;
    } else {
      inserted = await sql`
        INSERT INTO access_entitlements
          (user_id, scope, access_type, valid_until, source, external_id)
        VALUES
          (
            ${userId},
            ${entitlementScope},
            ${accessType},
            NULL,
            ${"paypal"},
            ${orderId}
          )
        RETURNING id, scope, access_type, valid_until, external_id
      `;
    }

    return NextResponse.json({
      success: true,
      entitlement: inserted[0] || null,
      paypalStatus: orderStatus || null,
    });
  } catch (error) {
    console.error("PayPal confirm error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error && error.message ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

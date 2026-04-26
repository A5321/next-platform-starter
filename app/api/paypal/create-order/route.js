import { NextResponse } from "next/server";

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

export async function POST(req) {
  try {
    const body = await req.json();
    const scope = (body.scope || "").trim();
    const tier = (body.tier || "").trim();

    if (!scope || !tier) {
      return NextResponse.json(
        { success: false, error: "Missing scope or tier" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://patternindex.io";
    const returnUrl = `${baseUrl}/tests/${scope}?token=PAYPAL_ORDER_ID&tier=${tier}`;
    const cancelUrl = `${baseUrl}/tests/${scope}?cancelled=true`;

    const description =
      tier === "hard"
        ? `${scope} — Exit Protocol`
        : `${scope} — Stabilization Protocol`;

    const accessToken = await getPaypalAccessToken();

    const res = await fetch(`${getPaypalBase()}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              value: "3.00",
              currency_code: "USD",
            },
            custom_id: `${scope}::${tier}`,
            description,
          },
        ],
        application_context: {
          return_url: returnUrl,
          cancel_url: cancelUrl,
          brand_name: "Pattern Index",
          user_action: "PAY_NOW",
          shipping_preference: "NO_SHIPPING",
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`PayPal order create error: ${res.status} ${text}`);
    }

    const order = await res.json();

    const approvalLink = order.links?.find((l) => l.rel === "approve");

    if (!approvalLink) {
      throw new Error("No approval URL in PayPal response");
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      approvalUrl: approvalLink.href,
    });
  } catch (error) {
    console.error("PayPal create-order error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}

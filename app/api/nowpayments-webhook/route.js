import crypto from "crypto";

const IPN_SECRET = "bSFF51fISobW+6ortPb1BT+1BUG9rQrq";

export async function POST(req) {
  const rawBody = await req.text();

  const signature = req.headers.get("x-nowpayments-sig");

  if (!signature) {
    return new Response("No signature", { status: 400 });
  }

  const hmac = crypto.createHmac("sha512", IPN_SECRET);
  hmac.update(rawBody);
  const computed = hmac.digest("hex");

  if (computed !== signature) {
    return new Response("Invalid signature", { status: 400 });
  }

  const data = JSON.parse(rawBody);

  console.log("✅ VERIFIED WEBHOOK:", data);

  if (data.payment_status === "finished") {
    console.log("💰 PAYMENT SUCCESS:", data.payment_id);

    // 👉 ТУТ БУДЕТ ЛОГИКА РАЗБЛОКИРОВКИ
  }

  return Response.json({ ok: true });
}

export async function POST() {
  const apiKey = process.env.NOWPAYMENTS_API_KEY;

  const response = await fetch("https://api.nowpayments.io/v1/invoice", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      price_amount: 11,
      price_currency: "usd",
      order_id: "test_" + Date.now(),
      order_description: "PatternIndex access",
      success_url: "https://patternindex.io/test/current-relationship?access=sub",
      cancel_url: "https://patternindex.io/test/current-relationship",
    }),
  });

  const data = await response.json();

  return Response.redirect(data.invoice_url, 302);
}

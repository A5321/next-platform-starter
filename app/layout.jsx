// app/layout.jsx
import Script from "next/script";

export const metadata = {
  title: "Pattern Index",
  description:
    "Pattern Index offers behavioral pattern tests and editorial articles about relationship dynamics, reciprocity, mixed signals, trust, and emotional stability.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) - OPTIMIZED: changed to lazyOnload */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HBZXLQ08X5"
          strategy="lazyOnload"
        />
        <Script id="ga4-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HBZXLQ08X5');
          `}
        </Script>
      </head>
      <body
        style={{
          margin: 0,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          backgroundColor: "#ffffff",
          color: "#1a1a1a",
        }}
      >
        {children}
        {/* PayPal SDK - KEPT HERE for now (move to payment pages later) */}
          <Script 
            src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`} 
            strategy="lazyOnload" 
          />
      </body>
    </html>
  );
}

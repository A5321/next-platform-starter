// app/layout.jsx

import Script from "next/script";

export const metadata = {
  title: "Pattern Index",
  description: "AI relationship pattern analysis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HBZXLQ08X5"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
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
            "-apple-system,BlinkMacSystemFont,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
          backgroundColor: "#111111",
          color: "#ffffff",
        }}
      >
        {children}
      </body>
    </html>
  );
}

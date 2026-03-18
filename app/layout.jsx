// app/layout.jsx

import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Pattern Index",
  description: "Pattern Index tests",
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
      <body>{children}</body>
    </html>
  );
}

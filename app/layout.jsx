export const metadata = {
  title: "Pattern Index",
  description: "AI relationship pattern analysis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            "-apple-system,BlinkMacSystemFont,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
          backgroundColor: "#111111", // тёмно‑серый фон страницы
          color: "#ffffff",
        }}
      >
        {children}
      </body>
    </html>
  );
}

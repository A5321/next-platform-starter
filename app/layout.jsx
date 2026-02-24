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
          background: "linear-gradient(#002b5c, #001020)",
          color: "grey",
        }}
      >
        {children}
      </body>
    </html>
  );
}

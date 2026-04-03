import "./globals.css";
import AppShell from "@/components/AppShell";

export const metadata = {
  title: "UZYNTRA",
  description: "Advanced API Threat Control Platform",
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="page-shell antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

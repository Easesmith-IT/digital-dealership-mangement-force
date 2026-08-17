import type { Metadata } from "next";
import "./globals.css";
import "./layout-fixes.css";
import "./sidebar-collapse.css";

export const metadata: Metadata = {
  title: "Force Goenka Dashboard",
  description: "Enterprise dealership intelligence presentation layer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

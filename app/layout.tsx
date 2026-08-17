import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

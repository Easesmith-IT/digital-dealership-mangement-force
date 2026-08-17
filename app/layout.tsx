import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Dealership Management Force",
  description: "Next.js frontend workspace",
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


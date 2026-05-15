import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SaasLink",
  description: "Link-in-bio SaaS platform for creators and small businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body>{children}</body>
    </html>
  );
}

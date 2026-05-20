import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SaasLink — Вашата линк страница",
  description: "Създайте своя Linktree-style профил с линкове, продукти и кампании на едно място. Безплатна регистрация.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "SaasLink — Вашата линк страница",
    description: "Създайте своя Linktree-style профил с линкове, продукти и кампании на едно място.",
    type: "website",
    locale: "bg_BG",
  },
  twitter: {
    card: "summary",
    title: "SaasLink",
    description: "Link-in-bio платформа за всички ваши линкове.",
  },
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

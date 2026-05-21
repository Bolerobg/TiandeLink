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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Hanken+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body>
        <script id="tailwind-config" type="application/json" dangerouslySetInnerHTML={{ __html: `{"theme":{"extend":{"colors":{"primary":"#1e0f0b","secondary":"#685e38","cream-surface":"#F2EFE9","soft-gold":"#C7B98B"}},"fontFamily":{"display-lg":["EB Garamond"],"headline-md":["EB Garamond"],"body-md":["Hanken Grotesk"]}}}` }} />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries" async />
        {children}
      </body>
    </html>
  );
}

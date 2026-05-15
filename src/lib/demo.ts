import { getDb } from "@/lib/db";

export async function ensureDemoProfile() {
  const db = getDb();

  const user = await db.user.upsert({
    where: { email: "founder@saaslink.local" },
    update: {},
    create: {
      email: "founder@saaslink.local",
      name: "SaasLink Founder",
      plan: "PRO",
    },
  });

  return db.profile.upsert({
    where: { username: "demo" },
    update: {},
    create: {
      ownerId: user.id,
      username: "demo",
      displayName: "SaasLink Demo",
      bio: "Всички важни линкове, продукти и кампании на едно място.",
      theme: {
        background: "#0b1120",
        surface: "#111827",
        text: "#f8fafc",
        accent: "#22c55e",
        buttonStyle: "solid",
      },
      links: {
        create: [
          {
            title: "Запази безплатна консултация",
            description: "Booking CTA за услуги, коучинг или демо срещи.",
            url: "https://cal.com",
            type: "BOOKING",
            position: 1,
            spotlight: true,
          },
          {
            title: "Дигитален продукт",
            description: "Място за PDF, курс или шаблон.",
            url: "https://gumroad.com",
            type: "PRODUCT",
            position: 2,
          },
          {
            title: "Instagram",
            url: "https://instagram.com",
            position: 3,
          },
        ],
      },
    },
    include: { links: { orderBy: { position: "asc" } } },
  });
}

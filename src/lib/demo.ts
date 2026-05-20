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
        background: "#b7aa7e",
        surface: "#c7b98b",
        text: "#35231e",
        accent: "#655b39",
        buttonStyle: "solid",
      },
      links: {
        create: [
          {
            title: "ЖЪЛТИ ЗЪБИ (КАФЕ,ЦИГАРИ,ВИНО) ВЕЧЕ НЕ",
            description: "Паста за зъби Extra White Pro",
            url: "https://example.com/toothpaste",
            imageUrl: "https://picsum.photos/seed/tooth/120/120",
            type: "PRODUCT",
            position: 1,
          },
          {
            title: "СЕРИЯ ЗА БЪРЗ РАСТЕЖ НА КОСАТА",
            description: "Против косопад",
            url: "https://example.com/hair-growth",
            imageUrl: "https://picsum.photos/seed/hair/120/120",
            type: "PRODUCT",
            position: 2,
          },
          {
            title: "ГОРЕЛКА ЗА МАЗНИНИ",
            description: "Премахва стрии и топи целулит",
            url: "https://example.com/fat-burner",
            imageUrl: "https://picsum.photos/seed/fatburn/120/120",
            type: "PRODUCT",
            position: 3,
          },
          {
            title: "Instagram",
            url: "https://instagram.com",
            position: 4,
          },
          {
            title: "TikTok",
            url: "https://tiktok.com",
            position: 5,
          },
        ],
      },
    },
    include: { links: { orderBy: { position: "asc" } } },
  });
}

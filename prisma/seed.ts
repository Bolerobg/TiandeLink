import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "founder@saaslink.local" },
    update: {},
    create: {
      email: "founder@saaslink.local",
      name: "SaasLink Founder",
      plan: "PRO",
    },
  });

  const profile = await prisma.profile.upsert({
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
    },
  });

  const count = await prisma.link.count({ where: { profileId: profile.id } });
  if (count === 0) {
    await prisma.link.createMany({
      data: [
        {
          profileId: profile.id,
          title: "Запази безплатна консултация",
          description: "Booking CTA за услуги, коучинг или демо срещи.",
          url: "https://cal.com",
          type: "BOOKING",
          position: 1,
          spotlight: true,
        },
        {
          profileId: profile.id,
          title: "Дигитален продукт",
          description: "Място за PDF, курс или шаблон.",
          url: "https://gumroad.com",
          type: "PRODUCT",
          position: 2,
        },
        {
          profileId: profile.id,
          title: "Instagram",
          url: "https://instagram.com",
          position: 3,
        },
      ],
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

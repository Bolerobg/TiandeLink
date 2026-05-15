"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";
import { createSession, destroySession } from "@/lib/session";

const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(160),
  password: z.string().min(8).max(120),
  username: z
    .string()
    .min(3)
    .max(32)
    .regex(/^[a-z0-9-]+$/),
});

const loginSchema = z.object({
  email: z.string().email().max(160),
  password: z.string().min(1).max(120),
});

export async function registerUser(formData: FormData) {
  const parsed = registerSchema.parse({
    name: formData.get("name"),
    email: String(formData.get("email") || "").toLowerCase(),
    password: formData.get("password"),
    username: String(formData.get("username") || "").toLowerCase(),
  });

  const db = getDb();
  const existingUser = await db.user.findUnique({ where: { email: parsed.email } });
  const existingProfile = await db.profile.findUnique({ where: { username: parsed.username } });

  if (existingUser || existingProfile) {
    redirect("/register?error=exists");
  }

  const user = await db.user.create({
    data: {
      email: parsed.email,
      name: parsed.name,
      passwordHash: hashPassword(parsed.password),
      profiles: {
        create: {
          username: parsed.username,
          displayName: parsed.name,
          bio: "Всички мои важни линкове на едно място.",
          links: {
            create: [
              {
                title: "Моят първи линк",
                url: "https://example.com",
                description: "Редактирай ме от dashboard-а.",
                position: 1,
                spotlight: true,
              },
            ],
          },
        },
      },
    },
  });

  await createSession(user.id);
  redirect("/dashboard");
}

export async function loginUser(formData: FormData) {
  const parsed = loginSchema.parse({
    email: String(formData.get("email") || "").toLowerCase(),
    password: formData.get("password"),
  });

  const user = await getDb().user.findUnique({ where: { email: parsed.email } });

  if (!user?.passwordHash || !verifyPassword(parsed.password, user.passwordHash)) {
    redirect("/login?error=invalid");
  }

  await createSession(user.id);
  redirect("/dashboard");
}

export async function logoutUser() {
  await destroySession();
  redirect("/");
}

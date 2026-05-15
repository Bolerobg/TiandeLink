"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ensureDemoProfile } from "@/lib/demo";
import { getDb } from "@/lib/db";
import { defaultTheme } from "@/lib/theme";

const profileSchema = z.object({
  displayName: z.string().min(2).max(80),
  bio: z.string().max(180).optional(),
  background: z.string().min(4).max(24),
  surface: z.string().min(4).max(24),
  text: z.string().min(4).max(24),
  accent: z.string().min(4).max(24),
  buttonStyle: z.enum(["solid", "outline", "soft"]),
});

const linkSchema = z.object({
  title: z.string().min(2).max(90),
  url: z.string().url(),
  description: z.string().max(140).optional(),
  type: z.enum(["URL", "FEATURED", "PRODUCT", "BOOKING", "EMAIL_CAPTURE"]),
  spotlight: z.coerce.boolean().optional(),
});

export async function updateProfile(formData: FormData) {
  const profile = await ensureDemoProfile();
  const parsed = profileSchema.parse({
    displayName: formData.get("displayName"),
    bio: formData.get("bio") || "",
    background: formData.get("background") || defaultTheme.background,
    surface: formData.get("surface") || defaultTheme.surface,
    text: formData.get("text") || defaultTheme.text,
    accent: formData.get("accent") || defaultTheme.accent,
    buttonStyle: formData.get("buttonStyle") || defaultTheme.buttonStyle,
  });

  await getDb().profile.update({
    where: { id: profile.id },
    data: {
      displayName: parsed.displayName,
      bio: parsed.bio,
      theme: {
        background: parsed.background,
        surface: parsed.surface,
        text: parsed.text,
        accent: parsed.accent,
        buttonStyle: parsed.buttonStyle,
      },
    },
  });

  revalidatePath("/dashboard");
  revalidatePath(`/${profile.username}`);
}

export async function createLink(formData: FormData) {
  const profile = await ensureDemoProfile();
  const parsed = linkSchema.parse({
    title: formData.get("title"),
    url: formData.get("url"),
    description: formData.get("description") || "",
    type: formData.get("type") || "URL",
    spotlight: formData.get("spotlight") === "on",
  });

  const maxPosition = await getDb().link.aggregate({
    where: { profileId: profile.id },
    _max: { position: true },
  });

  await getDb().link.create({
    data: {
      profileId: profile.id,
      title: parsed.title,
      url: parsed.url,
      description: parsed.description,
      type: parsed.type,
      spotlight: parsed.spotlight || parsed.type === "FEATURED",
      position: (maxPosition._max.position || 0) + 1,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath(`/${profile.username}`);
}

export async function toggleLink(formData: FormData) {
  const id = String(formData.get("id") || "");
  const active = formData.get("active") === "true";
  const profile = await ensureDemoProfile();

  await getDb().link.update({
    where: { id },
    data: { isActive: !active },
  });

  revalidatePath("/dashboard");
  revalidatePath(`/${profile.username}`);
}

export async function deleteLink(formData: FormData) {
  const id = String(formData.get("id") || "");
  const profile = await ensureDemoProfile();

  await getDb().link.delete({ where: { id } });

  revalidatePath("/dashboard");
  revalidatePath(`/${profile.username}`);
}

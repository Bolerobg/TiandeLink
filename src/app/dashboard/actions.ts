"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { requireUserProfile } from "@/lib/profile";
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

const linkIdSchema = z.object({
  id: z.string().min(1),
});

const moveLinkSchema = linkIdSchema.extend({
  direction: z.enum(["up", "down"]),
});

function refreshProfile(username: string) {
  revalidatePath("/dashboard");
  revalidatePath(`/${username}`);
}

export async function updateProfile(formData: FormData) {
  const { profile } = await requireUserProfile();
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

  refreshProfile(profile.username);
}

export async function createLink(formData: FormData) {
  const { profile } = await requireUserProfile();
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

  refreshProfile(profile.username);
}

export async function updateLink(formData: FormData) {
  const { profile } = await requireUserProfile();
  const parsedId = linkIdSchema.parse({ id: formData.get("id") });
  const parsed = linkSchema.parse({
    title: formData.get("title"),
    url: formData.get("url"),
    description: formData.get("description") || "",
    type: formData.get("type") || "URL",
    spotlight: formData.get("spotlight") === "on",
  });

  await getDb().link.update({
    where: { id: parsedId.id, profileId: profile.id },
    data: {
      title: parsed.title,
      url: parsed.url,
      description: parsed.description,
      type: parsed.type,
      spotlight: parsed.spotlight || parsed.type === "FEATURED",
    },
  });

  refreshProfile(profile.username);
}

export async function toggleLink(formData: FormData) {
  const active = formData.get("active") === "true";
  const { profile } = await requireUserProfile();
  const parsed = linkIdSchema.parse({ id: formData.get("id") });

  await getDb().link.update({
    where: { id: parsed.id, profileId: profile.id },
    data: { isActive: !active },
  });

  refreshProfile(profile.username);
}

export async function moveLink(formData: FormData) {
  const { profile } = await requireUserProfile();
  const parsed = moveLinkSchema.parse({
    id: formData.get("id"),
    direction: formData.get("direction"),
  });

  const links = await getDb().link.findMany({
    where: { profileId: profile.id },
    orderBy: { position: "asc" },
    select: { id: true, position: true },
  });
  const currentIndex = links.findIndex((link) => link.id === parsed.id);
  const targetIndex = parsed.direction === "up" ? currentIndex - 1 : currentIndex + 1;

  if (currentIndex < 0 || targetIndex < 0 || targetIndex >= links.length) {
    return;
  }

  const current = links[currentIndex];
  const target = links[targetIndex];

  await getDb().$transaction([
    getDb().link.update({
      where: { id: current.id, profileId: profile.id },
      data: { position: target.position },
    }),
    getDb().link.update({
      where: { id: target.id, profileId: profile.id },
      data: { position: current.position },
    }),
  ]);

  refreshProfile(profile.username);
}

export async function deleteLink(formData: FormData) {
  const { profile } = await requireUserProfile();
  const parsed = linkIdSchema.parse({ id: formData.get("id") });

  await getDb().link.delete({ where: { id: parsed.id, profileId: profile.id } });

  const remainingLinks = await getDb().link.findMany({
    where: { profileId: profile.id },
    orderBy: { position: "asc" },
    select: { id: true },
  });

  await getDb().$transaction(
    remainingLinks.map((link, index) =>
      getDb().link.update({
        where: { id: link.id, profileId: profile.id },
        data: { position: index + 1 },
      }),
    ),
  );

  refreshProfile(profile.username);
}

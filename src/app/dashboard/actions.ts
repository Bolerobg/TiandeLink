"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { requireUserProfile } from "@/lib/profile";
import { defaultTheme } from "@/lib/theme";

const profileSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(32)
    .regex(/^[a-z0-9-]+$/),
  displayName: z.string().min(2).max(80),
  bio: z.string().max(180).optional(),
  avatarUrl: z.string().url().max(400).optional().or(z.literal("")),
  backgroundVideo: z.string().url().max(400).optional().or(z.literal("")),
  password: z.string().max(30).optional().or(z.literal("")),
  donationUrl: z.string().url().max(200).optional().or(z.literal("")),
  customDomain: z.string().max(100).optional().or(z.literal("")),
  timezone: z.string().max(50),
  socialInstagram: z.string().max(200).optional().or(z.literal("")),
  socialFacebook: z.string().max(200).optional().or(z.literal("")),
  socialWhatsapp: z.string().max(200).optional().or(z.literal("")),
  socialViber: z.string().max(200).optional().or(z.literal("")),
  footerBrand: z.boolean(),
  isPublished: z.boolean(),
  background: z.string().min(4).max(200),
  surface: z.string().min(4).max(200),
  text: z.string().min(4).max(60),
  accent: z.string().min(4).max(60),
  cardRadius: z.string().max(30),
  cardShadow: z.string().max(150),
  fontFamily: z.string().max(100),
  template: z.string().max(50),
  buttonStyle: z.enum(["solid", "outline", "soft"]),
  toastMinInterval: z.preprocess((val) => (val === "" || val === null || val === undefined ? undefined : Number(val)), z.number().min(5).max(3600).default(30)),
  toastMaxInterval: z.preprocess((val) => (val === "" || val === null || val === undefined ? undefined : Number(val)), z.number().min(5).max(3600).default(180)),
});

const linkSchema = z.object({
  title: z.string().min(2).max(90),
  url: z.string().min(1),
  description: z.string().max(140).optional(),
  imageUrl: z.string().url().max(400).optional().or(z.literal("")),
  icon: z.string().max(6).optional().or(z.literal("")),
  type: z.enum(["URL", "FEATURED", "PRODUCT", "BOOKING", "EMAIL_CAPTURE", "TEXT"]),
  spotlight: z.coerce.boolean().optional(),
  startsAt: z.string().optional().or(z.literal("")),
  endsAt: z.string().optional().or(z.literal("")),
});

const linkIdSchema = z.object({
  id: z.string().min(1),
});

const moveLinkSchema = linkIdSchema.extend({
  direction: z.enum(["up", "down"]),
});

const reorderSchema = z.object({
  ids: z.array(z.string()),
});

const emailSchema = z.object({
  linkId: z.string().min(1),
  email: z.string().email(),
});

function refreshProfile(username: string, customDomain?: string | null) {
  revalidatePath("/dashboard");
  revalidatePath(`/${username}`);
  if (customDomain) revalidatePath("/", "layout");
}

export async function updateProfile(formData: FormData) {
  const { profile } = await requireUserProfile();
  const parsed = profileSchema.parse({
    username: String(formData.get("username") || "").toLowerCase(),
    displayName: formData.get("displayName"),
    bio: formData.get("bio") || "",
    avatarUrl: formData.get("avatarUrl") || "",
    backgroundVideo: formData.get("backgroundVideo") || "",
    password: formData.get("password") || "",
    donationUrl: formData.get("donationUrl") || "",
    customDomain: formData.get("customDomain") || "",
    timezone: formData.get("timezone") || "Europe/Sofia",
    socialInstagram: formData.get("socialInstagram") || "",
    socialFacebook: formData.get("socialFacebook") || "",
    socialWhatsapp: formData.get("socialWhatsapp") || "",
    socialViber: formData.get("socialViber") || "",
    footerBrand: formData.get("footerBrand") === "on",
    isPublished: formData.get("isPublished") === "on",
    background: formData.get("background") || defaultTheme.background,
    surface: formData.get("surface") || defaultTheme.surface,
    text: formData.get("text") || defaultTheme.text,
    accent: formData.get("accent") || defaultTheme.accent,
    cardRadius: formData.get("cardRadius") || defaultTheme.cardRadius,
    cardShadow: formData.get("cardShadow") || defaultTheme.cardShadow,
    fontFamily: formData.get("fontFamily") || defaultTheme.fontFamily,
    template: formData.get("template") || defaultTheme.template,
    buttonStyle: formData.get("buttonStyle") || defaultTheme.buttonStyle,
    toastMinInterval: formData.get("toastMinInterval"),
    toastMaxInterval: formData.get("toastMaxInterval"),
  });
  const db = getDb();

  if (parsed.username !== profile.username) {
    const usernameOwner = await db.profile.findUnique({
      where: { username: parsed.username },
      select: { id: true },
    });

    if (usernameOwner && usernameOwner.id !== profile.id) {
      return;
    }
  }

  const cleanDomain = parsed.customDomain
    ? parsed.customDomain.replace(/^https?:\/\//, "").replace(/\/$/, "").toLowerCase()
    : null;

  if (cleanDomain) {
    const domainOwner = await db.profile.findUnique({
      where: { customDomain: cleanDomain },
      select: { id: true },
    });
    if (domainOwner && domainOwner.id !== profile.id) {
      return;
    }
  }

  let viberUrl = parsed.socialViber || null;
  if (viberUrl && /^\+?\d{5,18}$/.test(viberUrl)) {
    const num = viberUrl.startsWith("+") ? viberUrl.slice(1) : viberUrl;
    viberUrl = `viber://chat?number=%2B${num}`;
  }

  await db.profile.update({
    where: { id: profile.id },
    data: {
      username: parsed.username,
      displayName: parsed.displayName,
      bio: parsed.bio,
      avatarUrl: parsed.avatarUrl || null,
      backgroundVideo: parsed.backgroundVideo || null,
      password: parsed.password || null,
      donationUrl: parsed.donationUrl || null,
      customDomain: cleanDomain,
      timezone: parsed.timezone,
      socialInstagram: parsed.socialInstagram || null,
      socialFacebook: parsed.socialFacebook || null,
      socialWhatsapp: parsed.socialWhatsapp || null,
      socialViber: viberUrl,
      footerBrand: parsed.footerBrand,
      isPublished: parsed.isPublished,
      theme: {
        background: parsed.background,
        surface: parsed.surface,
        text: parsed.text,
        accent: parsed.accent,
        cardRadius: parsed.cardRadius,
        cardShadow: parsed.cardShadow,
        fontFamily: parsed.fontFamily,
        template: parsed.template,
        buttonStyle: parsed.buttonStyle,
        toastMinInterval: parsed.toastMinInterval,
        toastMaxInterval: parsed.toastMaxInterval,
      },
    },
  });

  refreshProfile(profile.username, cleanDomain);
  refreshProfile(parsed.username);
  redirect("/dashboard?ok=1");
}

export async function createLink(formData: FormData) {
  const { profile } = await requireUserProfile();
  const parsed = linkSchema.parse({
    title: formData.get("title"),
    url: formData.get("url"),
    description: formData.get("description") || "",
    imageUrl: formData.get("imageUrl") || "",
    icon: formData.get("icon") || "",
    type: formData.get("type") || "URL",
    spotlight: formData.get("spotlight") === "on",
    startsAt: formData.get("startsAt") || "",
    endsAt: formData.get("endsAt") || "",
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
      imageUrl: parsed.imageUrl || null,
      icon: parsed.icon || null,
      type: parsed.type as any,
      spotlight: parsed.spotlight || parsed.type === "FEATURED",
      startsAt: parsed.startsAt ? new Date(parsed.startsAt) : null,
      endsAt: parsed.endsAt ? new Date(parsed.endsAt) : null,
      position: (maxPosition._max.position || 0) + 1,
    },
  });

  refreshProfile(profile.username);
  redirect("/dashboard?ok=1");
}

export async function updateLink(formData: FormData) {
  const { profile } = await requireUserProfile();
  const parsedId = linkIdSchema.parse({ id: formData.get("id") });
  const parsed = linkSchema.parse({
    title: formData.get("title"),
    url: formData.get("url"),
    description: formData.get("description") || "",
    imageUrl: formData.get("imageUrl") || "",
    icon: formData.get("icon") || "",
    type: formData.get("type") || "URL",
    spotlight: formData.get("spotlight") === "on",
    startsAt: formData.get("startsAt") || "",
    endsAt: formData.get("endsAt") || "",
  });

  await getDb().link.update({
    where: { id: parsedId.id, profileId: profile.id },
    data: {
      title: parsed.title,
      url: parsed.url,
      description: parsed.description,
      imageUrl: parsed.imageUrl || null,
      icon: parsed.icon || null,
      type: parsed.type as any,
      spotlight: parsed.spotlight || parsed.type === "FEATURED",
      startsAt: parsed.startsAt ? new Date(parsed.startsAt) : null,
      endsAt: parsed.endsAt ? new Date(parsed.endsAt) : null,
    },
  });

  refreshProfile(profile.username);
  redirect("/dashboard?ok=1");
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
  redirect("/dashboard?ok=1");
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
  redirect("/dashboard?ok=1");
}

export async function reorderLinks(formData: FormData) {
  const { profile } = await requireUserProfile();
  const parsed = reorderSchema.parse({
    ids: JSON.parse(String(formData.get("ids") || "[]")),
  });

  await getDb().$transaction(
    parsed.ids.map((id, index) =>
      getDb().link.update({
        where: { id, profileId: profile.id },
        data: { position: index + 1 },
      }),
    ),
  );

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
  redirect("/dashboard?ok=1");
}

export async function subscribeEmail(formData: FormData) {
  const parsed = emailSchema.parse({
    linkId: formData.get("linkId"),
    email: formData.get("email"),
  });

  const db = getDb();
  const link = await db.link.findUnique({
    where: { id: parsed.linkId },
    select: { profileId: true, profile: { select: { username: true } } },
  });
  if (!link) return { error: "Link not found" };

  try {
    await db.emailSubscriber.create({
      data: {
        profileId: link.profileId,
        linkId: parsed.linkId,
        email: parsed.email,
      },
    });
    refreshProfile(link.profile.username);
    return { ok: true };
  } catch {
    return { error: "Вече сте абонирани" };
  }
}

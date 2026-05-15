import { requireUser } from "@/lib/session";
import { getDb } from "@/lib/db";

function usernameFromEmail(email: string) {
  return email
    .split("@")[0]
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 24);
}

export async function requireUserProfile() {
  const user = await requireUser();
  const db = getDb();
  const profile = await db.profile.findFirst({
    where: { ownerId: user.id },
    orderBy: { createdAt: "asc" },
  });

  if (profile) {
    return { user, profile };
  }

  const baseUsername = usernameFromEmail(user.email) || "profile";
  let username = baseUsername;
  let suffix = 1;

  while (await db.profile.findUnique({ where: { username } })) {
    suffix += 1;
    username = `${baseUsername}-${suffix}`;
  }

  const createdProfile = await db.profile.create({
    data: {
      ownerId: user.id,
      username,
      displayName: user.name || username,
      bio: "Моят SaasLink профил.",
    },
  });

  return { user, profile: createdProfile };
}

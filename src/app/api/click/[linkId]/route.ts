import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

type ClickRouteProps = {
  params: Promise<{ linkId: string }>;
};

export async function GET(request: NextRequest, { params }: ClickRouteProps) {
  const { linkId } = await params;
  const link = await getDb().link.findUnique({
    where: { id: linkId },
    select: { id: true, profileId: true, url: true, isActive: true },
  });

  if (!link || !link.isActive) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  await getDb().clickEvent.create({
    data: {
      linkId: link.id,
      profileId: link.profileId,
      referrer: request.headers.get("referer"),
      userAgent: request.headers.get("user-agent"),
    },
  });

  return NextResponse.redirect(link.url);
}

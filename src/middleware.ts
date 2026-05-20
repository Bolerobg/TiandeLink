import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getDb } from "@/lib/db";

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const cleanHost = host.split(":")[0].toLowerCase();

  if (cleanHost === "localhost" || cleanHost === "127.0.0.1") {
    return NextResponse.next();
  }

  const localDomains = ["saaslink.local", "lookthis.info", "www.lookthis.info"];
  if (localDomains.includes(cleanHost)) {
    return NextResponse.next();
  }

  try {
    const profile = await getDb().profile.findUnique({
      where: { customDomain: cleanHost },
      select: { username: true, isPublished: true },
    });

    if (!profile || !profile.isPublished) {
      return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    url.pathname = `/${profile.username}${url.pathname === "/" ? "" : url.pathname}`;

    const res = NextResponse.rewrite(url);
    res.headers.set("x-saaslink-profile", profile.username);
    return res;
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};

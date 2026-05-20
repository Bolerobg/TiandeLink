ALTER TABLE "Profile" ADD COLUMN "customDomain" TEXT;
ALTER TABLE "Profile" ADD COLUMN "timezone" TEXT NOT NULL DEFAULT 'Europe/Sofia';
CREATE UNIQUE INDEX "Profile_customDomain_key" ON "Profile"("customDomain");

CREATE TABLE "EmailSubscriber" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EmailSubscriber_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "EmailSubscriber_linkId_email_key" UNIQUE ("linkId", "email")
);

CREATE INDEX "EmailSubscriber_profileId_idx" ON "EmailSubscriber"("profileId");
CREATE INDEX "EmailSubscriber_linkId_idx" ON "EmailSubscriber"("linkId");

ALTER TABLE "EmailSubscriber" ADD CONSTRAINT "EmailSubscriber_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "EmailSubscriber" ADD CONSTRAINT "EmailSubscriber_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;

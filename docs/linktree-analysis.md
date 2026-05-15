# Linktree product analysis

Last reviewed: 2026-05-15.

## Core product

Linktree is no longer only a list of links. The current product is a creator storefront and campaign hub:

- Public link-in-bio page with unlimited links.
- Profile customization: avatar, video profile image, themes, fonts, button styles, footer removal.
- Link presentation controls: featured layouts, spotlight/animation, scheduled links, temporary redirect links.
- Monetization: sponsored links, shop/affiliate product links, digital products, courses, bookings, Shopify/Spring/Bonfire embeds and SendOwl products.
- Audience growth: subscribe forms, contact forms, email/SMS collection and sync to tools such as Mailchimp, Klaviyo, Kit and Google Sheets.
- Analytics: clicks, views, CTR, geography, device analytics, social icon clicks, conversion tracking, lifetime analytics and CSV export.
- Marketing integrations: UTM parameters, Google Analytics, Meta Pixel and Facebook Conversion API.
- Instagram automation: keyword-triggered comment auto-replies with plan-based DM limits.
- QR codes: generated QR code with paid customization options.

## Pricing signals

The official pricing matrix uses Free, Starter, Pro and Premium tiers. Linktree’s pricing page currently emphasizes unlimited links across plans, paid customization, deeper analytics and reduced creator monetization fees as upgrade levers.

Monetization fees are also plan-based. Official help docs state that direct digital product/course sales have Linktree platform fees plus Stripe processing, with Free at 12%, Starter/Pro at 9%, and Premium at 0% for direct earnings.

## MVP scope for SaasLink

Phase 1 should be deliberately narrower than Linktree:

- User accounts and one or more public profiles.
- Public profile page at `/username`.
- Link CRUD with active/hidden state, position, type and spotlight.
- Theme customization.
- Click tracking and basic dashboard stats.
- Docker deployment with PostgreSQL.

Phase 2:

- Auth, billing plans and plan limits.
- Scheduling, QR code, CSV export, UTM builder.
- Email capture blocks and audience export.
- Stripe Connect for paid digital products/bookings.
- Integrations: Google Analytics, Meta Pixel, Mailchimp/Klaviyo/Google Sheets.

Phase 3:

- Sponsored links/affiliate marketplace.
- Course/product modules.
- Instagram auto-reply automation.
- Team/multi-profile management.

## Sources

- Linktree pricing: https://linktr.ee/s/pricing
- Paid features overview: https://linktr.ee/help/en/articles/5434140-an-overview-of-paid-features-available-on-linktree
- Insights overview: https://linktr.ee/help/en/articles/5434178-understanding-your-insights
- Fees overview: https://linktr.ee/help/en/articles/11410206-understanding-transaction-and-processing-fees-on-linktree
- Bookings feature: https://linktr.ee/features/bookings
- Monetization launch context: https://techcrunch.com/2025/04/23/linktree-rolls-out-a-suite-of-monetization-features-for-creators/

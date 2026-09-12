# Contact reference design

## Photo

- Photographer: Cherrydeck.
- Source: https://unsplash.com/photos/people-collaborating-on-office-laptop-Qx7A7SChpnI
- License: https://unsplash.com/license (consulted 2026-09-12).
- The source identifies this as a free Unsplash photo, not Unsplash+.
- File: public/images/contact/collaboration-equipe-ordinateur-cherrydeck.webp
- Local WebP, 960 x 1440 px, 108030 bytes; metadata stripped by Sharp. No hotlinking and no generated people.
- Visible illustration credit: these are not represented as the Litus team or the quoted customer.

## Existing site evidence

- Exact Julie Langlais review and 5-star display reused from src/components/sections/GoogleReviews.tsx. No invented job title or customer location.
- 150+ clients accompanied, 5/5 Google rating and 24-hour response reused from src/components/sections/StatsSection.tsx. No invented satisfaction percentage or years in business.
- Phone, email, locations and Google Calendar booking URL preserved from the contact page.

## Scope

The shared header and its navigation remain unchanged. Layout recreates the supplied reference: left copy and contact details, overlapping real photograph and testimonial, right form card, handwritten annotations, real statistics, and three reassurance items. Mobile keeps every content block.

Form endpoint, validation, anti-spam, consent and emails are unchanged. The live counter respects the existing 5000-character limit (4790 with a subject); it does not silently impose the mockup's 1000-character limit.

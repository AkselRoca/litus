import { permanentRedirect } from 'next/navigation';

// next.config.ts handles the public HTTP 301; this also covers direct rendering.
export default function LegacyArtisansPage() {
  permanentRedirect('/artisan');
}

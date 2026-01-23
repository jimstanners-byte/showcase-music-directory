import Link from 'next/link';
import showcaseLogo from "@/assets/showcase-logo.svg";
import { MobileMenuButton } from './MobileMenuButton';

interface Ad {
  id: string;
  name: string;
  image_url: string;
  link_url: string | null;
  alt_text: string | null;
}

interface TopBarProps {
  sponsorAd: Ad | null;
}

export function TopBar({ sponsorAd }: TopBarProps) {
  return (
    <div className="bg-card/50 border-b border-border">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <img
              src={showcaseLogo}
              alt="Showcase Music - The International Music Business Guide"
              className="h-14 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center gap-3">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Sponsored By</span>
            {sponsorAd ? (
              <a href={sponsorAd.link_url || "#"} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
                <img src={sponsorAd.image_url} alt={sponsorAd.alt_text || sponsorAd.name} className="h-14 w-auto max-w-48 object-contain" />
              </a>
            ) : (
              <div className="w-48 h-14 bg-secondary border border-dashed border-border rounded-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Your Logo Here</span>
              </div>
            )}
          </div>

          <MobileMenuButton />
        </div>
      </div>
    </div>
  );
}
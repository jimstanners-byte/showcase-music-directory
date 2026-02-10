import Link from 'next/link';

const sectors = [
  { name: "Live Event Services", slug: "/live-event-services" },
  { name: "The Business", slug: "/the-business" },
  { name: "Venues", slug: "/venues" },
  { name: "Equipment", slug: "/equipment" },
  { name: "Studios", slug: "/studios" },
  { name: "UK Recording Services", slug: "/uk-recording-services" },
];

const discover = [
  { name: "Home", slug: "/" },
  { name: "Sectors", slug: "/sectors" },
  { name: "About Us", slug: "/about" },
];

const forBusiness = [
  { name: "Get Listed", slug: "/get-listed" },
  { name: "Promote", slug: "/promote" },
  { name: "Contact", slug: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-card mt-10 sm:mt-14">
      {/* Gradient accent line at top */}
      <div className="h-px gradient-brand" />
      
      {/* Main Footer */}
      <div className="container pt-10 pb-6">
        {/* Desktop: 4 columns (lg and up) */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          {/* Sectors */}
          <div>
            <h3 className="font-semibold mb-3 text-foreground text-sm">Sectors</h3>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              {sectors.map((item) => (
                <li key={item.slug}>
                  <Link href={item.slug} className="hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover */}
          <div>
            <h3 className="font-semibold mb-3 text-foreground text-sm">Discover</h3>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              {discover.map((item) => (
                <li key={item.slug}>
                  <Link href={item.slug} className="hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Business */}
          <div>
            <h3 className="font-semibold mb-3 text-foreground text-sm">For Business</h3>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              {forBusiness.map((item) => (
                <li key={item.slug}>
                  <Link href={item.slug} className="hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3 text-foreground text-sm">Contact</h3>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li>
                <a href="mailto:info@showcase-music.com" className="hover:text-primary transition-colors">
                  info@showcase-music.com
                </a>
              </li>
              <li>United Kingdom</li>
            </ul>
          </div>
        </div>

        {/* Tablet/Mobile: 2x2 grid */}
        <div className="lg:hidden">
          <div className="grid grid-cols-2 gap-6 sm:gap-8">
            {/* Sectors */}
            <div>
              <h3 className="font-semibold mb-2 text-foreground text-xs sm:text-sm">Sectors</h3>
              <ul className="space-y-1 text-xs text-muted-foreground">
                {sectors.map((item) => (
                  <li key={item.slug}>
                    <Link href={item.slug} className="hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Discover */}
            <div>
              <h3 className="font-semibold mb-2 text-foreground text-xs sm:text-sm">Discover</h3>
              <ul className="space-y-1 text-xs text-muted-foreground">
                {discover.map((item) => (
                  <li key={item.slug}>
                    <Link href={item.slug} className="hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Business */}
            <div>
              <h3 className="font-semibold mb-2 text-foreground text-xs sm:text-sm">For Business</h3>
              <ul className="space-y-1 text-xs text-muted-foreground">
                {forBusiness.map((item) => (
                  <li key={item.slug}>
                    <Link href={item.slug} className="hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-2 text-foreground text-xs sm:text-sm">Contact</h3>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>
                  <a href="mailto:info@showcase-music.com" className="hover:text-primary transition-colors">
                    info@showcase-music.com
                  </a>
                </li>
                <li>United Kingdom</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-border/50">
        <div className="container py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-muted-foreground">
            <p>© 2025 Showcase Music. All rights reserved.</p>
            <div className="flex gap-3">
              <Link href="/legal" className="hover:text-primary transition-colors">
                Legal Notice
              </Link>
              <span>|</span>
              <Link href="/legal/privacy-policy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link href="/legal/terms-of-service" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
import Link from 'next/link';

const categories = [
  { name: "Live Event Services", slug: "/live-event-services" },
  { name: "The Business", slug: "/the-business" },
  { name: "Venues", slug: "/venues" },
  { name: "Equipment", slug: "/equipment" },
  { name: "Studios", slug: "/studios" },
  { name: "UK Recording Services", slug: "/uk-recording-services" },
];

const quickLinks = [
  { name: "Home", slug: "/" },
  { name: "Categories", slug: "/categories" },
  { name: "About Us", slug: "/about" },
  { name: "Promote", slug: "/promote" },
  { name: "Get Listed", slug: "/get-listed" },
  { name: "Contact", slug: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-card mt-auto">
      {/* Gradient accent line at top */}
      <div className="h-px gradient-brand" />
      {/* Main Footer */}
      <div className="container pt-8 pb-5">
        {/* Desktop: 3 columns in one row (xl and up) */}
        <div className="hidden xl:grid xl:grid-cols-3 gap-6">
          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-2 text-foreground text-sm">Categories</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link href={category.slug} className="hover:text-primary transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-2 text-foreground text-sm">Quick Links</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {quickLinks.map((link) => (
                <li key={link.slug}>
                  <Link href={link.slug} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-2 text-foreground text-sm">Contact</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>info@entourage-pro.com</li>
              <li>United Kingdom</li>
            </ul>
          </div>
        </div>

        {/* Tablet/Mobile: 3 columns (below xl) */}
        <div className="xl:hidden">
          <div className="grid grid-cols-3 gap-4">
            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-1.5 text-foreground text-xs sm:text-sm">Categories</h3>
              <ul className="space-y-1 text-xs text-muted-foreground">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link href={category.slug} className="hover:text-primary transition-colors">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-1.5 text-foreground text-xs sm:text-sm">Quick Links</h3>
              <ul className="space-y-1 text-xs text-muted-foreground">
                {quickLinks.map((link) => (
                  <li key={link.slug}>
                    <Link href={link.slug} className="hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-1.5 text-foreground text-xs sm:text-sm">Contact</h3>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>info@entourage-pro.com</li>
                <li>United Kingdom</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright Bar */}
      <div className="border-t border-border bg-background/50">
        <div className="container py-3">
          <p className="text-xs text-muted-foreground mb-1">
            © 2025 Showcase Music. All rights reserved.
          </p>
          <p className="text-[10px] text-muted-foreground/50 max-w-5xl leading-relaxed">
            No part of this website may be reproduced in any material form, by any means, whether graphic, electronic, mechanical or other, including information storage and retrieval systems, without the written permission of the publisher and where necessary any relevant other copyright owner. This website in whole or in part may not be used to prepare or compile other directories or mailing lists without written permission from the publisher. Measures have been adopted during preparation of this publication which will assist the publisher to protect its copyright. Any unauthorised use of this data will result in immediate legal proceedings. The greatest care has been taken to ensure accuracy but the publisher can accept no responsibility for errors or omissions nor for any liability occasioned by relying on its content.
          </p>
        </div>
      </div>
    </footer>
  );
}

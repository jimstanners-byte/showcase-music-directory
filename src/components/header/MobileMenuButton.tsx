'use client';

import Link from 'next/link';
import { Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useFavourites } from "@/hooks/useFavourites";
import { useState } from "react";

const navItems = [
  { label: "HOME", to: "/" },
  { label: "SECTORS", to: "/sectors" },
];

export function MobileMenuButton() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count: favouritesCount } = useFavourites();

  return (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] bg-card border-border">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <nav className="flex flex-col gap-4 mt-8">
          {navItems.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/favourites"
            className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Heart className="h-5 w-5" />
            FAVOURITES
            {favouritesCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                {favouritesCount}
              </span>
            )}
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
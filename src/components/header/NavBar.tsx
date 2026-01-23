'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, ChevronRight } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useFavourites } from "@/hooks/useFavourites";
import { ReactNode } from "react";

const navItems = [
  { label: "HOME", to: "/" },
  { label: "CATEGORIES", to: "/categories" },
];

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface NavBarProps {
  breadcrumbs?: BreadcrumbItem[];
  rightContent?: ReactNode;
  customNavContent?: ReactNode;
}

export function NavBar({ breadcrumbs, rightContent, customNavContent }: NavBarProps) {
  const { count: favouritesCount } = useFavourites();

  const showBreadcrumbs = breadcrumbs && breadcrumbs.length > 0;
  const showCustomNav = !!customNavContent;

  return (
    <nav className="hidden md:block bg-secondary/50">
      <div className="container">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center justify-between w-full">
            {showCustomNav ? (
              <div className="flex items-center gap-1.5 text-xs lg:text-sm min-w-0 overflow-hidden">
                {customNavContent}
              </div>
            ) : showBreadcrumbs ? (
              <div className="flex items-center gap-1 lg:gap-1.5 text-xs lg:text-sm text-muted-foreground min-w-0 overflow-hidden">
                {breadcrumbs.map((crumb, index) => {
                  const isFirst = index === 0;
                  const isLast = index === breadcrumbs.length - 1;
                  const isSecondLast = index === breadcrumbs.length - 2;
                  const totalItems = breadcrumbs.length;

                  const isMiddleItem = !isFirst && !isLast && !isSecondLast;
                  const shouldHideOnMobile = isMiddleItem && totalItems > 3;
                  const showEllipsis = isSecondLast && totalItems > 3;

                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-1 lg:gap-1.5 min-w-0 ${shouldHideOnMobile ? "hidden lg:flex" : ""}`}
                    >
                      {index > 0 && (
                        <ChevronRight
                          className={`h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0 ${shouldHideOnMobile ? "hidden lg:block" : ""}`}
                        />
                      )}
                      {showEllipsis && (
                        <span className="lg:hidden flex items-center gap-1">
                          <span>...</span>
                          <ChevronRight className="h-3 w-3 flex-shrink-0" />
                        </span>
                      )}
                      {crumb.to ? (
                        <Link
                          href={crumb.to}
                          className="hover:text-primary transition-colors whitespace-nowrap max-w-[120px] lg:max-w-[200px] truncate"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="text-foreground truncate max-w-[150px] lg:max-w-[250px]">{crumb.label}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center">
                {navItems.map((item, index) => (
                  <div key={item.to} className="flex items-center">
                    <NavLink
                      to={item.to}
                      className="text-xs lg:text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-2 lg:px-3 py-1 whitespace-nowrap"
                      activeClassName="text-primary"
                    >
                      {item.label}
                    </NavLink>
                    {index < navItems.length - 1 && <span className="text-border">|</span>}
                  </div>
                ))}
              </div>
            )}

            {/* Right side: optional content + Favourites */}
            <div className="flex items-center gap-2 lg:gap-3">
              {rightContent}
              <NavLink
                to="/favourites"
                className="text-xs lg:text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-2 lg:px-3 py-1 flex items-center gap-1 lg:gap-1.5 whitespace-nowrap"
                activeClassName="text-primary"
              >
                <Heart className="h-4 w-4" />
                FAVOURITES
                {favouritesCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                    {favouritesCount}
                  </span>
                )}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
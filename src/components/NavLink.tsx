'use client';

import { forwardRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps extends Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'> {
  className?: string;
  activeClassName?: string;
  href?: string;
  to?: string; // Legacy React Router prop
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, href, to, ...props }, ref) => {
    const pathname = usePathname();
    const linkHref = href || to || '/'; // Use href or to, fallback to '/'
    const isActive = pathname === linkHref || pathname?.startsWith(linkHref + '/');
    
    return (
      <Link
        ref={ref}
        href={linkHref}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
'use client';

import { TopBar } from './header/TopBar';
import { NavBar, BreadcrumbItem } from './header/NavBar';
import { useActiveAdsByPosition } from '@/hooks/useAds';
import { ReactNode } from 'react';

interface HeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  rightContent?: ReactNode;
  customNavContent?: ReactNode;
}

export function Header({ breadcrumbs, rightContent, customNavContent }: HeaderProps) {
  const { data: sponsorAd } = useActiveAdsByPosition("sponsor-logo");

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border">
      <TopBar sponsorAd={sponsorAd || null} />
      <NavBar breadcrumbs={breadcrumbs} rightContent={rightContent} customNavContent={customNavContent} />
    </header>
  );
}

export type { BreadcrumbItem };
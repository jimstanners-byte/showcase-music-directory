import { Header, BreadcrumbItem } from "./Header";
import { Footer } from "./Footer";
import { PageViewTracker } from "./PageViewTracker";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  headerRightContent?: ReactNode;
  customNavContent?: ReactNode;
}

export function Layout({ children, hideFooter, breadcrumbs, headerRightContent, customNavContent }: LayoutProps) {
  return (
    <>
      <PageViewTracker />
      <div className={cn(
        "flex flex-col",
        hideFooter ? "h-screen overflow-hidden" : "min-h-screen"
      )}>
        <Header 
          breadcrumbs={breadcrumbs} 
          rightContent={headerRightContent} 
          customNavContent={customNavContent} 
        />
        <main className={cn(
          "flex-1 flex flex-col",
          hideFooter && "overflow-hidden"
        )}>{children}</main>
        {!hideFooter && <Footer />}
      </div>
    </>
  );
}

export type { BreadcrumbItem };
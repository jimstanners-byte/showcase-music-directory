'use client';

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsFavourite } from "@/hooks/useFavourites";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface FavouriteButtonProps {
  listingId: string;
  size?: "sm" | "md" | "default";
  variant?: "ghost" | "outline" | "default";
  className?: string;
}

function FavouriteButtonComponent({ listingId, size = "md", variant = "ghost", className }: FavouriteButtonProps) {
  const { isFavourite, toggle } = useIsFavourite(listingId);

  const sizeClasses = size === "sm" ? "h-8 w-8" : size === "default" ? "h-10 w-10" : "h-10 w-10";
  const iconSizeClasses = size === "sm" ? "h-4 w-4" : size === "default" ? "h-5 w-5" : "h-5 w-5";

  return (
    <Button
      variant={variant}
      size="icon"
      className={cn(sizeClasses, isFavourite && "text-red-500 hover:text-red-600", className)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      }}
    >
      <Heart className={cn(iconSizeClasses, isFavourite && "fill-current")} />
    </Button>
  );
}

export const FavouriteButton = memo(FavouriteButtonComponent);

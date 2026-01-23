'use client';

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
  FaPinterestP,
  FaWhatsapp,
  FaThreads,
} from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { Listing } from "@/types/database";

interface SocialLinksProps {
  listing: Listing;
  onLinkClick?: (linkType: string, linkUrl?: string) => void;
}

const socialConfig = [
  { key: "facebook_url", icon: FaFacebookF, label: "Facebook", color: "#1877F2" },
  { key: "instagram_url", icon: FaInstagram, label: "Instagram", color: "#E4405F" },
  { key: "linkedin_url", icon: FaLinkedinIn, label: "LinkedIn", color: "#0A66C2" },
  { key: "twitter_url", icon: FaXTwitter, label: "X (Twitter)", color: "#000000" },
  { key: "youtube_url", icon: FaYoutube, label: "YouTube", color: "#FF0000" },
  { key: "tiktok_url", icon: FaTiktok, label: "TikTok", color: "#000000" },
  { key: "pinterest_url", icon: FaPinterestP, label: "Pinterest", color: "#BD081C" },
  { key: "whatsapp_url", icon: FaWhatsapp, label: "WhatsApp", color: "#25D366" },
  { key: "threads_url", icon: FaThreads, label: "Threads", color: "#000000" },
] as const;

export function SocialLinks({ listing, onLinkClick }: SocialLinksProps) {
  const socialLinks = socialConfig
    .filter((config) => listing[config.key as keyof Listing])
    .map((config) => ({
      ...config,
      url: listing[config.key as keyof Listing] as string,
    }));

  if (socialLinks.length === 0) return null;

  const handleClick = (label: string, url: string) => {
    if (onLinkClick) {
      onLinkClick(label.toLowerCase(), url);
    }
  };

  return (
    <div className="bg-card rounded-lg border p-6">
      <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
      <div className="flex flex-wrap items-center gap-3">
        {socialLinks.map(({ url, icon: Icon, label, color }) => (
          <a
            key={label}
            href={url.startsWith("http") ? url : `https://${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80"
            style={{ backgroundColor: color }}
            aria-label={label}
            onClick={() => handleClick(label, url)}
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </div>
  );
}

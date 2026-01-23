// CategoryIcons.tsx
// Final Showcase Music Category Icons
// Usage: <CategoryIcon name="equipment" className="w-7 h-7 text-white" />

import React from 'react';

interface IconProps {
  className?: string;
}

export const EquipmentIcon: React.FC<{
  children?: React.ReactNode;
}> = ({
  className = "w-6 h-6",
  children
}) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <line x1="7" y1="9" x2="7" y2="15"/>
    <line x1="12" y1="7" x2="12" y2="15"/>
    <line x1="17" y1="11" x2="17" y2="15"/>
    <circle cx="7" cy="11" r="1.5" fill="currentColor"/>
    <circle cx="12" cy="9" r="1.5" fill="currentColor"/>
    <circle cx="17" cy="13" r="1.5" fill="currentColor"/>
  </svg>
);

export const LiveServicesIcon: React.FC<{
  children?: React.ReactNode;
}> = ({
  className = "w-6 h-6",
  children
}) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

export const StudiosIcon: React.FC<{
  children?: React.ReactNode;
}> = ({
  className = "w-6 h-6",
  children
}) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="2" width="6" height="12" rx="3"/>
    <path d="M5 10a7 7 0 0 0 14 0"/>
    <line x1="12" y1="17" x2="12" y2="22"/>
    <line x1="8" y1="22" x2="16" y2="22"/>
  </svg>
);

export const BusinessIcon: React.FC<{
  children?: React.ReactNode;
}> = ({
  className = "w-6 h-6",
  children
}) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="16"/>
    <line x1="10" y1="14" x2="14" y2="14"/>
  </svg>
);

export const UKRecordingIcon: React.FC<{
  children?: React.ReactNode;
}> = ({
  className = "w-6 h-6",
  children
}) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="2" width="6" height="10" rx="3"/>
    <path d="M4 9a6 6 0 0 0 12 0"/>
    <line x1="10" y1="15" x2="10" y2="19"/>
    <line x1="7" y1="19" x2="13" y2="19"/>
    <circle cx="19" cy="8" r="4"/>
    <circle cx="19" cy="8" r="1.5" fill="currentColor"/>
    <path d="M19 12 L19 14"/>
  </svg>
);

export const VenuesIcon: React.FC<{
  children?: React.ReactNode;
}> = ({
  className = "w-6 h-6",
  children
}) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20h20"/>
    <path d="M4 20V8l8-5 8 5v12"/>
    <path d="M9 20v-6a3 3 0 0 1 6 0v6"/>
  </svg>
);

// Icon map for dynamic usage
export const categoryIcons = {
  equipment: EquipmentIcon,
  'live-services': LiveServicesIcon,
  'live-event-services': LiveServicesIcon,
  studios: StudiosIcon,
  business: BusinessIcon,
  'the-business': BusinessIcon,
  'uk-recording': UKRecordingIcon,
  'uk-recording-services': UKRecordingIcon,
  venues: VenuesIcon,
} as const;

export type CategoryIconName = keyof typeof categoryIcons;

interface CategoryIconProps extends IconProps {
  name: CategoryIconName;
}

export const CategoryIcon: React.FC<{
  children?: React.ReactNode;
}> = ({
  name,
  className,
  children
}) => {
  const Icon = categoryIcons[name];
  return Icon ? <Icon className={className} /> : null;
};

export default CategoryIcon;

// Configuration Types
export interface SocialConfig {
  github?: string;
  twitter?: string;
  orcid?: string;
  google_scholar?: string;
  researchgate?: string;
  goodreads?: string;
}

export interface PersonalConfig {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  background_image?: string;
}

export interface NavItem {
  enabled: boolean;
  label: string;
  path?: string;
}

export interface MoreDropdownConfig {
  enabled: boolean;
  label: string;
  items: Record<string, NavItem>;
}

export interface NavigationConfig {
  home: NavItem;
  publications: NavItem;
  cv: NavItem;
  blog: NavItem;
  gallery: NavItem;
  stats: NavItem;
  lecture_notes: NavItem;
  more_dropdown: MoreDropdownConfig;
}
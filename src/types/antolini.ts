export interface BannerSlide {
  id: string;
  backgroundImage: string;
  backgroundImageMobile?: string;
  title?: string;
  subtitle?: string;
  linkText?: string;
  linkHref?: string;
}

export interface CollectionSection {
  id: string;
  backgroundImage: string;
  backgroundImageMobile?: string;
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaHref: string;
  logoSrc?: string;
  logoAlt?: string;
}

export interface TechItem {
  id: string;
  logoSrc: string;
  logoAlt: string;
  description: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FairEvent {
  name: string;
  year: string;
  href: string;
}

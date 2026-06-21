export interface StoneCategory {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  image: string;
  slug: string;
}

export interface StoneProduct {
  id: string;
  categoryId: string;
  name: string;
  nameEn: string;
  color: string;
  colorEn: string;
  description: string;
  descriptionEn: string;
  characteristics: string[];
  characteristicsEn: string[];
  images: string[];
  thumbnail: string;
  dimensions?: string;
  finish?: string;
  isExclusive?: boolean;
  isNew?: boolean;
  slug: string;
}

export interface StoneProject {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  category: string;
  categoryEn: string;
  stonesUsed: string[];
  image: string;
  images: string[];
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  content: string;
  contentEn: string;
  category: "knowledge" | "news";
  image: string;
  author: string;
  date: string;
  slug: string;
}

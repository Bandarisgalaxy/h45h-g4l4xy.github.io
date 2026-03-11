export interface Post {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  tags: string[];
  author: string;
  description: string;
  toc: boolean;
  content: string;
  readingTime: string;
  excerpt: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  tags: string[];
  author: string;
  description: string;
  toc: boolean;
  readingTime: string;
  excerpt: string;
}

export interface CategoryInfo {
  name: string;
  slug: string;
  count: number;
  subcategories?: CategoryInfo[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

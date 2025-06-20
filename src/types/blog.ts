export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published' | 'scheduled';
  author: string;
  category: string;
  publish_date: string;
  last_modified: string;
  created_at: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  canonical_url: string;
  robots: string;
  feature_image?: string;
}

export interface MetaTags {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  robots: string;
}

export interface Redirect {
  oldSlug: string;
  newSlug: string;
  type: '301' | '302';
  created: Date;
}

export interface BlogSettings {
  siteTitle: string;
  siteDescription: string;
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  defaultKeywords: string;
  defaultRobots: string;
}

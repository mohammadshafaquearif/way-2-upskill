export type ResourceCategory = 'devops' | 'aac' | 'aws' | 'data-science' | 'career' | 'interview';

export interface ResourceSection {
  heading?: string;
  body?: string;
  bullets?: string[];
  remember?: string;
  tip?: string;
  subheadings?: { title: string; body?: string; bullets?: string[] }[];
  table?: { headers: string[]; rows: string[][] };
}

export interface ResourceArticle {
  slug: string;
  title: string;
  description: string;
  category: ResourceCategory;
  courseRoute?: string;
  layout?: 'default' | 'guide';
  heroImage?: string;
  sections: ResourceSection[];
}

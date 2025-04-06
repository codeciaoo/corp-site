export interface ProjectProps {
  href: string;
  title: string;
  summary: string;
  publishedDate: Date;
  tags?: string[];
  cover?: string;
  coverAlt?: string;
  caseStudyUrl?: string; // URL to detailed case study
  demoUrl?: string; // URL to live demo if available
}

export interface ProjectProps {
  href: string;
  title: string;
  summary: string;
  publishedDate: Date;
  tags?: string[];
  cover?: string;
  coverAlt?: string;
}

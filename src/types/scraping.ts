export interface ScrapingRule {
  id: string;
  name: string;
  selector: string;
  attribute?: string;
  dataType: 'text' | 'link' | 'image' | 'number';
  required: boolean;
}

export interface ScrapingProject {
  id: string;
  name: string;
  url: string;
  description: string;
  rules: ScrapingRule[];
  createdAt: Date;
  lastModified: Date;
}

export interface ScrapedData {
  [key: string]: string | number | null;
}
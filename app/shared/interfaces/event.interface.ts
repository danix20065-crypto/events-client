import { Category } from "./category";

export interface EventInterface {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  categories?: Category[];
  relatedEvents?: EventInterface[];
  created_at: Date;
  updated_at: Date;
}

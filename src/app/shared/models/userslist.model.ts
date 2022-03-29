import { User } from './user.model';
export interface UsersList {
  page: number;
  per_page: number;
  total: number;
  data: User[];
  support: { url: string; text: string };
  total_pages: number;
}

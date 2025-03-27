import { User } from '../../user/entity/user';

export interface Extension {
  id?: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  authorId: string;
  author: User;
  uploadDate: Date;
  rating: number;
  downloadCount: number;
  archived: boolean;
}

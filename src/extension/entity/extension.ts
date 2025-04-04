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
  archived: boolean;
  downloadCount: number;
  fileId: string;
}

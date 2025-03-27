import { instanceToPlain } from 'class-transformer';
import { Entity } from '../../base/entity';
import { Extension } from './extension';
import { User } from '../../user/entity/user';

export class ExtensionEntity extends Entity implements Extension {
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

  constructor(extension?: Extension) {
    super();
    this.fillUserData(extension);
  }

  public fillUserData(extension?: Extension): void {
    if (!extension) {
      return;
    }

    Object.assign(this, extension);
  }

  public toPOJO() {
    const { _id, ...rest } = instanceToPlain(this);
    return {
      ...rest,
      id: this.id,
    };
  }
}

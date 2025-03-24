import { instanceToPlain } from 'class-transformer';
import { Entity } from '../../base/entity';
import { User } from '../../type/user/user';

export class UserEntity extends Entity implements User {
  name: string;
  email: string;
  password: string;

  constructor(user?: User) {
    super();
    this.fillUserData(user);
  }

  public fillUserData(user?: User): void {
    if (!user) {
      return;
    }

    Object.assign(this, user);
  }

  public toPOJO() {
    const { _id, ...rest } = instanceToPlain(this);
    return {
      ...rest,
      id: this.id
    };
  }
}

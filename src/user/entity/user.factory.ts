import { UserEntity } from './user.entity';

export class UserFactory {
  public static createEntity(plainObject: any): UserEntity {
    return new UserEntity(plainObject);
  }
}

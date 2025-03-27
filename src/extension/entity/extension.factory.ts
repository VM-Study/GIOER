import { ExtensionEntity } from './extension.entity';

export class ExtensionFactory {
  public static createEntity(plainObject: any): ExtensionEntity {
    return new ExtensionEntity(plainObject);
  }
}

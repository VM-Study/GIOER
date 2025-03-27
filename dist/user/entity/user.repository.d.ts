import { Document, Model } from 'mongoose';
import { UserEntity } from './user.entity';
import { UserModel } from './user.schema';
export declare class UserRepository {
    private readonly model;
    private readonly logger;
    constructor(model: Model<UserModel>);
    protected createEntityFromDocument(entityDocument: Document): UserEntity | null;
    save(entity: UserEntity): Promise<UserEntity>;
    findById(id: string): Promise<UserEntity | null>;
    update(id: string, entity: UserEntity): Promise<UserEntity>;
    deleteById(id: string): Promise<UserEntity>;
    exists(id: string): Promise<boolean>;
    findByEmail(email: string): Promise<UserEntity | null>;
}

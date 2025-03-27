import { Document } from 'mongoose';
export declare class UserModel extends Document {
    email: string;
    name: string;
    password: string;
}
export declare const UserSchema: import("mongoose").Schema<UserModel, import("mongoose").Model<UserModel, any, any, any, Document<unknown, any, UserModel> & UserModel & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserModel, Document<unknown, {}, import("mongoose").FlatRecord<UserModel>> & import("mongoose").FlatRecord<UserModel> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

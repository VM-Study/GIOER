import { Entity } from '../../base/entity';
import { User } from '../../type/user/user';
export declare class UserEntity extends Entity implements User {
    name: string;
    email: string;
    password: string;
    constructor(user?: User);
    fillUserData(user?: User): void;
    toPOJO(): {
        id: string;
    };
}

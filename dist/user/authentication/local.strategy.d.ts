import { Strategy } from 'passport-local';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../user.service';
declare const LocalStrategy_base: new (...args: [] | [options: import("passport-local").IStrategyOptionsWithRequest] | [options: import("passport-local").IStrategyOptions]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly userService;
    private readonly logger;
    constructor(userService: UserService);
    validate(email: string, password: string): Promise<UserEntity>;
}
export {};

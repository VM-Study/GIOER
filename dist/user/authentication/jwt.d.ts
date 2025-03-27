import { TokenPayload } from '../../type/token-payload.interface';
import { UserEntity } from '../entity/user.entity';
export declare function createJWTPayload(user: UserEntity): TokenPayload;

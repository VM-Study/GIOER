import { TokenPayload } from '../../type/token-payload.interface';

export interface RequestWithTokenPayload {
  user?: TokenPayload;
}

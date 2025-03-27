import { ConfigService as NestConfigService } from '@nestjs/config';
export declare class AppConfiguration {
    private readonly configService;
    constructor(configService: NestConfigService);
    get appPort(): number;
    get appPasswordSaltRounds(): number;
    get mongoDb(): string;
    get mongoHost(): string;
    get mongoPort(): number;
    get mongoUser(): string;
    get mongoPassword(): string;
    get mongoAuthBase(): string;
    get accessTokenSecret(): string;
    get accessTokenExpiresIn(): string;
}

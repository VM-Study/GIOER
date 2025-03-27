export declare class BcryptCrypto {
    private readonly saltRounds;
    private readonly logger;
    constructor(saltRounds: number);
    hashPassword(password: string): Promise<string>;
    verifyPassword(inputPassword: string, storedHash: string): Promise<boolean>;
}

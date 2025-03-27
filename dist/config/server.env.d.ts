export declare class ServerEnvConfig {
    APP_PORT: number;
    APP_PASSWORD_SALT_ROUNDS: number;
    MONGO_DB: string;
    MONGO_HOST: string;
    MONGO_PORT: number;
    MONGO_USER: string;
    MONGO_PASSWORD: string;
    MONGO_AUTH_BASE: string;
    JWT_ACCESS_TOKEN_SECRET: string;
    JWT_ACCESS_TOKEN_EXPIRES_IN: string;
}
export declare function validate(config: Record<string, unknown>): ServerEnvConfig;

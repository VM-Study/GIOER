import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRootAsync(getMongooseOptions())],
})
export class DatabaseModule {}

function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      uri:
        config.get<string>('MONGO_DB_CONNECTION_STRING') ??
        getMongoConnectionString({
          username: config.get('MONGO_USER'),
          password: config.get('MONGO_PASSWORD'),
          host: config.get('MONGO_HOST'),
          port: config.get('MONGO_PORT'),
          authDatabase: config.get('MONGO_AUTH_BASE'),
          databaseName: config.get('MONGO_DB'),
        }),
    }),
    inject: [ConfigService],
  };
}

function getMongoConnectionString({
  username,
  password,
  host,
  port,
  databaseName,
  authDatabase,
}): string {
  // return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
  return `mongodb+srv://${username}:${password}@cluster0.gdozkop.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=Cluster0`;
  
}

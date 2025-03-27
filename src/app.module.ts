import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfiguration } from './config/app-configuration.service';
import { validate } from './config/server.env';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ExtensionModule } from './extension/extension.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validate,
    }),
    DatabaseModule,
    UserModule,
    ExtensionModule,
  ],
  controllers: [],
  providers: [AppConfiguration],
  exports: [],
})
export class AppModule {}

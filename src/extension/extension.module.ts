import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { ExtensionModel, ExtensionSchema } from './entity/extension.schema';
import { ExtensionRepository } from './entity/extension.repository';
import { ExtensionService } from './extension.service';
import { ExtensionController } from './extension.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExtensionModel.name, schema: ExtensionSchema },
    ]),
    UserModule,
  ],
  controllers: [ExtensionController],
  providers: [ExtensionService, ExtensionRepository],
})
export class ExtensionModule {}

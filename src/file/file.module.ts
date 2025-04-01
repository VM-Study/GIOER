import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { MongooseModule } from "@nestjs/mongoose";
import { diskStorage } from "multer";
import { FileService } from "./file.service";
import { FileController } from "./files.controller";
import { File, FileSchema } from "./entity/file.schema";

@Module({
    imports:[
        MulterModule.register({
            storage: diskStorage({
                destination: './uploads',
                filename:(req,file,cb)=>{
                    const filename = `${file.originalname}--${Date.now()}`;
                    cb(null,filename);
                },
            }),
        }),
        MongooseModule.forFeature([{name: File.name, schema:FileSchema}]),
    ],
    providers:[FileService],
    controllers:[FileController]
})
export class FileModule{}
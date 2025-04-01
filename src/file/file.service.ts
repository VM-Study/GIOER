import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Model } from 'mongoose';
import { File } from './entity/file.schema';
import { CreateFileDto } from './dto/create-file.dto';




@Injectable()
export class FileService{

    constructor(@InjectModel(File.name) private fileModel: Model<File>){}
    

    //function to add file in folder and data in DB
    async handleUploadFile(file: Express.Multer.File, dto: CreateFileDto):Promise<File>{

       const savedFile = new this.fileModel(dto);
       savedFile.fileName = `${file.originalname}--${Date.now()}`;
       savedFile.fileUrl = file.path;
       savedFile.uploadDate = (new Date().toISOString().split('T')[0]);
       savedFile.save()
       console.log(savedFile);
      return savedFile;

    }


    //function to get file from folder
    async handleDownloadFile(id: string): Promise<any>{
        console.log('reached')
        //retrieve file name from DB using unique ID
        const fileInfoFromDB = this.fileModel.findById(id,'fileUrl fileName').exec();
       
        const fileUrl = (await (fileInfoFromDB)).fileUrl;
        const fileName = ((await fileInfoFromDB).fileName);
        
        console.log(fileUrl);
        if(!fileInfoFromDB){
            return console.log('DB not reached');
        }
        // serach for file in folder
        const file = createReadStream(join(process.cwd(),`./${fileUrl}`));
        return new StreamableFile(file,{
            disposition: `attachment; filename=${fileName}`,
        });
    }
}
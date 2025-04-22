import { Injectable, StreamableFile,InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Model } from 'mongoose';
import { File } from './entity/file.schema';
import { CreateFileDto } from './dto/create-file.dto';





@Injectable()
export class FileService{

    constructor(@InjectModel(File.name) private fileModel: Model<File>){}
    
    //service to add file in folder and save related data in DB
    async handleUploadFile(file: Express.Multer.File, dto: CreateFileDto, id: string):Promise<File>{
       try{
            const savedFile = new this.fileModel(dto);
            savedFile.fileName = `${Date.now()}--${file.originalname}`;
            savedFile.fileUrl = file.path;
            savedFile.fileOwner = id;
            savedFile.fileExtensionId = dto.fileExtensionId;
            savedFile.uploadDate = (new Date().toISOString().split('T')[0]);
            savedFile.save()
            return savedFile;
       }catch(error){
            throw new InternalServerErrorException("ERROR: Database connection! File can't be uploaded!");
       } 
       

    }


    //service to download file from folder
    async handleDownloadFile(id: string): Promise<any>{
        try{
             //retrieve file name and URL from DB using unique ID the parent extension
            const fileInfoFromDB = this.fileModel.findOne({fileExtensionId: id},'fileUrl fileName').exec();
            const fileUrl = (await (fileInfoFromDB)).fileUrl;
            const fileName = ((await fileInfoFromDB).fileName);
            
    
            // serach for file in folder and download it
            const file = createReadStream(join(process.cwd(),`./${fileUrl}`));
            return new StreamableFile(file,{
                disposition: `attachment; filename=${fileName}`,
            });
        }catch(error){
            throw new InternalServerErrorException("ERROR: Database connection! File can't be downloded");
        }
     

       
    }

}
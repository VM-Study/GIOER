import { Controller, Post,Get,Res, Query,UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, BadRequestException, Param, StreamableFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { CreateFileDto } from './dto/create-file.dto';
import { File } from './entity/file.schema';
import {diskStorage} from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import { LoggingInterceptor } from './logging.interceptor';
import { readFile } from 'fs';
const fs = require('fs');



@Controller('file')
export class FileController {

constructor(private readonly FileService: FileService){}

@Get('/download/:id')
  downloadFile(@Param('id') id:string){
  return this.FileService.handleDownloadFile(id);
}
    

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateFileDto): Promise<File>{
    
    //need to validate the file before calling that function
    return this.FileService.handleUploadFile(file, dto);
  }

  // @Post('')
  // @UseInterceptors(FileInterceptor('file',{
  //   storage: diskStorage({
  //       destination: './fileUploads/',
  //       filename: (req,file, callback) => {

  //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         const ext = extname(file.originalname);
  //         const filename = `file-${uniqueSuffix}${ext}`;
  //         callback(null, filename);

  //       },
  //   }),
  //   // fileFilter: (req, file, callback) => {
  //   //     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
  //   //       return callback(new BadRequestException('Only image files are allowed!'), false);
  //   //     }
  //   //     callback(null, true);
  //   //   },
  // }))
  // async uploadFile( @UploadedFile(new ParseFilePipe({
  //       validators:[
  //           // new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
  //           // new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
  //       ],
  //   })) file: Express.Multer.File,
  // ){
  //   return{
  //       id:'',
  //       fileName: file.filename,
  //       fileUrl: file.path,
  //       uploadDate: Date.now(),
  //   };
  // }

}





  
  

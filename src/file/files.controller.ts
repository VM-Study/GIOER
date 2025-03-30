import { Controller, Post,Get,Res, Query,UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, BadRequestException, Param, StreamableFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import { LoggingInterceptor } from './logging.interceptor';
import { readFile } from 'fs';
const fs = require('fs');

@Controller('files')
export class FileController {
  @Post('')
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
        destination: './fileUploads/',
        filename: (req,file, callback) => {

          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `file-${uniqueSuffix}${ext}`;
          callback(null, filename);

        },
    }),
    // fileFilter: (req, file, callback) => {
    //     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    //       return callback(new BadRequestException('Only image files are allowed!'), false);
    //     }
    //     callback(null, true);
    //   },
  }))
  async uploadFile( @UploadedFile(new ParseFilePipe({
        validators:[
            // new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
            // new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
    })) file: Express.Multer.File,
  ){
    return{
        id:'',
        fileName: file.filename,
        fileUrl: file.path,
        uploadDate: Date.now(),
    };
  }

  @Get('streamable')
    streamable(@Res({passthrough: true}) response: Response){
    const file = fs.readFile('./fileUploads/');
    return new StreamableFile(file);
  }
  
  
}
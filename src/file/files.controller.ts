import { Controller, 
         Post,
         Get,
         UseInterceptors, 
         UploadedFile, 
         ParseFilePipe, 
         InternalServerErrorException,
         MaxFileSizeValidator, 
         Param,
         Body,
         UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { FileDto} from './dto/file.dto';
import { File } from './entity/file.schema';
import { JwtAuthGuard } from 'src/user/authentication/jwt-auth.guard';
import { GetUserId } from 'src/decorator/get-user.decorator';
const fs = require('fs');
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';


@ApiTags('file')
@Controller('file')
export class FileController {

constructor(private readonly FileService: FileService){}

//Method to handle file download action
@Get('/download/:id')
@ApiOperation({summary: 'Download file using its unique ID, it is linked with the extension entity and ID should be provided by clicking a link in FE.'})
@ApiResponse({
  status: 200,
  description: 'file is succesfully download from DB',
})
@ApiResponse({status: 400,description:'Error in request, use the ID to download file'})
async downloadFile(@Param('id') id:string){
  try{

    return await this.FileService.handleDownloadFile(id);

  }catch(error){
    throw new InternalServerErrorException("There's an errow in your request");
  }
}
    


//Method to handle file upload action
  @Post('/upload')
  //Verify that someone is login to allow file uploading, otherwise server will refuse action
  @UseGuards(JwtAuthGuard)
  ///
  @ApiBearerAuth()
  @ApiOperation({summary: 'Save the extension file in server'})
  @ApiResponse({
    status: 201,
    description: 'File is succesfully uploded!',
    type: FileDto
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
  @UploadedFile(new ParseFilePipe({
      validators:[
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
        // new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
      ],
    })) file: Express.Multer.File, 
    @Body() dto: CreateFileDto,
    @GetUserId() idLoggedUser: string ): Promise<File>{

      try{
        return await this.FileService.handleUploadFile(file, dto, idLoggedUser);
      }catch(error){
        throw new InternalServerErrorException("There's an errow in your request");
      }

  }

 
}





  
  

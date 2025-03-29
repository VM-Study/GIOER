import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../user/authentication/jwt-auth.guard';
import { ExtensionDto } from './dto/extension.dto';
import { MongoIdValidationPipe } from '../database/mongo-id-validation.pipe';
import { ExtensionService } from './extension.service';
import { CreateExtensionDto } from './dto/create-extension.dto';
import { GetUserId } from '../decorator/get-user.decorator';
import { fillDto } from '../lib/common';
import { ExtensionPaginationDto } from './dto/extension-pagination.dto';
import { ExtensionQuery } from './dto/extension.query';
import { UpdateExtensionDto } from './dto/update-extension.dto';

@ApiTags('extensions')
@Controller('extensions')
export class ExtensionController {
  private readonly logger = new Logger(ExtensionController.name);

  constructor(private readonly ExtensionService: ExtensionService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new Extension' })
  @ApiResponse({
    status: 201,
    description: 'The Extension has been successfully created.',
    type: ExtensionDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async createExtension(
    @GetUserId() userId: string,
    @Body() dto: CreateExtensionDto,
  ): Promise<ExtensionDto> {
    this.logger.log(`Creating new Extension with title: '${dto.title}'`);
    const createdExtension = await this.ExtensionService.createExtension(
      userId,
      dto,
    );

    return fillDto(ExtensionDto, createdExtension.toPOJO());
  }

  @Get(':extensionId')
  @ApiOperation({ summary: 'Get Extension by ID' })
  @ApiResponse({
    status: 200,
    description: 'The Extension has been successfully retrieved.',
    type: ExtensionDto,
  })
  @ApiResponse({ status: 404, description: 'Extension not found.' })
  public async getExtension(
    @Param('extensionId', MongoIdValidationPipe) extensionId: string,
  ): Promise<ExtensionDto> {
    this.logger.log(`Retrieving Extension with ID: '${extensionId}'`);
    const foundExtension =
      await this.ExtensionService.findExtensionById(extensionId);

    return fillDto(ExtensionDto, foundExtension.toPOJO());
  }

  @Get('')
  @ApiOperation({ summary: 'Get all Extension list' })
  @ApiResponse({
    status: 200,
    description: 'The Extensions list has been successfully retrieved.',
    type: ExtensionPaginationDto,
  })
  @ApiResponse({ status: 404, description: 'Extensions not found.' })
  public async getAllExtension(
    @Query() query: ExtensionQuery,
  ): Promise<ExtensionPaginationDto> {
    this.logger.log(
      `Retrieving Extensions with query: ${JSON.stringify(query)}'`,
    );
    const ExtensionPagination =
      await this.ExtensionService.findExtensionByQuery(query);

    const transformedExtensionPagination = {
      ...ExtensionPagination,
      entities: ExtensionPagination.entities.map((Extension) =>
        Extension.toPOJO(),
      ),
    };

    return fillDto(ExtensionPaginationDto, transformedExtensionPagination);
  }

  @Patch(':extensionId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Extension' })
  @ApiResponse({
    status: 200,
    description: 'The Extension has been successfully updated.',
    type: ExtensionDto,
  })
  @ApiResponse({ status: 404, description: 'Extension not found.' })
  public async updateExtension(
    @GetUserId() userId: string,
    @Param('extensionId', MongoIdValidationPipe) extensionId: string,
    @Body() dto: UpdateExtensionDto,
  ): Promise<ExtensionDto> {
    this.logger.log(`Updating Extension with ID '${extensionId}'`);
    const updatedExtension = await this.ExtensionService.updateExtensionById(
      userId,
      extensionId,
      dto,
    );

    return fillDto(ExtensionDto, updatedExtension.toPOJO());
  }

  @Delete(':extensionId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Extension by ID' })
  @ApiResponse({
    status: 200,
    description: 'The Extension has been successfully deleted.',
    type: ExtensionDto,
  })
  @ApiResponse({ status: 404, description: 'Extension not found.' })
  public async deleteExtension(
    @GetUserId() userId: string,
    @Param('extensionId', MongoIdValidationPipe) extensionId: string,
  ): Promise<ExtensionDto> {
    this.logger.log(`Attempting to delete Extension with ID: ${extensionId}`);
    const deletedExtension = await this.ExtensionService.deleteExtensionById(
      userId,
      extensionId,
    );
    this.logger.log(`Extension deleted with ID: '${deletedExtension.id}'`);

    return fillDto(ExtensionDto, deletedExtension.toPOJO());
  }
}

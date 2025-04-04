import { UserService } from '../user/user.service';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateExtensionDto } from './dto/create-extension.dto';
import { ExtensionEntity } from './entity/extension.entity';
import { ExtensionRepository } from './entity/extension.repository';
import { ExtensionFactory } from './entity/extension.factory';
import { SortDirection } from '../type/sort-direction.interface';
import { USER_NOT_FOUND } from '../user/user.messages';
import { PaginationResult } from '../type/pagination.interface';
import {
  EXTENSION_EXISTS,
  EXTENSION_NOT_FOUND,
  NO_ACCESS,
} from './extension.messages';
import { UpdateExtensionDto } from './dto/update-extension.dto';
import { ExtensionQuery } from './dto/extension.query';
import { EXTENSION_CONSTANT } from './entity/extension.constant';
import { ExtensionSortType } from './extension-sort-type.enum';

@Injectable()
export class ExtensionService {
  private readonly logger = new Logger(ExtensionService.name);
  private readonly defaultPage = 1;

  constructor(
    private readonly extensionRepository: ExtensionRepository,
    private readonly userService: UserService,
  ) {}

  public async createExtension(
    userId: string,
    dto: CreateExtensionDto,
  ): Promise<ExtensionEntity> {
    const { title, description, tags, category } = dto;

    this.logger.log(`Attempting to create Extension with title: ${title}`);

    const foundUser = await this.userService.findUserById(userId);
    if (!foundUser) {
      this.logger.warn(`User not found with ID: '${userId}'`);
      throw new NotFoundException(USER_NOT_FOUND);
    }

    const existExtension = await this.extensionRepository.findByTitle(title);
    if (existExtension) {
      this.logger.warn(`Exception with title '${title}' already exists`);
      throw new ConflictException(EXTENSION_EXISTS);
    }

    const ExtensionData = {
      title: title,
      description: description,
      category: category,
      tags: tags,
      author: foundUser,
      uploadDate: new Date(),
      rating: 0,
      downloadCount: 0,
      archived: false,
      fileId: "",
    };

    const ExtensionEntity = ExtensionFactory.createEntity(ExtensionData);
    const createdExtension =
      await this.extensionRepository.save(ExtensionEntity);
    this.logger.log(`Extension created with ID: '${createdExtension.id}'`);

    return createdExtension;
  }

  public async findExtensionById(
    extensionId: string,
  ): Promise<ExtensionEntity> {
    this.logger.log(`Looking for Extension with ID: '${extensionId}'`);
    const foundExtension = await this.extensionRepository.findById(extensionId);
    if (!foundExtension) {
      this.logger.warn(`Extension not found with ID: '${extensionId}'`);
      throw new NotFoundException(EXTENSION_NOT_FOUND);
    }

    return foundExtension;
  }

  public async updateExtensionById(
    userId: string,
    extensionId: string,
    dto: UpdateExtensionDto,
  ): Promise<ExtensionEntity> {
    this.logger.log(`Updating Extension with ID: '${extensionId}'`);

    const updatedExtension =
      await this.extensionRepository.findById(extensionId);
    if (!updatedExtension) {
      this.logger.warn(`Extension not found with ID: '${extensionId}'`);
      throw new NotFoundException(EXTENSION_NOT_FOUND);
    }
    const foundUser = await this.userService.findUserById(userId);
    if (!foundUser) {
      this.logger.warn(`User not found with ID: '${userId}'`);
      throw new NotFoundException(USER_NOT_FOUND);
    }
    // @ts-ignore
    if (foundUser.id !== updatedExtension.author._id.toString()) {
      this.logger.warn(
        `User ID '${userId}' do not have access to Extension ID '${extensionId}'`,
      );
      throw new ForbiddenException(NO_ACCESS);
    }

    if (dto.title !== undefined) updatedExtension.title = dto.title;
    if (dto.description !== undefined)
      updatedExtension.description = dto.description;
    if (dto.category !== undefined) updatedExtension.category = dto.category;
    if (dto.tags !== undefined) updatedExtension.tags = dto.tags;
    if (dto.archived !== undefined) updatedExtension.archived = dto.archived;

    return this.extensionRepository.update(extensionId, updatedExtension);
  }

  public async deleteExtensionById(
    userId: string,
    extensionId: string,
  ): Promise<ExtensionEntity> {
    this.logger.log(`Deleting Extension with ID: '${extensionId}'`);

    const foundExtension = await this.extensionRepository.findById(extensionId);
    if (!foundExtension) {
      this.logger.warn(`Extension not found with ID: '${extensionId}'`);
      throw new NotFoundException(EXTENSION_NOT_FOUND);
    }
    const foundUser = await this.userService.findUserById(userId);
    if (!foundUser) {
      this.logger.warn(`User not found with ID: '${userId}'`);
      throw new NotFoundException(USER_NOT_FOUND);
    }
    // @ts-ignore
    if (foundUser.id !== foundExtension.author._id.toString()) {
      this.logger.warn(
        `User ID '${userId}' do not have access to Extension ID '${extensionId}'`,
      );
      throw new ForbiddenException(NO_ACCESS);
    }

    const deletedExtension =
      await this.extensionRepository.deleteById(extensionId);
    this.logger.log(`Extension with ID: '${extensionId}' deleted`);

    return deletedExtension;
  }

  public async exists(extensionId: string): Promise<boolean> {
    return this.extensionRepository.exists(extensionId);
  }

  public async findExtensionByQuery(
    ExtensionQuery?: ExtensionQuery,
  ): Promise<PaginationResult<ExtensionEntity>> {
    this.logger.log('Finding all Extensions');

    const limit = Math.min(
      ExtensionQuery?.limit ?? Number.MAX_VALUE,
      EXTENSION_CONSTANT.LIMIT,
    );
    const page = ExtensionQuery?.page ?? this.defaultPage;
    const sortOrder = ExtensionQuery?.sortOrder ?? SortDirection.DESC;
    const sortField = ExtensionQuery?.sortField ?? ExtensionSortType.BY_RATING;
    const query = ExtensionQuery?.query;
    const category = ExtensionQuery?.category;
    const tags = ExtensionQuery?.tags || [];
    const uploadDate = ExtensionQuery?.uploadDate;
    const author = ExtensionQuery?.author;

    const ExtensionPagination = await this.extensionRepository.findAllByQuery({
      limit,
      page,
      sortOrder,
      sortField,
      query,
      category,
      tags,
      uploadDate,
      author,
    });
    if (!ExtensionPagination.entities) {
      this.logger.warn('No Extensions found');
      throw new NotFoundException(EXTENSION_NOT_FOUND);
    }

    return ExtensionPagination;
  }
}

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document, Model } from 'mongoose';
import { ExtensionModel } from './extension.schema';
import { ExtensionEntity } from './extension.entity';
import { ExtensionFactory } from './extension.factory';
import { ExtensionQuery } from '../dto/extension.query';
import { PaginationResult } from '../../type/pagination.interface';
import { ExtensionSortType } from '../extension-sort-type.enum';
import { SortDirection } from '../../type/sort-direction.interface';

@Injectable()
export class ExtensionRepository {
  private readonly logger = new Logger(ExtensionRepository.name);

  constructor(
    @InjectModel(ExtensionModel.name)
    private readonly model: Model<ExtensionModel>,
  ) {}

  protected createEntityFromDocument(
    entityDocument: Document,
  ): ExtensionEntity | null {
    if (!entityDocument) {
      return null;
    }

    const plainObject = entityDocument.toObject({
      versionKey: false,
    });

    return ExtensionFactory.createEntity(plainObject);
  }

  public async save(entity: ExtensionEntity): Promise<ExtensionEntity> {
    this.logger.log(`Saving new extension: ${JSON.stringify(entity)}`);
    const newEntity = new this.model(entity.toPOJO());
    const savedEntity = await newEntity.save();
    newEntity.id = savedEntity.id;
    this.logger.log(`Extension saved with ID: '${savedEntity.id}'`);

    return this.createEntityFromDocument(newEntity);
  }

  public async findById(id: string): Promise<ExtensionEntity | null> {
    this.logger.log(`Finding extension by ID: '${id}'`);
    const foundDocument = await this.model.findById(new ObjectId(id));

    return this.createEntityFromDocument(foundDocument);
  }

  public async findByTitle(title: string): Promise<ExtensionEntity | null> {
    this.logger.log(`Finding extension by title: '${title}'`);
    const foundDocument = await this.model.findOne({ title: title });

    return this.createEntityFromDocument(foundDocument);
  }

  public async update(
    id: string,
    entity: ExtensionEntity,
  ): Promise<ExtensionEntity> {
    this.logger.log(`Updating extension by ID: '${id}'`);
    const updatedDocument = await this.model.findByIdAndUpdate(
      new ObjectId(id),
      entity.toPOJO(),
      { new: true },
    );
    if (!updatedDocument) {
      this.logger.error(`Extension not found for update: ID ${id}`);
      throw new NotFoundException(`Extension with id ${entity.id} not found`);
    }

    return this.createEntityFromDocument(updatedDocument);
  }

  public async deleteById(id: string): Promise<ExtensionEntity> {
    this.logger.log(`Deleting extension by ID: '${id}'`);
    const deletedDocument = await this.model.findByIdAndDelete(
      new ObjectId(id),
    );
    if (!deletedDocument) {
      this.logger.error(`Extension not found for deletion: ID ${id}`);
      throw new NotFoundException(`Extension with id ${id} not found.`);
    }

    return this.createEntityFromDocument(deletedDocument);
  }

  public async exists(id: string): Promise<boolean> {
    const result = await this.model.exists(new ObjectId(id));

    return !!result;
  }

  public async findAllByQuery({
    limit,
    page,
    sortField,
    sortOrder,
    query,
    category,
    tags,
    uploadDate,
    author,
  }: ExtensionQuery): Promise<PaginationResult<ExtensionEntity>> {
    const sortCriteria: { [key: string]: SortDirection } = {};
    if (sortField === ExtensionSortType.BY_CATEGORY) {
      sortCriteria['category'] = sortOrder;
    } else if (sortField === ExtensionSortType.BY_DOWNLOAD_COUNT) {
      sortCriteria['downloadCount'] = sortOrder;
    } else if (sortField === ExtensionSortType.BY_UPLOAD_DATE) {
      sortCriteria['uploadDate'] = sortOrder;
    } else if (sortField === ExtensionSortType.BY_RATING) {
      sortCriteria['rating'] = sortOrder;
    }

    const filterCriteria: { [key: string]: any } = {};
    if (query) {
      filterCriteria.$or = [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ];
    }
    if (category) {
      filterCriteria.category = category;
    }
    if (uploadDate) {
      filterCriteria.uploadDate = uploadDate;
    }
    if (tags?.length) {
      filterCriteria.tags = { $all: tags };
    }
    if (author) {
      filterCriteria['author.name'] = { $regex: author, $options: 'i' };
    }
    this.logger.log(
      `Retrieving Extensions filterCriteria: '${JSON.stringify(filterCriteria)}', sortCriteria: '${JSON.stringify(sortCriteria)}'`,
    );

    const [Extensions, ExtensionCount] = await Promise.all([
      this.model
        .find(filterCriteria)
        .populate({
          path: 'author',
          select: 'name',
        })
        .sort(sortCriteria)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.model.countDocuments().exec(),
    ]);
    this.logger.log(`Retrieved [${Extensions.length}] Extensions`);

    return {
      entities: Extensions.map((Extension) =>
        this.createEntityFromDocument(Extension),
      ),
      totalPages: Math.ceil(ExtensionCount / limit),
      currentPage: page,
      totalItems: ExtensionCount,
      itemsPerPage: limit,
    };
  }
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongodb_1 = require("mongodb");
const mongoose_2 = require("mongoose");
const user_factory_1 = require("./user.factory");
const user_schema_1 = require("./user.schema");
let UserRepository = UserRepository_1 = class UserRepository {
    model;
    logger = new common_1.Logger(UserRepository_1.name);
    constructor(model) {
        this.model = model;
    }
    createEntityFromDocument(entityDocument) {
        if (!entityDocument) {
            return null;
        }
        const plainObject = entityDocument.toObject({
            versionKey: false
        });
        return user_factory_1.UserFactory.createEntity(plainObject);
    }
    async save(entity) {
        const entityToLog = { ...entity };
        entityToLog.password = '';
        this.logger.log(`Saving new entity: ${JSON.stringify(entityToLog)}`);
        const newEntity = new this.model(entity.toPOJO());
        const savedEntity = await newEntity.save();
        newEntity.id = savedEntity.id;
        this.logger.log(`Entity saved with ID: '${savedEntity.id}'`);
        return this.createEntityFromDocument(newEntity);
    }
    async findById(id) {
        this.logger.log(`Finding document by ID: '${id}'`);
        const foundDocument = await this.model.findById(new mongodb_1.ObjectId(id));
        return this.createEntityFromDocument(foundDocument);
    }
    async update(id, entity) {
        this.logger.log(`Updating user entity by ID: '${id}'`);
        const updatedDocument = await this.model.findByIdAndUpdate(new mongodb_1.ObjectId(id), entity.toPOJO(), { new: true });
        if (!updatedDocument) {
            this.logger.error(`User not found for update: ID ${id}`);
            throw new common_1.NotFoundException(`Entity with id ${entity.id} not found`);
        }
        return this.createEntityFromDocument(updatedDocument);
    }
    async deleteById(id) {
        this.logger.log(`Deleting entity by ID: '${id}'`);
        const deletedDocument = await this.model.findByIdAndDelete(new mongodb_1.ObjectId(id));
        if (!deletedDocument) {
            this.logger.error(`Entity not found for deletion: ID ${id}`);
            throw new common_1.NotFoundException(`Entity with id ${id} not found.`);
        }
        return this.createEntityFromDocument(deletedDocument);
    }
    async exists(id) {
        const result = await this.model.exists(new mongodb_1.ObjectId(id));
        return !!result;
    }
    async findByEmail(email) {
        this.logger.log(`Searching for user by email: ${email}`);
        const foundDocument = await this.model.findOne({ email: email });
        return this.createEntityFromDocument(foundDocument);
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = UserRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.UserModel.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserRepository);
//# sourceMappingURL=user.repository.js.map
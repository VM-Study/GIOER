import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserModel } from '../../user/entity/user.schema';

@Schema({
  collection: 'extensions',
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
    },
  },
  toObject: { virtuals: true },
})
export class ExtensionModel extends Document {
  @Prop({ required: true, trim: true, unique: true })
  title: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ required: true, trim: true })
  category: string;

  @Prop({ required: true })
  tags: string[];

  @Prop({ type: Types.ObjectId, ref: 'UserModel', required: true })
  author: UserModel;

  @Prop({ trim: true })
  fileId: string;

  @Prop({ required: true })
  uploadDate: Date;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  downloadCount: number;

  @Prop({ required: true })
  archived: boolean;
}

export const ExtensionSchema = SchemaFactory.createForClass(ExtensionModel);

ExtensionSchema.virtual('id').get(function (
  this: Document & { _id: Types.ObjectId },
) {
  return this._id.toHexString();
});

ExtensionSchema.index({ category: 1 });
ExtensionSchema.index({ downloadCount: -1 });
ExtensionSchema.index({ uploadDate: -1 });
ExtensionSchema.index({ rating: -1 });
ExtensionSchema.index({ tags: 1 });
ExtensionSchema.index({ "author.name": 1 });
ExtensionSchema.index({ title: "text", description: "text" });

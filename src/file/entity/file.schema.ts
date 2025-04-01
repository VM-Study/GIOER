import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type FileDocument = HydratedDocument<File>;

@Schema()
export class File{
    @Prop()
    fileName: string

    @Prop()
    fileUrl: string

    @Prop()
    uploadDate: string
}
export const FileSchema = SchemaFactory.createForClass(File);
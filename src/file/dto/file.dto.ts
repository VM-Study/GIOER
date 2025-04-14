import { ApiProperty } from '@nestjs/swagger';
import { Expose} from 'class-transformer';

export class FileDto {

    @ApiProperty({
        example: '67fd4f4f438adc5d59152243',
        description: 'The unique identifier of the extension',
    })
    @Expose()
    public id: string;

    @ApiProperty({
        example: 'me.png--1744654159456',
        description: 'The name generated in the DB for the file',
    })
    @Expose()
    public fileName: string;

    @ApiProperty({
        example: 'uploads/me.png--1744654159327',
        description: 'The actual file saved in the UPLOAD folder on the server',
    })
    @Expose()
    public fileUrl: string;

    @ApiProperty({
        example: '2025-04-14',
        description: 'The upload date',
    })
    @Expose()
    public uploadDate: string;
}
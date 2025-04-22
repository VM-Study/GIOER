import { ApiProperty } from '@nestjs/swagger';
import { Expose} from 'class-transformer';

export class FileDto {

    @ApiProperty({
        example: '67fd4f4f438adc5d59152243',
        description: 'The unique identifier of the extension file',
    })
    @Expose()
    public id: string;

    @ApiProperty({
        example: '1744654159456--me.png',
        description: 'The name generated in the DB for the file',
    })
    @Expose()
    public fileName: string;

    @ApiProperty({
        example: '1744654159327--uploads/me.png',
        description: 'The actual file saved in the UPLOAD folder on the server',
    })
    @Expose()
    public fileUrl: string;

    @ApiProperty({
        example: '67fd4f4f438adc5d59152243',
        description: 'The registered user who uploded the extension file',
    })
    @Expose()
    public fileOwner: string;

    @ApiProperty({
        example: '67fd4f4f438adc5d59152243',
        description: 'The unique identifier of the parent extension ',
    })
    @Expose()
    public fileExtensionId: string;

    @ApiProperty({
        example: '2025-04-14',
        description: 'The upload date',
    })
    @Expose()
    public uploadDate: string;
}
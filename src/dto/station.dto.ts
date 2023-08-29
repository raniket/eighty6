import { IsObject, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class GeometryDto { }

class PropertiesDto { }

export class StationDto {
    @ApiProperty({
        description: 'The type of the feature',
        example: 'Feature'
    })
    @IsString()
    readonly type: string;

    @ApiProperty({
        description: 'The geometry data for the station',
        type: GeometryDto,
        required: false
    })
    @IsObject()
    @IsOptional()
    readonly geometry: GeometryDto;

    @ApiProperty({
        description: 'The properties of the station',
        type: PropertiesDto,
        required: false
    })
    @IsObject()
    @IsOptional()
    readonly properties: PropertiesDto;
}

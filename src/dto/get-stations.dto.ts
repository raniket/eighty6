import { IsObject, IsISO8601 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { StationDto } from './station.dto';
import { WeatherDto } from './weather.dto';

export class GetStationsDto {
    @ApiProperty({
        description: 'The ISO8601 formatted time of the snapshot',
        example: '2023-08-29T05:30:12.879Z',
    })
    @IsISO8601()
    readonly at: string;

    @ApiProperty({
        description: 'The list of stations',
        type: [StationDto],
    })
    @IsObject()
    readonly stations: StationDto[];

    @ApiProperty({
        description: 'The weather data',
        type: WeatherDto,
    })
    @IsObject()
    readonly weather: WeatherDto;
}

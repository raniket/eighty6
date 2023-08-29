import { IsArray, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CurrentWeatherDto { }

class MinutelyWeatherDto { }

class HourlyWeatherDto { }

class DailyWeatherDto { }

export class WeatherDto {
    @ApiProperty({
        description: 'Latitude of the location',
        example: 39.9509
    })
    @IsNumber()
    readonly lat: number;

    @ApiProperty({
        description: 'Longitude of the location',
        example: -75.1564
    })
    @IsNumber()
    readonly lon: number;

    @ApiProperty({
        description: 'Timezone of the location',
        example: 'America/New_York'
    })
    @IsString()
    readonly timezone: string;

    @ApiProperty({
        description: 'Timezone offset in seconds',
        example: -14400
    })
    @IsNumber()
    readonly timezone_offset: number;

    @ApiProperty({
        description: 'Current weather conditions',
        type: CurrentWeatherDto,
        required: false
    })
    @IsObject()
    @IsOptional()
    readonly current: CurrentWeatherDto;

    @ApiProperty({
        description: 'Minute-by-minute weather forecast',
        type: [MinutelyWeatherDto],
        required: false
    })
    @IsArray()
    @IsOptional()
    readonly minutely: MinutelyWeatherDto[];

    @ApiProperty({
        description: 'Hourly weather forecast',
        type: [HourlyWeatherDto],
        required: false
    })
    @IsArray()
    @IsOptional()
    readonly hourly: HourlyWeatherDto[];

    @ApiProperty({
        description: 'Daily weather forecast',
        type: [DailyWeatherDto],
        required: false
    })
    @IsArray()
    @IsOptional()
    readonly daily: DailyWeatherDto[];
}

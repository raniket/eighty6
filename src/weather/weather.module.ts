import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule, 
        HttpModule
    ],
    providers: [WeatherService],
    exports: [WeatherService],
})
export class WeatherModule { }

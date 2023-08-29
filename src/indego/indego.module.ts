import { Module } from '@nestjs/common';
import { IndegoService } from './indego.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule, 
        HttpModule
    ],
    providers: [IndegoService],
    exports: [IndegoService],
})
export class IndegoModule { }


import { Controller, Get, Post, Query, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { GetStationDto } from './dto/get-station.dto';
import { GetStationsDto } from './dto/get-stations.dto';

@ApiTags('API V1')
@Controller('api/v1')
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Post('indego-data-fetch-and-store-it-db')
	@ApiOperation({ summary: 'Fetch Indego data and store it in the database' })
	public async fetchAndStoreData(): Promise<void> {
		return await this.appService.fetchAndStoreData();
	}

	@Get('stations')
	@ApiOperation({ summary: 'Get snapshot of all stations at a specific time' })
	@ApiQuery({ name: 'at', type: String, description: 'Specific time for the snapshot', required: true })
	@ApiResponse({ status: 200, type: GetStationsDto })
	public async getSnapshotAt(@Query('at') time: string): Promise<GetStationsDto> {
		return await this.appService.getSnapshotAt(time);
	}

	@Get('stations/:kioskId')
	@ApiOperation({ summary: 'Get snapshot of a specific station at a specific time' })
	@ApiQuery({ name: 'at', type: String, description: 'Specific time for the snapshot', required: true })
	@ApiParam({ name: 'kioskId', type: Number, description: 'Kiosk ID of the station', required: true })
	@ApiResponse({ status: 200, type: GetStationDto })
	public async getStationSnapshotAt(@Param('kioskId', new ParseIntPipe()) kioskId: number, @Query('at') time: string): Promise<GetStationDto> {
		return await this.appService.getStationSnapshotAt(kioskId, time);
	}
}

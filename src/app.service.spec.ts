// @ts-nocheck
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { IndegoService } from './indego/indego.service';
import { WeatherService } from './weather/weather.service';
import { indegoApiResponse } from '../__mocks__/data/indego-api-response';
import { weatherApiResponse } from '../__mocks__/data/weather-api-response';
import { indegoSnapshotDbResponse } from '../__mocks__/data/indego-snapshot-db-response';
import { weatherDataDbResponse } from '../__mocks__/data/weather-data-db-response';
import { stationDbResponse } from '../__mocks__/data/station-db-response';

describe('AppService', () => {
    let service: AppService;
    let mockPrismaService: Partial<PrismaService>;
    let mockIndegoService: Partial<IndegoService>;
    let mockWeatherService: Partial<WeatherService>;

    beforeEach(async () => {
        mockPrismaService = {
            weatherData: {
                create: jest.fn().mockResolvedValue(weatherDataDbResponse.create),
            },
            indegoSnapshot: {
                create: jest.fn().mockResolvedValue(indegoSnapshotDbResponse.create),
                findFirst: jest.fn().mockResolvedValue(indegoSnapshotDbResponse.findFirst),
            },
            station: {
                findFirst: jest.fn().mockResolvedValue(stationDbResponse.findFirst),
            },
        };

        mockIndegoService = {
            fetchIndegoData: jest.fn().mockResolvedValue(indegoApiResponse),
        };

        mockWeatherService = {
            fetchWeatherData: jest.fn().mockResolvedValue(weatherApiResponse),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppService,
                { provide: PrismaService, useValue: mockPrismaService },
                { provide: IndegoService, useValue: mockIndegoService },
                { provide: WeatherService, useValue: mockWeatherService },
            ],
        }).compile();

        service = module.get<AppService>(AppService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('fetchAndStoreData', () => {
        it('should fetch and store data', async () => {
            await service.fetchAndStoreData();
            expect(mockIndegoService.fetchIndegoData).toBeCalled();
            expect(mockWeatherService.fetchWeatherData).toBeCalled();
            expect(mockPrismaService.weatherData.create).toBeCalled();
            expect(mockPrismaService.indegoSnapshot.create).toBeCalled();
        });
    });

    describe('getSnapshotAt', () => {
        it('should throw NotFoundException if no snapshot is found', async () => {
            mockPrismaService.indegoSnapshot.findFirst.mockResolvedValue(null);
            await expect(service.getSnapshotAt('some time')).rejects.toThrow(NotFoundException);
        });

        it('should return snapshot if snapshot is found', async () => {
            mockPrismaService.indegoSnapshot.findFirst.mockResolvedValue(indegoSnapshotDbResponse.findFirst);
            const snapshot = await service.getSnapshotAt('2019-09-01T10:00:00');
            expect(snapshot).toHaveProperty('at');
            expect(snapshot).toHaveProperty('stations');
            expect(snapshot).toHaveProperty('weather');
        });

        it('should throw NotFoundException if no snapshot is found', async () => {
            mockPrismaService.indegoSnapshot.findFirst.mockResolvedValue(null);
            await expect(service.getSnapshotAt('2050-09-01T10:00:00')).rejects.toThrow(NotFoundException);
        });

    });

    describe('getStationSnapshotAt', () => {
        it('should throw NotFoundException if no snapshot is found', async () => {
            mockPrismaService.station.findFirst.mockResolvedValue(null);
            await expect(service.getStationSnapshotAt(1, 'some time')).rejects.toThrow(NotFoundException);
        });

        it('should return station snapshot if snapshot is found', async () => {
            mockPrismaService.station.findFirst.mockResolvedValue(stationDbResponse.findFirst);
            const snapshot = await service.getStationSnapshotAt(1, '2019-09-01T10:00:00');
            expect(snapshot).toHaveProperty('at');
            expect(snapshot).toHaveProperty('station');
            expect(snapshot).toHaveProperty('weather');
        });

        it('should throw NotFoundException if no snapshot is found', async () => {
            mockPrismaService.station.findFirst.mockResolvedValue(null);
            await expect(service.getStationSnapshotAt(1, '2050-09-01T10:00:00')).rejects.toThrow(NotFoundException);
        });
    });
});

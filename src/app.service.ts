import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { IndegoService } from './indego/indego.service';
import { WeatherService } from './weather/weather.service';
import { IndegoResponse } from './types/indego-response.type';
import { WeatherResponse } from './types/weahter-response.type';
import { Snapshot } from './types/snapshot.type';
import { StationSnapshot } from './types/station-snapshot.type';


/**
 * AppService is responsible for fetching and storing data from Indego and Weather services.
 * It also provides methods to get station snapshots based on timestamps and kiosk IDs.
 *
 * @public
 */
@Injectable()
export class AppService {
    /**
     * @param {PrismaService} prisma - Prisma service for database operations.
     * @param {IndegoService} indegoService - Service for fetching Indego data.
     * @param {WeatherService} weatherService - Service for fetching Weather data.
     */
    constructor(
        private prisma: PrismaService,
        private indegoService: IndegoService,
        private weatherService: WeatherService,
    ) { }

    /**
     * Fetches and stores data from Indego and Weather services.
     *
     * @async
     * @returns {Promise<void>} Promise representing the completion of data fetching and storing.
     */
    public async fetchAndStoreData(): Promise<void> {
        const indegoResponse: IndegoResponse = await this.indegoService.fetchIndegoData();
        const weatherResponse: WeatherResponse = await this.weatherService.fetchWeatherData();

        const weatherData = await this.prisma.weatherData.create({
            data: {
                ...weatherResponse
            }
        });

        const snapshot = await this.prisma.indegoSnapshot.create({
            data: {
                at: new Date(indegoResponse.last_updated),
                weather: {
                    connect: {
                        id: weatherData.id
                    }
                },
                stations: {
                    create: indegoResponse.features.map(feature => ({
                        at: new Date(indegoResponse.last_updated),
                        kioskId: feature.properties.kioskId,
                        features: feature,
                    }))
                }
            },
        });
    }

    /**
     * Gets the station snapshot at or after a specific timestamp.
     *
     * @async
     * @param {string} time - ISO string representing the time.
     * @returns {Promise<Snapshot>} Promise representing the station snapshot at the specified time.
     * @throws {NotFoundException} When no snapshot is found.
     */
    public async getSnapshotAt(time: string): Promise<Snapshot> {
        const snapshot = await this.prisma.indegoSnapshot.findFirst({
            where: {
                at: {
                    gte: new Date(time),
                },
            },
            include: {
                weather: true,
                stations: true,
            },
            orderBy: {
                at: 'asc',
            },
        });

        if (!snapshot) throw new NotFoundException();

        snapshot.stations.forEach(station => {
            delete station.id;
            delete station.kioskId;
            delete station.at;
            delete station.snapshotId;
        });

        delete snapshot.weather.id;

        return {
            at: (snapshot.at instanceof Date) ? snapshot.at.toISOString() : snapshot.at,
            stations: snapshot.stations,
            weather: snapshot.weather,
        };
    }

    /**
     * Gets the station snapshot for a specific kiosk at or after a specific timestamp.
     *
     * @async
     * @param {number} kioskId - The kiosk ID.
     * @param {string} time - ISO string representing the time.
     * @returns {Promise<StationSnapshot>} Promise representing the station snapshot at the specified kiosk and time.
     * @throws {NotFoundException} When no snapshot is found.
     */
    public async getStationSnapshotAt(kioskId: number, time: string): Promise<StationSnapshot> {
        const snapshot = await this.prisma.station.findFirst({
            where: {
                kioskId: kioskId,
                snapshot: {
                    at: {
                        gte: new Date(time),
                    },
                },
            },
            include: {
                snapshot: {
                    include: {
                        weather: true,
                    },
                },
            },
            orderBy: {
                snapshot: {
                    at: 'asc'
                }
            }
        });


        if (!snapshot) throw new NotFoundException();

        const station = {
            ...snapshot,
        }

        delete station.id;
        delete station.kioskId;
        delete station.at;
        delete station.snapshotId;
        delete station.snapshot.id;
        delete station.snapshot;

        delete snapshot.snapshot.weather.id;

        return {
            at: (snapshot.at instanceof Date) ? snapshot.at.toISOString() : snapshot.at,
            station: station,
            weather: snapshot.snapshot.weather,
        };
    }
}

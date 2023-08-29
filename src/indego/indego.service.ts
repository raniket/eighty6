import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { IndegoResponse } from '../types/indego-response.type';

/**
 * IndegoService provides methods to fetch data from the Indego API.
 * It uses NestJS's HttpService for HTTP requests.
 *
 * @public
 * @class
 */
@Injectable()
export class IndegoService {
    /**
     * Creates an instance of IndegoService.
     * 
     * @param {ConfigService} configService - ConfigService to access environment variables.
     * @param {HttpService} httpService - HttpService to make HTTP requests.
     */
    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
    ) { }

    /**
     * Fetches Indego station data from the API.
     * 
     * @async
     * @returns {Promise<WeatherResponse>} - Promise that resolves with fetched Indego data.
     * @throws {InternalServerErrorException} - Throws an InternalServerErrorException in case of any errors.
     */
    async fetchIndegoData(): Promise<IndegoResponse> {
        try {
            const indegoApiUrl = this.configService.get<string>('INDEGO_API_URL');

            const indegoResponse: AxiosResponse = await this.httpService.get(indegoApiUrl).toPromise();

            const { data } = indegoResponse;

            return data;
        } catch (error) {
            console.error('Error fetching indego data:', error);
            throw new InternalServerErrorException();
        }
    }
}

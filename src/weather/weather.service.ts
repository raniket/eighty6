import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { WeatherResponse } from '../types/weahter-response.type';

/**
 * WeatherService provides methods to fetch weather data from the OpenWeatherMap API.
 * It uses NestJS's HttpService for making HTTP requests.
 *
 * @public
 * @class
 */
@Injectable()
export class WeatherService {

    /**
     * Creates an instance of WeatherService.
     * 
     * @param {ConfigService} configService - ConfigService to access environment variables.
     * @param {HttpService} httpService - HttpService to make HTTP requests.
     */
    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
    ) { }

    /**
     * Fetches weather data from the OpenWeatherMap API for specific latitude and longitude.
     * 
     * @async
     * @returns {Promise<WeatherResponse>} - Promise that resolves with fetched weather data.
     * @throws {InternalServerErrorException} - Throws an InternalServerErrorException in case of any errors.
     */
    async fetchWeatherData(): Promise<WeatherResponse> {
        try {
            const apiUrl = this.configService.get<string>('WEATHER_API_URL');
            const lat = this.configService.get<string>('WEATHER_API_LAT');
            const lon = this.configService.get<string>('WEATHER_API_LON');
            const apiKey = this.configService.get<string>('WEATHER_API_KEY');
      
            const weatherApiUrl = `${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      
            const weatherResponse: AxiosResponse = await this.httpService.get(weatherApiUrl).toPromise();

            const { data } = weatherResponse;

            delete data.alerts;

            return data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw new InternalServerErrorException();
        }
    }
}

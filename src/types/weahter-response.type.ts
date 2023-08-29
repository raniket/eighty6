export type WeatherResponse = {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: any;
    minutely: any[];
    hourly: any[];
    daily: any[];
}
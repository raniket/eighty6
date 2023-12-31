export const weatherDataDbResponse = {
    create: {
        id: 18,
        lat: 39.9509,
        lon: -75.1564,
        timezone: "America/New_York",
        timezone_offset: -14400,
        current: {
            dt: 1693325862,
            uvi: 4.89,
            temp: 297.58,
            clouds: 100,
            sunset: 1693352289,
            sunrise: 1693304733,
            weather: [
                {
                    id: 804,
                    icon: "04d",
                    main: "Clouds",
                    description: "overcast clouds",
                },
            ],
            humidity: 79,
            pressure: 1013,
            wind_deg: 70,
            dew_point: 293.7,
            feels_like: 298.14,
            visibility: 10000,
            wind_speed: 2.57,
        },
        minutely: [
            {
                dt: 1693325880,
                precipitation: 0,
            },
        ],
        hourly: [
            {
                dt: 1693324800,
                pop: 0.12,
                uvi: 4.89,
                temp: 297.58,
                clouds: 100,
                weather: [
                    {
                        id: 804,
                        icon: "04d",
                        main: "Clouds",
                        description: "overcast clouds",
                    },
                ],
                humidity: 79,
                pressure: 1013,
                wind_deg: 86,
                dew_point: 293.7,
                wind_gust: 4.52,
                feels_like: 298.14,
                visibility: 10000,
                wind_speed: 2.95,
            },
        ],
        daily: [{
            dt: 1693328400,
            pop: 0.96,
            uvi: 5.32,
            rain: 2.62,
            temp: {
                day: 297.71,
                eve: 297.61,
                max: 299.03,
                min: 293.6,
                morn: 293.86,
                night: 296.26,
            },
            clouds: 100,
            sunset: 1693352289,
            moonset: 1693296660,
            summary: "Expect a day of partly cloudy with rain",
            sunrise: 1693304733,
            weather: [
                {
                    id: 500,
                    icon: "10d",
                    main: "Rain",
                    description: "light rain",
                },
            ],
            humidity: 78,
            moonrise: 1693350900,
            pressure: 1013,
            wind_deg: 74,
            dew_point: 293.62,
            wind_gust: 6.28,
            feels_like: {
                day: 298.26,
                eve: 298.46,
                morn: 294.31,
                night: 297.13,
            },
            moon_phase: 0.44,
            wind_speed: 3.3,
        },],
    }
};
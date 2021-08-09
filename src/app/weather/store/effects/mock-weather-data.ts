import { Weather } from "src/app/model";

export const mockWeather: Weather = {
    cod: '200',
    message: 0,
    cnt: 1,
    list: [
      {
        dt: 1628445600,
        main: {
          temp: 18.15,
          temp_min: 17.16,
          temp_max: 18.15,
          pressure: 1008,
          sea_level: 1008,
          grnd_level: 1005,
          humidity: 82,
          temp_kf: 0.99
        },
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10d'
          }
        ],
        clouds: {
          all: 40
        },
        wind: {
          speed: 4.94,
          deg: 242,
        },
        sys: {
          pod: 'd'
        },
        dt_txt: '2021-08-08 18:00:00'
      }
    ],
    city: {
      id: 2643743,
      name: 'London',
      coord: {
        lat: 51.5085,
        lon: -0.1257
      },
      country: 'GB',
      population: 1000000
    }
};
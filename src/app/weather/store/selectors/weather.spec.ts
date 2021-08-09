import { WeatherState } from "../reducers/weather";
import { selectError, selectWeatherResults } from "./weather";

describe("Weather selectors", () => {
  const initialState: WeatherState = {
    results: [
        {
          id: 2643743,
          city: 'London',
          list: [
            {
              temp: 15.45,
              dt_txt: '2021-08-09 21:00:00'
            },
            {
              temp: 15.01,
              dt_txt: '2021-08-10 00:00:00'
            },
            {
              temp: 13.94,
              dt_txt: '2021-08-10 03:00:00'
            },
            {
              temp: 13.24,
              dt_txt: '2021-08-10 06:00:00'
            }
          ]
        },
        {
          id: 2988507,
          city: 'Paris',
          list: [
            {
              temp: 19.41,
              dt_txt: '2021-08-09 21:00:00'
            },
            {
              temp: 18.52,
              dt_txt: '2021-08-10 00:00:00'
            },
            {
              temp: 17.39,
              dt_txt: '2021-08-10 03:00:00'
            },
            {
              temp: 16.61,
              dt_txt: '2021-08-10 06:00:00'
            }
          ]
        }
    ],
    error: {
      headers: {
        normalizedNames: {},
        lazyUpdate: null,
        headers: {}
      },
      status: 0,
      statusText: 'Unknown Error',
      url: 'https://api.openweathermap.org/data/2.5/forecast',
      ok: false,
      name: 'HttpErrorResponse',
      message: 'Http failure response for https://api.openweathermap.org/data/2.5/forecast: 0 Unknown Error',
       error: {
        isTrusted: true
      }
    }
  };
  
  it("should select weather summary", () => {
    const results = selectWeatherResults.projector(initialState);
    expect(results.length).toEqual(2);
    expect(results[1].city).toEqual("Paris");
  });

  it("should select error", () => {
    const error = selectError.projector(initialState);
    expect(error).toBeTruthy();
  });
});

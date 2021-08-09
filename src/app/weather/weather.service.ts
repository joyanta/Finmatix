import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weather } from '../model';

@Injectable()
export class WeatherService {

  private url = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) { }

  searchWeatherForCity(city: string): Observable<Weather> {
    return this.http.get(this.url, {
      params: {
        q: city,
        cnt: '4',
        units: 'metric',
        APPID: '010721642521f31b0fbc8c3831d45951'
      }
    });   
  }
}
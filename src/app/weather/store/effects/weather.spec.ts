import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from "@ngrx/store/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from "rxjs";
import { WeatherService } from "../../weather.service";
import { GetWeatherEffect } from "./weather";
import { WeatherActions } from "../actions";
import { londonMockWeather } from "./mock-weather-data";
import { throwError } from 'rxjs';

describe('GetWeatherEffect', () => {
    let actions$: Observable<any>;
    let effects: GetWeatherEffect;
    let httpService: WeatherService;

    const initialState = { 
        results: [],
        error: null
    };
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
            GetWeatherEffect,
            provideMockActions(() => actions$),
            provideMockStore({ initialState }),
            { provide: WeatherService }
        ],
      });
      effects = TestBed.inject(GetWeatherEffect);
     
      httpService = TestBed.inject(WeatherService);
    });

    describe('searchForCity$', () => {
        it('should fire search success when weather is retrived', (done) => {
          const spy = spyOn(httpService, 'searchWeatherForCity').and.returnValue(of(londonMockWeather));
          actions$ = of(WeatherActions.search);
          effects.searchForCity$.subscribe((res) => {
            expect(res).toEqual(WeatherActions.searchSuccess({ result: londonMockWeather }));
            expect(spy).toHaveBeenCalledTimes(1);
            done();
          });
        });


        it('should search fail when when service throws and error', (done) => {
            const spy = spyOn(httpService, 'searchWeatherForCity').and.returnValue(throwError({ error: {} }));
            actions$ = of(WeatherActions.search);
            effects.searchForCity$.subscribe((res) => {
                expect(res.type).toEqual(WeatherActions.searchFail.type);
                expect(spy).toHaveBeenCalledTimes(1);
              done();
            });
          });
      
    });
  });


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
import { cold, hot } from "jasmine-marbles";

import { search, searchFail, searchSuccess } from "../actions/weather";


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
          const spy = spyOn(httpService, 'searchWeatherForCity').and.returnValue(throwError({ error: {
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
          }}));
          actions$ = of(WeatherActions.search);
          effects.searchForCity$.subscribe((res) => {
              expect(res.type).toEqual(WeatherActions.searchFail.type);
              expect(spy).toHaveBeenCalledTimes(1);
            done();
          });
        });
      
    });


    describe('searchForCity$ by sarmas marbles', () => {

      it('should fire search success when weather is retrived', () => {
        actions$ = hot('-ab', {
          a: search({ city: 'l'}), 
          b: search({ city: 'london'})
        });

        spyOn(httpService, 'searchWeatherForCity').and.returnValue(
          cold('-------a|', { a: londonMockWeather })
        );

        expect(effects.searchForCity$).toBeObservable(cold('---------b', {
          b: searchSuccess({ result: londonMockWeather }),
        }));
      });


      it('should fire searchFail when error is ', () => {
       
        const error = new Error();
        actions$ = hot('-a', {
          a: search({ city: 'london'})
        });

        spyOn(httpService, 'searchWeatherForCity').and.returnValue(
          cold('-#|', {}, error)
        );

        expect(effects.searchForCity$).toBeObservable(cold('--b', {
          b: searchFail({ error })
        }));
      });
    
    });
  });


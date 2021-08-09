import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherContainer } from './weather.container';

import { provideMockStore } from '@ngrx/store/testing';
import { selectError, selectWeatherResults } from './store/selectors/weather';
import { HttpErrorResponse } from '@angular/common/http';
import { Summary } from '../model';

describe('WeatherContainer', () => {

  const initialState = { 
    results: [],
    error: null
   };

  let component: WeatherContainer;
  let fixture: ComponentFixture<WeatherContainer>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherContainer],
      imports: [
      ],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            { selector: selectWeatherResults, value: [
              {
                id: 2643743,
                city: 'Paris',
                list: [
                  {
                    temp: 18.66,
                    dt_txt: '2021-08-08 15:00:00'
                  },
                  {
                    temp: 18.16,
                    dt_txt: '2021-08-08 18:00:00'
                  },
                  {
                    temp: 15.87,
                    dt_txt: '2021-08-08 21:00:00'
                  },
                  {
                    temp: 13.71,
                    dt_txt: '2021-08-09 00:00:00'
                  }
                ]
              }
            ]},
            { selector: selectError, value: new HttpErrorResponse({ error: '', status: 404})}
          ],
        })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // PLEASE IMPLEMENT MORE TESTS
  it('selectWeatherResults should return Paris', () => {
    component.results$.subscribe(data => {
      const results = (data as  Summary[]); 
      expect(results[0].city).toEqual('Paris')
    });
  });

  it('should dispatch a search ', () => {
    spyOn(component['weatherStore'], 'dispatch');

    component.citySearch('london');

    expect(component['weatherStore'].dispatch).toHaveBeenCalled();
  });

});

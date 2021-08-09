import { HttpErrorResponse } from '@angular/common/http';
import { searchFail, searchSuccess } from '../actions/weather';
import { parisMockWeather } from '../effects/mock-paris-weather-data';
import { londonMockWeather } from '../effects/mock-weather-data';   // possibly put it in a level above
import * as fromReducer from './weather';

describe('WeatherReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.weatherReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  
  describe('error action', () => {
    it('should have an error state', () => {
      const { initialState } = fromReducer;
      const action = searchFail({error: { }})
      const state = fromReducer.weatherReducer(initialState, action);

      expect(state.error).toBeDefined(); 
      expect(state.results).toBeDefined([]);
    });
  });


  describe('searchSuccess action', () => {
    it('should retrieve the data for a city and update the state in an immutable way', () => {
      const { initialState } = fromReducer;
      const action = searchSuccess({ result: londonMockWeather });
      const state = fromReducer.weatherReducer(initialState, action);

      // [{id:2643743,city:'London',list:[{temp:18.15, dt_txt:'2021-08-08 18:00:00'}]}] should be in result;
      expect(state.results.length).toEqual(1);
      expect(state.results[0].city).toEqual('London');
    });
  });

  describe('searchSuccess action for the same city twice', () => {
    it('should retrieve the data for a city and update the state in an immutable way', () => {
      const { initialState } = fromReducer;
      const action = searchSuccess({ result: londonMockWeather });
      
      //action once
      let state = fromReducer.weatherReducer(initialState, action);
      //action 2nd time
      state = fromReducer.weatherReducer(state, action);

      expect(state.results.length).toEqual(1);
      expect(state.results[0].city).toEqual('London');
    });
  });

  describe('searchSuccess action 2 cities', () => {
    it('should retrieve the data for a city and update the state in an immutable way', () => {
      const { initialState } = fromReducer;
      const actionLondon = searchSuccess({ result: londonMockWeather });
      const actionParis = searchSuccess({ result: parisMockWeather });

      let state = fromReducer.weatherReducer(initialState, actionLondon);
      state = fromReducer.weatherReducer(state, actionParis);

      expect(state.results.length).toEqual(2);
      expect(state.results[0].city).toEqual('London');
      expect(state.results[1].city).toEqual('Paris');
    });
  });

});
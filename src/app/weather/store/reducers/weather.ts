// TO BE IMPLEMENTED IF NG-RX IS USED

import { createReducer, on } from '@ngrx/store';
import { Summary, Weather, WeatherList } from '../../../model';

import { WeatherActions } from '../actions';

export interface WeatherState {
    results: Summary[];
    error: any;
}

export const initialState: WeatherState = {
    results: [],
    error: null
}

export const weatherReducer = createReducer(
    initialState, 
    on(WeatherActions.searchFail, (state, {error}) => ({...state, error})),
    on(WeatherActions.searchSuccess, (state, {result}) => {
        
        const matchedIndex = state.results.findIndex(summaryItem => summaryItem.id === result.city.id);
        if (matchedIndex >= 0 ) {
            let newResults = [...state.results];
            let existingSummaryItem = newResults[matchedIndex]
            let existingSummaryItemList = [...existingSummaryItem.list];
            existingSummaryItemList = mapWeatherList(result.list);
            existingSummaryItem = { ...existingSummaryItem, list: existingSummaryItemList};
            newResults[matchedIndex] = existingSummaryItem
            return {...state, results: newResults};

        } else {
            return ({...state, results: [...state.results, weatherSummary(result)]});
        }
    }),
);

export const weatherSummary = (weather: Weather): Summary => {
    return {
        id: weather.city.id,
        city: weather.city.name, 
        list: mapWeatherList(weather.list)
    };
}

export const mapWeatherList = (weatherList: WeatherList[]): { temp: number, dt_txt: string }[] => {
    return weatherList.map(item => {
        return {
            temp: item.main.temp,
            dt_txt: item.dt_txt
        }
    });
}

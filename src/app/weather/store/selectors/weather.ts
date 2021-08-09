// TO BE IMPLEMENTED IF NG-RX IS USED

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { WeatherState } from "../reducers/weather";

const weatherStore = createFeatureSelector<WeatherState>('weather');

export const selectWeatherResults = createSelector(
    weatherStore,
    (state: WeatherState) =>  state.results
);

export const selectError = createSelector(
    weatherStore,
    (state: WeatherState) => state.error
);


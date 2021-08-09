import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Summary } from '../model';
import { WeatherActions } from './store/actions';
import { WeatherState } from './store/reducers/weather';
import { selectWeatherResults } from './store/selectors/weather';

@Component({
  selector: 'app-weather',
  template: `
    <app-search (selectedCity)="citySearch($event)"></app-search>
    <app-results [results]="results$ | async"></app-results>
  `
})
export class WeatherContainer implements OnInit {

  results$: Observable<Summary[]>;

  constructor(private weatherStore: Store<WeatherState>) {
  }

  ngOnInit(): void {
    this.observeOnWeatherResult();
  }
  
  citySearch(city: string): void {
    // to be implemented...
    this.weatherStore.dispatch(WeatherActions.search({city}));
  }

  private observeOnWeatherResult() {
    this.results$ = this.weatherStore.pipe(select(selectWeatherResults));
  }
}

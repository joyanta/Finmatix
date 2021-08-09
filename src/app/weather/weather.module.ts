import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherContainer } from './weather.container';
import { WeatherService } from './weather.service';
import { SearchComponent } from './components/search/search.component';
import { ResultsComponent } from './components/results/results.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { weatherReducer } from './store/reducers/weather';
import { GetWeatherEffect } from './store/effects/weather';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ weather: weatherReducer }),
    EffectsModule.forRoot([GetWeatherEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot()
  ],
  declarations: [
    SearchComponent,
    ResultsComponent,
    WeatherContainer
  ],
  providers: [
    WeatherService
  ]
})
export class WeatherModule {
}

// TO BE IMPLEMENTED IF NG-RX IS USED

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, map, catchError } from 'rxjs/operators';
import { Weather } from "src/app/model";
import { WeatherService } from "../../weather.service";
import { WeatherActions } from "../actions";

@Injectable()
export class GetWeatherEffect {

    searchForCity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WeatherActions.search),
            switchMap(action => this.weatherService.searchWeatherForCity(action.city)
                .pipe(
                    map((result: Weather) => {
                            return WeatherActions.searchSuccess({ result });
                        }
                    ),
                    catchError(error => {
                        debugger
                        return of(WeatherActions.searchFail({ error })); 
                    })
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private weatherService: WeatherService
    ) {
    }

}
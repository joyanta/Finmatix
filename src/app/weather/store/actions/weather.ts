// TO BE IMPLEMENTED IF YOU DECIDE TO USE NG-RX

import { createAction, props, union } from "@ngrx/store";
import { Weather } from "src/app/model";

export const search = createAction(
    '[Weather] Seach For City',
    props<{ city : string }>()
);
  
export const searchSuccess = createAction(
    '[Weather] Seach For City Success',
    props<{ result : Weather }>()
);
  
export const searchFail = createAction(
    '[Weather] Seach For City Fail',
    props<{ error: any }>()
);

const all = union({search, searchSuccess, searchFail });
export type WeatherActionsUnion = typeof all;

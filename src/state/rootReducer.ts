import { combineReducers } from "redux";
import { ratesReducer, RatesState } from "./rates";

export interface AppState {
    rates: RatesState
}

export const rootReducer = combineReducers<AppState>({
    rates: ratesReducer,
});

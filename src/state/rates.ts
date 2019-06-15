import { Reducer } from "redux";
import { Selector } from "reselect";
import { ThunkAction } from "redux-thunk";
import toaster from "toastr";
import { Currency, Price } from "../domain";
import { AppState } from "./rootReducer";
import { fetchRates } from "../transport";

type OperationThunk<Return = void> = ThunkAction<Return, AppState, void, any>;

const UPDATE_RATES = "rates/update";
const UPDATE_LOADING_INDICATOR = "rates/updateLoadingIndicator";

type UpdateRatesAction = ReturnType<typeof updateRatesAction>;
type UpdateRatesPayload = {
    rates: Record<Currency, Price>,
    baseCurrency: Currency,
    date: string;
}
export const updateRatesAction = (data: UpdateRatesPayload) => {
    const { rates, baseCurrency, date } = data;
    return {
        type: UPDATE_RATES as typeof UPDATE_RATES,
        payload: {
            rates,
            baseCurrency,
            date
        },
    }
};

type UpdateLoadingIndicatorAction = ReturnType<typeof updateLoadingIndicatorAction>;
export const updateLoadingIndicatorAction = (loading: boolean) => {
    return {
        type: UPDATE_LOADING_INDICATOR as typeof UPDATE_LOADING_INDICATOR,
        payload: loading,
    }
};

export const loadRates = (): OperationThunk => async (dispatch) => {
    try {
        dispatch(updateLoadingIndicatorAction(true));
        const data = await fetchRates();
        dispatch(updateRatesAction({
            rates: data.rates,
            date: data.date,
            baseCurrency: data.base,
        }))
    } catch (e) {
        console.error(e);
        toaster.error("Could not load data, sorry!")
    }
    dispatch(updateLoadingIndicatorAction(false));
};

export interface RatesState {
    readonly baseCurrency: Currency;
    readonly date: string;
    readonly rates: Record<Currency, Price>;
    readonly loading: boolean;
}

const initialState: RatesState = {
    rates: {},
    loading: false,
    date: "",
    baseCurrency: "",
};

export const selectRates: Selector<AppState, RatesState["rates"]> = (state) => state.rates.rates;
export const selectIsLoading: Selector<AppState, RatesState["loading"]> = (state) => state.rates.loading;
export const selectBaseCurrency: Selector<AppState, RatesState["baseCurrency"]> = (state) => state.rates.baseCurrency;
export const selectRatesLastUpdate: Selector<AppState, RatesState["date"]> = (state) => state.rates.date;

type Actions = UpdateRatesAction | UpdateLoadingIndicatorAction;
export const ratesReducer: Reducer<RatesState, Actions> = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_RATES:
            return {
                ...state,
                rates: action.payload.rates,
                baseCurrency: action.payload.baseCurrency,
                date: action.payload.date,
            };
        case UPDATE_LOADING_INDICATOR:
            return {
                ...state,
                loading: action.payload
            };
    }
    return state;
};

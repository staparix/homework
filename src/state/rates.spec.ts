const fetchRates = jest.fn();
jest.mock("../transport", () => {
    return {
        fetchRates: fetchRates,
    }
});

const toastrError = jest.fn();
jest.mock("toastr", () => ({
    error: toastrError
}));

import { AnyAction } from "redux";
import configureMockStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AppState } from "../state/rootReducer";

type DispatchExts = ThunkDispatch<AppState, void, AnyAction>;

import {
    loadRates,
    ratesReducer,
    RatesState,
    selectBaseCurrency,
    selectIsLoading, selectRates,
    selectRatesLastUpdate, updateLoadingIndicatorAction,
    updateRatesAction
} from "./rates";

const initialState: RatesState = {
    baseCurrency: "",
    date: "",
    loading: false,
    rates: {}
};

describe("state/rates", () => {
    describe("rates reducer", () => {
        it("should set to initial state if action is unknown", () => {
            const state = undefined;
            const result = ratesReducer(state, { type: "UNKNOWN_ACTION" } as any);

            expect(result).toEqual(initialState)
        });

        it("should update rates state on updateRatesAction", () => {
            const result = ratesReducer(initialState, updateRatesAction({
                baseCurrency: "EURO",
                date: "20.11.2013",
                rates: {
                    "USD": 1.22
                }
            }));
            expect(result).toEqual({
                ...initialState,
                baseCurrency: "EURO",
                date: "20.11.2013",
                rates: {
                    "USD": 1.22
                }
            });
        });
    });
    describe("rates selectors", () => {
        it("should return base currency", () => {
            const state: any = {
                rates: {
                    baseCurrency: "USD",
                }
            };
            expect(selectBaseCurrency(state)).toEqual("USD");
        });
        it("should return date", () => {
            const state: any = {
                rates: {
                    date: "11.09.2019",
                }
            };
            expect(selectRatesLastUpdate(state)).toEqual("11.09.2019");
        });
        it("should return loading", () => {
            const state: any = {
                rates: {
                    loading: true,
                }
            };
            expect(selectIsLoading(state)).toBe(true);
        });
        it("should return rates list", () => {
            const state: any = {
                rates: {
                    rates: { "USD": 1, "EURO": 2 },
                }
            };
            expect(selectRates(state)).toEqual({
                "USD": 1,
                "EURO": 2
            });
        });
    });

    describe("rates operations", () => {
        const createMockStore = configureMockStore<AppState, DispatchExts>([thunk]);
        const store = createMockStore({} as any);
        beforeEach(() => {
            store.clearActions();
        })
        it("should fetch rates and updates store state successfully", async () => {
            const ratesJSON = {
                base: "USD",
                date: "11.03.2019",
                rates: { "EUR": 1 }
            };
            fetchRates.mockReturnValue(Promise.resolve(ratesJSON));

            await store.dispatch(loadRates());
            const actions = store.getActions();

            expect(actions[0]).toEqual(updateLoadingIndicatorAction(true));
            expect(actions[1]).toEqual(updateRatesAction({
                baseCurrency: ratesJSON.base,
                rates: ratesJSON.rates,
                date: ratesJSON.date
            }));
            expect(actions[2]).toEqual(updateLoadingIndicatorAction(false));
        });

        it("should show error messages if fetch failed", async () => {
            fetchRates.mockReturnValue(Promise.reject("fail"));
            await store.dispatch(loadRates());
            const actions = store.getActions();

            expect(toastrError).toBeCalledWith("Could not load data, sorry!");
            expect(actions[0]).toEqual(updateLoadingIndicatorAction(true));
            expect(actions[1]).toEqual(updateLoadingIndicatorAction(false));
        });
    })
});

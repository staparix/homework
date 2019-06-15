import { MapStateToProps, connect } from "react-redux";

import { RateProps, RatesList } from "./RateList";
import { selectBaseCurrency, selectIsLoading, selectRates, selectRatesLastUpdate } from "../../state/rates";
import { AppState } from "../../state/rootReducer";

const mapStateToProps: MapStateToProps<RateProps, {}, AppState> = (state) => ({
    rates: selectRates(state),
    loading: selectIsLoading(state),
    date: selectRatesLastUpdate(state),
    baseCurrency: selectBaseCurrency(state),
});

export const RateListConnected = connect<RateProps, {}, {}, AppState>(mapStateToProps)(RatesList);

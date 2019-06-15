import { connect, MapDispatchToProps } from "react-redux";

import { App, AppProps } from "./App";
import { loadRates } from "./state/rates";
import { AppState } from "./state/rootReducer";

type DispatchProps = Pick<AppProps, "loadRates">;

const mapDispatchToProps: MapDispatchToProps<DispatchProps, AppState> = {
    loadRates: loadRates,
};
export const AppConnected = connect<{}, DispatchProps, {}, AppState>(null, mapDispatchToProps)(App);

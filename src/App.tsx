import * as React from "react";
import { RateListConnected } from "./components/rateList/RateListConnected";

export interface AppProps {
    loadRates: () => void;
}

export class App extends React.PureComponent<AppProps> {
    render() {
        return (
            <div>
                <button onClick={ this.props.loadRates }>Load data</button>
                <RateListConnected/>
            </div>
        )
    }
}

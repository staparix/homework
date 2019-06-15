import * as React from "react";
import { Rates } from "../../domain";
import { Rate } from "../rate/Rate";

export interface RateProps {
    rates: Rates;
    baseCurrency: string;
    date: string;
    loading: boolean;
}

export class RatesList extends React.PureComponent<RateProps> {
    render() {
        return this.props.loading ? "Loading..." : this.renderRates();
    }

    private renderRates = () => {
        const { rates, baseCurrency, date } = this.props;
        return (
            <>
                <div data-testid="base-currency" className="rate-base">{ baseCurrency }</div>
                <div data-testid="date" className="rate-date">{ date }</div>
                <div data-testid="rate-list" className="rate-list">
                    {
                        Object.keys(rates).map(currency => {
                            return <Rate key={ currency } currency={ currency } price={ rates[currency] }/>
                        })
                    }
                </div>
            </>
        )
    }
}

import * as React from "react";

export interface RateProps {
    currency: string;
    price: number;
}

export const Rate: React.FunctionComponent<RateProps> = ({ currency, price }) => {
    return (
        <div data-testid="rate" className="rate">
            <div data-testid="currency" className="rate-currency">{ currency }</div>
            <div data-testid="price" className="rate-price">{ price }</div>
        </div>
    );
};

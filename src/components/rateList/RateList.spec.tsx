import * as React from "react";
import { render, cleanup } from "@testing-library/react";

import { RatesList } from "./RateList";
import { Rates } from "../../domain";

afterEach(() => {
    cleanup();
});

describe("components/RateList", () => {
    it("renders list of rates", () => {
        const rates: Rates = {
            "USD": 1.22,
            "LV": 1.44
        };
        const element = render(<RatesList rates={rates} baseCurrency="Euro" date="20.11.2017" loading={false} />);

        expect(element.getAllByTestId("rate").length).toBe(2);
    });
    it("renders base currency and date", () => {
        const rates: Rates = {
            "USD": 1.22,
            "LV": 1.44
        };
        const date = "20.11.2017";
        const currency = "Euro";
        const element = render(<RatesList rates={rates} baseCurrency={currency} date={date} loading={false} />);

        expect(element.getByTestId("base-currency").textContent).toBe(currency);
        expect(element.getByTestId("date").textContent).toBe(date);
    });
    it("renders loading label and hides rates while loading", () => {
        const rates: Rates = {
            "USD": 1.22,
            "LV": 1.44
        };
        const date = "20.11.2017";
        const currency = "Euro";
        const element = render(<RatesList rates={rates} baseCurrency={currency} date={date} loading={true} />);

        expect(element.queryByTestId("rate-list")).toBeNull();
        expect(element.getByText("Loading...")).not.toBeNull();
    });
});

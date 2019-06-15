import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import { Rate } from "./Rate";

afterEach(() => {
    cleanup();
});

describe("components/Rate", () => {
    it("renders currency and price", () => {
        const element = render(<Rate currency={ "EUR" } price={ 1.2 }/>);

        expect(element.getByTestId("currency").textContent).toBe("EUR");
        expect(element.getByTestId("price").textContent).toBe("1.2");
    });
});

import { Currency, Price } from "./domain";

export interface RatesJSON {
    base: string;
    rates: Record<Currency, Price>;
    date: string;
}

interface BadRequest {
    error: string;
}

export const fetchRates = () => {
    return new Promise<RatesJSON>((resolve, reject) => {
        window.fetch("https://api.exchangeratesapi.io/latest")
            .then(rawData => rawData.json() as Promise<RatesJSON | BadRequest>)
            .then((data) => {
                if ("error" in data) {
                    reject(data.error);
                } else {
                    resolve(data);
                }
            }).catch(reject);
    });
};


export interface CurrencyRequest {
    code: string;
    value: number;
}

export interface CurrencyResponse {
    date: string;
    btc: Record<string, number>;
}

export interface CurrencyExchanges {
    fetch(): Promise<CurrencyResponse>;
}

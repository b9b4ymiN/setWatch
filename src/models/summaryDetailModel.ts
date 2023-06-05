export interface Reply_SummaryDetail {
    summaryDetail: SummaryDetail;
}

export interface SummaryDetail {
    maxAge: number
    priceHint: number
    previousClose: number
    open: number
    dayLow: number
    dayHigh: number
    regularMarketPreviousClose: number
    regularMarketOpen: number
    regularMarketDayLow: number
    regularMarketDayHigh: number
    dividendRate: number
    dividendYield: number
    exDividendDate: string
    payoutRatio: number
    fiveYearAvgDividendYield: number
    beta: number
    trailingPE: number
    forwardPE: number
    volume: number
    regularMarketVolume: number
    averageVolume: number
    averageVolume10days: number
    averageDailyVolume10Day: number
    bid: number
    ask: number
    bidSize: number
    askSize: number
    marketCap: number
    fiftyTwoWeekLow: number
    fiftyTwoWeekHigh: number
    priceToSalesTrailing12Months: number
    fiftyDayAverage: number
    twoHundredDayAverage: number
    trailingAnnualDividendRate: number
    trailingAnnualDividendYield: number
    currency: string
    fromCurrency: any
    toCurrency: any
    lastMarket: any
    coinMarketCapLink: any
    algorithm: any
    tradeable: boolean
}

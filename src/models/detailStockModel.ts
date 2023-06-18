export interface detailStockListModel {
    symbol: string
    yearly: ListModel[]
    quarterly: ListModel[]
}

export interface ListModel {
    keyValue: string
    Asset: number
    BookValuePerShare: number
    Cash: number
    CashCycle: number
    Close: number
    DA: number
    DebtToEquity: number
    DividendYield: number
    EVPerEbitDA: number
    EarningPerShare: number
    EarningPerShareYoY: number
    EbitDATTM: number
    Equity: number
    FinancingActivities: number
    Fiscal: number
    GPM: number
    GrossProfit: number
    InvestingActivities: number
    MKTCap: number
    NPM: number
    NetProfit: number
    NetProfitYoY: number
    OperatingActivities: number
    PaidUpCapital: number
    PriceBookValue: number
    PriceEarningRatio: number
    Quarter: number
    ROA: number
    ROE: number
    Revenue: number
    RevenueYoY: number
    SGA: number
    SGAPerRevenue: number
    SecurityID: number
    TotalDebt: number
}



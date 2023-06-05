export interface Reply_DefaultKeyStatistics {
    defaultKeyStatistics: DefaultKeyStatistics
}

export interface DefaultKeyStatistics {
    maxAge: number
    priceHint: number
    enterpriseValue: number
    profitMargins: number
    floatShares: number
    sharesOutstanding: number
    heldPercentInsiders: number
    heldPercentInstitutions: number
    beta: number
    impliedSharesOutstanding: number
    category: any
    bookValue: number
    priceToBook: number
    fundFamily: any
    legalType: any
    lastFiscalYearEnd: string
    nextFiscalYearEnd: string
    mostRecentQuarter: string
    earningsQuarterlyGrowth: number
    netIncomeToCommon: number
    trailingEps: number
    lastSplitFactor: string
    lastSplitDate: number
    enterpriseToRevenue: number
    enterpriseToEbitda: number
    "52WeekChange": number
    SandP52WeekChange: number
    lastDividendValue: number
    lastDividendDate: string
    pegRatio: number
    forwardPE: number
}

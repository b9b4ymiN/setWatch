
export interface EarningsModel {
    earnings: Earnings
}

export interface Earnings {
    maxAge: number
    earningsChart: EarningsChart
    financialsChart: FinancialsChart
    financialCurrency: string
}

export interface EarningsChart {
    quarterly: EarningsActEst[]
    earningsDate: EarningsActEst[]
    currentQuarterEstimate: number
    currentQuarterEstimateDate: string
    currentQuarterEstimateYear: number

}

export interface EarningsActEst {
    date: string,
    actual: number | null,
    estimate: number | null,
}

export interface FinancialsChart {
    yearly: EarningsInfo[]
    quarterly: EarningsInfo[]
}

export interface Yearly {
    date: number
    revenue: number
    earnings: number
}

export interface Quarterly {
    date: string
    revenue: number
    earnings: number
}

export interface EarningsInfo {
    date: string
    revenue: number
    earnings: number
}

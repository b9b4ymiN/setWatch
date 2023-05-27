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
    quarterly: any[]
    earningsDate: any[]
}

export interface FinancialsChart {
    yearly: Yearly[]
    quarterly: Quarterly[]
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

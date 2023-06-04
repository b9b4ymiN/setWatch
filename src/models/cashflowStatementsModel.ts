export interface CashflowStatementHistory {
    cashflowStatements: CashflowStatement[]
    maxAge: number
}

export interface cashflowStatementHistoryQuarterly {
    cashflowStatementsQuarterly: CashflowStatement[]
    maxAge: number
}


export interface CashflowStatement {
    maxAge: number
    endDate: string
    netIncome: number
    depreciation: number
    changeToNetincome: number
    changeToAccountReceivables: number
    changeToLiabilities: number
    changeToInventory: number
    changeToOperatingActivities: number
    totalCashFromOperatingActivities: number
    capitalExpenditures: number
    investments: number
    otherCashflowsFromInvestingActivities: number
    totalCashflowsFromInvestingActivities: number
    dividendsPaid: number
    netBorrowings: number
    totalCashFromFinancingActivities: number
    changeInCash: number
}

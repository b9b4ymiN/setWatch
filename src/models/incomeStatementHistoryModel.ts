export interface IncomeStatementHistory {
    incomeStatementHistory: IncomeStatementHistory2[]
    maxAge: number
}

export interface IncomeStatementHistoryQuarterly {
    incomeStatementHistoryQuarterly: IncomeStatementHistory2[]
    maxAge: number
}

export interface IncomeStatementHistory2 {
    maxAge: number
    endDate: string
    totalRevenue: number
    costOfRevenue: number
    grossProfit: number
    researchDevelopment: any
    sellingGeneralAdministrative: number
    nonRecurring: any
    otherOperatingExpenses: number
    totalOperatingExpenses: number
    operatingIncome: number
    totalOtherIncomeExpenseNet: number
    ebit: number
    interestExpense: number
    incomeBeforeTax: number
    incomeTaxExpense: number
    minorityInterest: any
    netIncomeFromContinuingOps: number
    discontinuedOperations: any
    extraordinaryItems: any
    effectOfAccountingCharges: any
    otherItems: any
    netIncome: number
    netIncomeApplicableToCommonShares: number
}

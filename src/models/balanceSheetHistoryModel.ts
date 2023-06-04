export interface BalanceSheetHistory {
    balanceSheetStatements: BalanceSheetStatement[]
    maxAge: number
}

export interface BalanceSheetHistoryQuarterly {
    balanceSheetHistoryQuarterly: BalanceSheetStatement[]
    maxAge: number
}

export interface BalanceSheetStatement {
    maxAge: number
    endDate: string
    cash: number
    netReceivables: number
    inventory: number
    otherCurrentAssets: number
    totalCurrentAssets: number
    propertyPlantEquipment: number
    otherAssets: number
    deferredLongTermAssetCharges: number
    totalAssets: number
    accountsPayable: number
    otherCurrentLiab: number
    otherLiab: number
    totalCurrentLiabilities: number
    totalLiab: number
    commonStock: number
    retainedEarnings: number
    capitalSurplus: number
    totalStockholderEquity: number
    netTangibleAssets: number
}

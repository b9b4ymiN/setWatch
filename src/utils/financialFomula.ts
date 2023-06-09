import { numberPercen3D } from "./format";

export function calEPS(totalNetIncome: number, totalHolderEquity: number) {
    return totalNetIncome / totalHolderEquity;
}

export function calDE(totalDebt: number, totalHolderEquity: number) {
    return totalDebt / totalHolderEquity;
}

export function calROE(netIncome: number, totalHolderEquity: number) {
    return numberPercen3D(netIncome / totalHolderEquity);
}

export function calROA(netIncome: number, totalAssets: number) {
    return numberPercen3D(netIncome / totalAssets);
}

export function calROIC(totalDebt: number, totalCurrentLiabilities: number, ebit: number, totalStockholderEquity: number) {
    let nonCurLiab = totalDebt - totalCurrentLiabilities;
    if (ebit == 0)
        return "-";
    else return numberPercen3D((ebit * 0.8) / (totalStockholderEquity + nonCurLiab));
}
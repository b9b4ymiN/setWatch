import { detailStockListModel } from "../detailStockModel";

export interface HistoricalCompareModel {
    symbol: string | null;
    mode: string | null;
    detail: detailStockListModel | undefined | null;
}
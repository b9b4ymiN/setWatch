
export interface FinancialsTableModel {
    header: string[] | null;
    bodyData: FinancialsDetailModel[];
    equity: number | null;
}

export interface FinancialsDetailModel {
    date: string;
    revenue: number;
    earnings: number;
}
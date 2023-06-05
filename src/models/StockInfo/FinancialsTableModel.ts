
export interface FinancialsTableModel {
    header: string[] | null;
    bodyData: FinancialsDetailModel[];
}

export interface FinancialsDetailModel {
    date: string;
    revenue: number;
    earnings: number;
}
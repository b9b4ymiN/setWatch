export function calPercen(qtyIn: number, qtyOut: number) {
    return (((qtyOut - qtyIn) * 100) / qtyIn).toFixed(2);
}
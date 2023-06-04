export function numberWithCommas(value: any) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function numberMilCommas(value: any) {
    return (value / 1000000).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


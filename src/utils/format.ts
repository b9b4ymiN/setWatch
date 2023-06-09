export function numberCmp(value: number) {
    const usformatter = Intl.NumberFormat("en-US", {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 2,
    });
    return usformatter.format(value);
}

export function number3F(value: number) {
    const usformatter = Intl.NumberFormat("en-US", {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3
    });
    return usformatter.format(value);
}

export function numberPercen3D(value: number) {
    const usformatter = Intl.NumberFormat("en-US", {
        style: 'percent',
        minimumFractionDigits: 3,
        maximumFractionDigits: 3
    });
    return usformatter.format(value);
}

export function numberWithCommas(value: any) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function numberMilCommas(value: any) {
    return (value / 1000000).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export function numberMorBMCommas(value: any) {
    if (value > 1000000000)
        return (value / 1000000000).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " B.";
    else
        return (value / 1000000).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " M.";
}

export function formatDateDividend(date: string) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var d = new Date(date),
        month = (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();


    return [day, monthNames[month], year].join(" ");
}

export interface Reply_QuoteType {
    quoteType: QuoteType
}

export interface QuoteType {
    exchange: string
    quoteType: string
    symbol: string
    underlyingSymbol: string
    shortName: string
    longName: string
    firstTradeDateEpochUtc: string
    timeZoneFullName: string
    timeZoneShortName: string
    uuid: string
    messageBoardId: string
    gmtOffSetMilliseconds: number
    maxAge: number
}

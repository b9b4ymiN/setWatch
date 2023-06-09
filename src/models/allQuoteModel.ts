
import { BalanceSheetHistory } from "./balanceSheetHistoryModel";
import { DefaultKeyStatistics } from "./defaultKeyStatisticsModel";
import { Earnings } from "./earningsModel";
import { IncomeStatementHistory } from "./incomeStatementHistoryModel";
import { Price } from "./priceModel";
import { QuoteType } from "./quoteTypeModel";
import { SummaryDetail } from "./summaryDetailModel";

export interface Replay_AllQuoteModel {
  summaryDetail: SummaryDetail;
  defaultKeyStatistics: DefaultKeyStatistics;
  earnings: Earnings;
  quoteType: QuoteType;
  price: Price;
  balanceSheetHistory: BalanceSheetHistory
  incomeStatementHistory: IncomeStatementHistory
}

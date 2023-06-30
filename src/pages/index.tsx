import HeaderNav from "@/component/shared/header";
import type { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  Container,
  Form,
  Col,
  Row,
} from "react-bootstrap";
//Chart
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";

//Loading
import * as LoadingData from "../utils/loading.json";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";

import {
  formatDateDividend,
  number3F,
  numberCmp,
  numberMilCommas,
  numberPercen3D,
  numberWithCommas,
} from "../utils/format";

//Model
import StockInfoPageModel from "@/models/stockInfoModel";
import axios from "axios";
import { apiHost, apiHostOld } from "@/utils/apiconfig";
import {
  EarningsActEst,
  EarningsInfo,
  EarningsModel,
  Quarterly,
} from "@/models/earningsModel";
import {
  DefaultKeyStatistics,
  Reply_DefaultKeyStatistics,
} from "@/models/defaultKeyStatisticsModel";
import { Reply_QuoteType, QuoteType } from "@/models/quoteTypeModel";
import { Price, Reply_Price } from "@/models/priceModel";
import {
  Reply_SummaryDetail,
  SummaryDetail,
} from "@/models/summaryDetailModel";
import { calPercen } from "@/utils/mathFuntion";
import FinancialTable from "@/component/tableFinancial";
import { FinancialsDetailModel } from "@/models/StockInfo/FinancialsTableModel";
import { symbolList } from "@/models/symbolListModel";
import { Replay_AllQuoteModel } from "@/models/allQuoteModel";
import {
  BalanceSheetHistory,
  BalanceSheetStatement,
} from "@/models/balanceSheetHistoryModel";
import { calDE, calROIC } from "@/utils/financialFomula";
import {
  IncomeStatementHistory,
  IncomeStatementHistory2,
} from "@/models/incomeStatementHistoryModel";
import { ListModel, detailStockListModel } from "@/models/detailStockModel";
import HistoricalCompare from "@/component/historicalCompare";

interface propType {
  symbolQ: string;
  listSymbol: string[];
}

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: LoadingData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const delayTime = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const IndexPage: NextPage<propType> = (props) => {
  //Router
  const router = useRouter();

  //State proprety
  const [selStockSymbol, setSelStockSymbol] = useState<string>(props.symbolQ);
  const [earnData, setEarnData] = useState<EarningsModel>();
  const [defKeyData, setDefKeyData] = useState<DefaultKeyStatistics>();
  const [quoteData, setQuoteData] = useState<QuoteType>();
  const [priceData, setPriceData] = useState<Price>();
  const [sumData, setSumData] = useState<SummaryDetail>();
  const [earningsMode, setEarningsMode] = useState<string>("Quarterly");
  const [bsDataYearly, setBsDataYearly] = useState<BalanceSheetStatement>();
  //Chart
  const [dataChartEarning, setDataChartEarning] = useState<EarningsActEst[]>(
    []
  );
  //Table
  const [bodyFinData, setBodyFinData] = useState<FinancialsDetailModel[]>([]);
  const [bodyFinDataYear, setBodyFinDataYear] = useState<
    FinancialsDetailModel[]
  >([]);
  const [incomeDataYear, setIncomeDataYear] =
    useState<IncomeStatementHistory2[]>();

  const [detailList, setDetailList] = useState<detailStockListModel>();
  const [lastQualter, setLastQualter] = useState<ListModel>();
  const [companyCash, setCompanyCash] = useState<number>(0);
  const [cashPStock, setCashPStock] = useState<number>(0);

  //Component did mount
  useEffect(() => {
    getAllQuteStock();
  }, [router.query]);

  //Function information
  const getAllQuteStock = async () => {
    setLoading(true);
    await delayTime(1000);
    const api_link =
      "https://anlze-api.vercel.app/api2/stockinfoMuti?stock=" + props.symbolQ;

    const response = await axios.post<Replay_AllQuoteModel>(api_link, {
      modules: [
        "price",
        "summaryDetail",
        "defaultKeyStatistics",
        "quoteType",
        "balanceSheetHistory",
        "incomeStatementHistory",
      ],
    });
    if (response != null) {
      setPriceData(response.data.price);
      setSumData(response.data.summaryDetail);
      setDefKeyData(response.data.defaultKeyStatistics);
      setQuoteData(response.data.quoteType);
      if (response.data.balanceSheetHistory != null) {
        setBsDataYearly(
          response.data.balanceSheetHistory.balanceSheetStatements.sort(
            (a, b) => b.endDate.localeCompare(a.endDate)
          )[0]
        );
      }

      if (response.data.incomeStatementHistory != null) {
        setIncomeDataYear(
          response.data.incomeStatementHistory.incomeStatementHistory.sort(
            (a, b) => b.endDate.localeCompare(a.endDate)
          )
        );
      }
    }
    await getEarningData();
    await getDetailStockList();
    await delayTime(1000);
    setLoading(false);
  };

  const getDetailStockList = async () => {
    try {
      const api_link =
        "https://anlze-api.vercel.app/api2/fbGrowthData?stock=" + props.symbolQ;

      const response = await axios.get<detailStockListModel>(api_link);
      if (response != null) {
        setDetailList(response.data);
        let data =
          earningsMode === "Quarterly"
            ? response.data.quarterly
            : response.data.yearly;

        //ListModel
        let lastQual: ListModel =
          response.data.quarterly[response.data.quarterly.length - 1];
        setLastQualter(lastQual);
        console.log("lastQual", lastQual);
        setCompanyCash(lastQual.Cash);
        if (
          lastQual.Cash != null &&
          lastQual.Cash != undefined &&
          lastQual.PaidUpCapital != null &&
          lastQual.PaidUpCapital != undefined
        ) {
          setCashPStock(lastQual.Cash / lastQual.PaidUpCapital);
        }
      }
    } catch {}
  };

  const getEarningData = async () => {
    if (props.symbolQ) {
      try {
        const api_link =
          apiHost + "/stockinfo?stock=" + props.symbolQ + "&mode=earnings";
        const response = await axios.get<EarningsModel>(api_link);
        setEarnData(response.data);

        //Qualterly
        const qEarning: EarningsActEst[] =
          response.data.earnings.earningsChart.quarterly;
        const estData: EarningsActEst = {
          date:
            response.data.earnings.earningsChart.currentQuarterEstimateDate +
            response.data.earnings.earningsChart.currentQuarterEstimateYear.toString(),
          actual: null,
          estimate: response.data.earnings.earningsChart.currentQuarterEstimate,
        };
        qEarning.push(estData);
        setDataChartEarning(qEarning);

        //Table
        setBodyFinData(response.data.earnings.financialsChart.quarterly);
        setBodyFinDataYear(response.data.earnings.financialsChart.yearly);
      } catch {
        setDataChartEarning([]);
        setBodyFinData([]);
        setBodyFinDataYear([]);
      }
    }
  };

  //Event information
  const submitButton = (e: any) => {
    e.preventDefault();
    console.log("event summit");
    router.push({
      pathname: "/",
      query: { symbol: selStockSymbol },
    });
  };

  const [loading, setLoading] = useState(false);

  const GetClassUpDown = (
    last: ListModel | undefined,
    price: Price | undefined
  ) => {
    if (last && price) {
      const remain = last.Cash - last.TotalDebt;
      const cash2Stock = remain / last.PaidUpCapital;

      console.info("cash : " + cash2Stock);
      if (price.regularMarketPrice > cash2Stock)
        return "fs-14px text-middle-gray m-0  tx-down";
      else return "fs-14px text-middle-gray m-0  tx-up";
    } else return "";
  };

  return (
    <>
      {loading ? (
        <div className="centerDiv">
          <FadeIn>
            <Lottie options={defaultOptions} height={400} width={400} />
            <h1 style={{ fontWeight: 600, marginTop: "-10px" }}>Loading...</h1>
          </FadeIn>
        </div>
      ) : (
        <>
          <HeaderNav />
          <Container fluid>
            <h1 className="tx-header">Stock info</h1>
            <Breadcrumb>
              <Breadcrumb.Item href="#">S.Watch</Breadcrumb.Item>
              <Breadcrumb.Item active>Stock info</Breadcrumb.Item>
            </Breadcrumb>
            <Card>
              <Card.Body>
                <Card.Title className="tx-header">Select Stock</Card.Title>
                <Card.Subtitle className="mb-2 text-muted tx-subtitle">
                  Select stock symbol for load information.
                </Card.Subtitle>
                <Form onSubmit={(e) => submitButton(e)}>
                  <Form.Group className="mt-3 mb-3" controlId="formBasicEmail">
                    <Form.Select
                      className="form-control"
                      aria-label="Default select example"
                      value={selStockSymbol}
                      onChange={(e) => setSelStockSymbol(e.target.value)}
                    >
                      {props.listSymbol.map((item) => {
                        return (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            <hr />
            <Card className="mt-3">
              <Card.Body>
                <Card.Title className="tx-header">Highlight</Card.Title>
                <Card.Subtitle className="mb-2 text-muted tx-subtitle">
                  Stock <Badge>{selStockSymbol}</Badge> Highlight and current
                  information.
                </Card.Subtitle>
                <Container fluid>
                  <Row>
                    <Col className="p-2" md={12}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        Company Name
                      </div>
                      <div className="fs-14px text-middle-gray m-0">
                        {priceData ? priceData.longName : "-"}
                      </div>
                    </Col>
                    <Col className="p-2" md={6}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        Exchange
                      </div>
                      <div className="fs-14px text-middle-gray m-0">
                        {priceData
                          ? priceData.exchange + "/" + priceData.exchangeName
                          : "-"}
                      </div>
                    </Col>
                    <Col className="p-2" xs={6} md={4}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        Current Price
                      </div>
                      <div
                        className={
                          "fs-14px text-middle-gray m-0 " +
                          (priceData
                            ? priceData.regularMarketChangePercent > 0
                              ? "tx-up"
                              : "tx-down"
                            : "")
                        }
                      >
                        {priceData ? priceData.regularMarketPrice : "-"}
                      </div>
                    </Col>
                    <Col className="p-2" xs={6} md={4}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        Change Percent
                      </div>
                      <div
                        className={
                          "fs-14px text-middle-gray m-0 " +
                          (priceData
                            ? priceData.regularMarketChangePercent > 0
                              ? "tx-up"
                              : "tx-down"
                            : "")
                        }
                      >
                        {priceData
                          ? (
                              priceData.regularMarketChangePercent * 100
                            ).toFixed(2) + "%"
                          : "-"}
                      </div>
                    </Col>
                    <Col className="p-2" xs={6} md={4}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        high 52Week
                      </div>
                      <div className="fs-14px text-middle-gray m-0">
                        {sumData && priceData
                          ? sumData.fiftyTwoWeekHigh +
                            " (" +
                            calPercen(
                              priceData.regularMarketPrice,
                              sumData.fiftyTwoWeekHigh
                            ) +
                            "%)"
                          : "-"}
                      </div>
                    </Col>
                    <Col className="p-2" xs={6} md={4}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        low 52Week
                      </div>
                      <div className="fs-14px text-middle-gray m-0">
                        {sumData && priceData
                          ? sumData.fiftyTwoWeekLow +
                            " (" +
                            calPercen(
                              sumData.fiftyTwoWeekLow,
                              priceData.regularMarketPrice
                            ) +
                            "%)"
                          : "-"}
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <hr />
                  </Row>
                  <Row>
                    <Col className="p-2" xs={6} md={4}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        Market Cap.
                      </div>
                      <div className="fs-14px text-middle-gray m-0">
                        {priceData && priceData.marketCap != undefined
                          ? numberMilCommas(priceData.marketCap) + " M."
                          : "-"}
                      </div>
                    </Col>
                    <Col className="p-2" xs={6} md={4}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        EV. (Enterprise Value)
                      </div>
                      <div className="fs-14px text-middle-gray m-0">
                        {defKeyData && defKeyData.enterpriseValue != undefined
                          ? numberMilCommas(defKeyData.enterpriseValue) + " M."
                          : "-"}
                      </div>
                    </Col>
                    <Col className="p-2" xs={6} md={4}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        SharesOut standing
                      </div>
                      <div className="fs-14px text-middle-gray m-0">
                        {defKeyData && defKeyData.sharesOutstanding != undefined
                          ? numberWithCommas(defKeyData.sharesOutstanding)
                          : lastQualter
                          ? numberWithCommas(lastQualter.PaidUpCapital)
                          : "-"}
                      </div>
                    </Col>
                    <Col className="p-2" xs={6} md={4}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        Book Value
                      </div>
                      <div className="fs-14px text-middle-gray m-0">
                        {defKeyData && defKeyData.bookValue != undefined
                          ? defKeyData.bookValue
                          : "-"}
                      </div>
                    </Col>
                    <Col className="p-2" xs={6} md={4}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        P/BV.
                      </div>
                      <div className="fs-14px text-middle-gray m-0">
                        {defKeyData && defKeyData.priceToBook != undefined
                          ? defKeyData.priceToBook.toFixed(2)
                          : "-"}
                      </div>
                    </Col>
                    <Col className="p-2" xs={6} md={4}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        PEG Ratio.
                      </div>
                      <div className="fs-14px text-middle-gray m-0">
                        {defKeyData && defKeyData.pegRatio != undefined
                          ? defKeyData.pegRatio.toFixed(2)
                          : "-"}
                      </div>
                    </Col>
                    <Col className="p-2" xs={6} md={4}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        P/E
                      </div>
                      <div className="fs-14px text-middle-gray m-0">
                        {sumData && sumData.trailingPE != undefined
                          ? sumData.trailingPE.toFixed(2)
                          : "-"}
                      </div>
                    </Col>
                    <Col className="p-2" xs={6} md={6}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        Forword P/E
                      </div>
                      <div className="fs-14px text-middle-gray m-0">
                        {sumData && sumData.forwardPE != undefined
                          ? sumData.forwardPE.toFixed(2)
                          : "-"}
                      </div>
                    </Col>
                    <Col className="p-2" xs={6} md={4}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        CompanyCash
                      </div>
                      <div className="fs-14px text-middle-gray m-0">
                        {companyCash != undefined
                          ? numberCmp(companyCash)
                          : "-"}
                      </div>
                    </Col>
                    <Col className="p-2" xs={6} md={6}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        Cash/Stock
                      </div>
                      <div
                        className={
                          "fs-14px text-middle-gray m-0" +
                          (priceData &&
                          cashPStock > priceData.regularMarketPrice
                            ? " tx-up"
                            : " tx-down")
                        }
                      >
                        {cashPStock != undefined
                          ? cashPStock.toFixed(2) + " THB"
                          : "-"}
                      </div>
                    </Col>
                    <Col className="p-2" xs={6} md={4}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        Total Debt
                      </div>
                      <div className="fs-14px text-middle-gray m-0">
                        {lastQualter ? numberCmp(lastQualter.TotalDebt) : "-"}
                      </div>
                    </Col>
                    <Col className="p-2" xs={6} md={6}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        Real Cash price
                      </div>
                      <div className={GetClassUpDown(lastQualter, priceData)}>
                        {lastQualter
                          ? (
                              (lastQualter.Cash - lastQualter.TotalDebt) /
                              lastQualter.PaidUpCapital
                            ).toFixed(2) + " THB"
                          : "-"}
                        {" ("}
                        {priceData && lastQualter
                          ? calPercen(
                              priceData?.regularMarketPrice,
                              (lastQualter.Cash - lastQualter.TotalDebt) /
                                lastQualter.PaidUpCapital
                            )
                          : ""}
                        {"%)"}
                      </div>
                    </Col>
                    <Col className="p-2" xs={12} md={6}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        Remark <Badge bg="info">(Cash/Stock)</Badge>
                      </div>
                      <div className={"fs-12px  text-middle-gray m-0"}>
                        <span>
                          Compare cash with total share stock in safe if current
                          price less than this value
                        </span>
                      </div>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <hr />
                  </Row>
                  <Row>
                    <Col className="p-2" xs={12}>
                      <div
                        className="title-font-family fs-20px text-neutral-deep-gray"
                        style={{ fontWeight: 700 }}
                      >
                        <u>Dividend information</u>
                      </div>
                    </Col>
                    <Col className="p-2" xs={6} md={4}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        Dividend Yield
                      </div>
                      <div className="fs-14px text-middle-gray m-0">
                        {sumData && sumData.dividendYield != undefined
                          ? (sumData.dividendYield * 100).toFixed(2) + "%"
                          : "-"}
                      </div>
                    </Col>
                    <Col className="p-2" xs={6} md={4}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        Yield (Avg.5Y)
                      </div>
                      <div className="fs-14px text-middle-gray m-0">
                        {sumData
                          ? sumData.fiveYearAvgDividendYield != undefined
                            ? sumData.fiveYearAvgDividendYield.toFixed(2) + "%"
                            : "-"
                          : "-"}
                      </div>
                    </Col>
                    <Col className="p-2" xs={12}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        Last dividend date
                      </div>
                      <div className="fs-14px text-middle-gray m-0">
                        {sumData
                          ? formatDateDividend(sumData.exDividendDate)
                          : "-"}
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <hr />
                  </Row>
                  <Row>
                    <Col className="p-2" xs={12}>
                      <div
                        className="title-font-family fs-20px text-neutral-deep-gray"
                        style={{ fontWeight: 700 }}
                      >
                        <u>Financial information</u>
                      </div>
                    </Col>
                    <Col className="p-2" xs={6} md={4}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        D/E
                      </div>
                      <div className="fs-14px text-middle-gray m-0">
                        {bsDataYearly
                          ? number3F(
                              calDE(
                                bsDataYearly.totalLiab
                                  ? bsDataYearly.totalLiab
                                  : 0,
                                bsDataYearly.totalStockholderEquity
                                  ? bsDataYearly.totalStockholderEquity
                                  : 0
                              )
                            )
                          : "-"}
                      </div>
                    </Col>
                    <Col className="p-2" xs={6} md={4}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        ROE
                      </div>
                      <div className="fs-14px text-middle-gray m-0">
                        {incomeDataYear && bsDataYearly
                          ? numberPercen3D(
                              calDE(
                                incomeDataYear[0].netIncome
                                  ? incomeDataYear[0].netIncome
                                  : 0,
                                bsDataYearly.totalStockholderEquity
                                  ? bsDataYearly.totalStockholderEquity
                                  : 0
                              )
                            )
                          : "-"}
                      </div>
                    </Col>
                    <Col className="p-2" xs={6} md={4}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        ROA
                      </div>
                      <div className="fs-14px text-middle-gray m-0">
                        {incomeDataYear && bsDataYearly
                          ? numberPercen3D(
                              calDE(
                                incomeDataYear[0].netIncome
                                  ? incomeDataYear[0].netIncome
                                  : 0,
                                bsDataYearly.totalAssets
                                  ? bsDataYearly.totalAssets
                                  : 0
                              )
                            )
                          : "-"}
                      </div>
                    </Col>
                    <Col className="p-2" xs={6} md={4}>
                      <div className="title-font-family fs-20px text-neutral-deep-gray">
                        ROIC
                      </div>
                      <div className="fs-14px text-middle-gray m-0">
                        {incomeDataYear && bsDataYearly
                          ? calROIC(
                              bsDataYearly.totalLiab
                                ? bsDataYearly.totalLiab
                                : 0,
                              bsDataYearly.totalCurrentLiabilities
                                ? bsDataYearly.totalCurrentLiabilities
                                : 0,
                              incomeDataYear[0].ebit
                                ? incomeDataYear[0].ebit
                                : 0,
                              bsDataYearly.totalStockholderEquity
                                ? bsDataYearly.totalStockholderEquity
                                : 0
                            )
                          : "-"}
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
            {/* Chart Earning  card */}
            <Card className="mt-3">
              <Card.Body>
                <Row>
                  <Col xs={12}>
                    <Card.Title className="tx-header">
                      <div style={{ display: "block" }}>
                        <div style={{ float: "left" }}>
                          Earning Inforamtions
                          <br />
                          <span className="mb-2 text-muted tx-subtitle">
                            Stock <Badge>{selStockSymbol}</Badge> Highlight and
                            current information.
                          </span>
                        </div>
                        <Button
                          style={{ float: "right" }}
                          variant={
                            earningsMode == "Quarterly" ? "primary" : "success"
                          }
                          type="submit"
                          onClick={() =>
                            setEarningsMode(
                              earningsMode == "Quarterly"
                                ? "Yearly"
                                : "Quarterly"
                            )
                          }
                        >
                          {earningsMode}
                        </Button>
                      </div>
                    </Card.Title>
                  </Col>
                  <Col xs={12} className="mt-3 chartBody">
                    <div className="title-font-family fs-20px text-neutral-deep-gray">
                      Quarterly Earning Chart ( EPS act/est value ).
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                      <AreaChart
                        data={dataChartEarning}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="colorEst"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#8884d8"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#8884d8"
                              stopOpacity={0}
                            />
                          </linearGradient>
                          <linearGradient
                            id="colorAct"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#82ca9d"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#82ca9d"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis fontSize={10} dataKey="date" />
                        <YAxis
                          fontSize={10}
                          type="number"
                          domain={["dataMax + 0.2"]}
                        />
                        <CartesianGrid strokeDasharray="2 2" />
                        <Tooltip />
                        <Legend verticalAlign="top" height={30} />
                        <Area
                          type="monotone"
                          dataKey="estimate"
                          stroke="#8884d8"
                          fillOpacity={0.2}
                          fill="url(#colorEst)"
                          activeDot={{ strokeWidth: 2, r: 5 }}
                        ></Area>
                        <Area
                          type="monotone"
                          dataKey="actual"
                          stroke="#82ca9d"
                          fillOpacity={0.8}
                          fill="url(#colorAct)"
                        >
                          <LabelList
                            dataKey="actual"
                            position="top"
                            fontSize={10}
                            color="#82ca9d"
                          />
                        </Area>
                      </AreaChart>
                    </ResponsiveContainer>
                  </Col>
                  <Col className="mt-2">
                    <div className="title-font-family fs-20px text-neutral-deep-gray">
                      Financials Info.
                    </div>
                    <FinancialTable
                      header={
                        earningsMode == "Quarterly"
                          ? bodyFinData.map((x) => x.date)
                          : bodyFinDataYear.map((x) => x.date.toString())
                      }
                      bodyData={
                        earningsMode == "Quarterly"
                          ? bodyFinData
                          : bodyFinDataYear
                      }
                      equity={defKeyData ? defKeyData.sharesOutstanding : null}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <HistoricalCompare
              symbol={props.symbolQ}
              mode={earningsMode}
              detail={detailList}
            />
          </Container>
        </>
      )}
    </>
  );
};

IndexPage.getInitialProps = async (ctx: NextPageContext) => {
  const link = apiHostOld + "/listSymbol";

  const json: string[] = await axios.get<symbolList[]>(link).then((res) => {
    return res.data.map((el) => el.symbol);
  });

  const { symbol } = ctx.query;
  return { symbolQ: symbol ? symbol.toString() : "", listSymbol: json };
};

export default IndexPage;

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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";

import { numberMilCommas, numberWithCommas } from "../utils/format";

//Model
import StockInfoPageModel from "@/models/stockInfoModel";
import axios from "axios";
import apiHost from "@/utils/apiconfig";
import { EarningsModel } from "@/models/earningsModel";
import {
  DefaultKeyStatistics,
  Reply_DefaultKeyStatistics,
} from "@/models/defaultKeyStatisticsModel";
import { Reply_QuoteType, QuoteType } from "@/models/quoteTypeModel";
import { Price, Reply_Price } from "@/models/priceModel";

interface propType {
  symbolQ: string;
}

const IndexPage: NextPage<propType> = (props) => {
  //Router
  const router = useRouter();

  //State proprety
  const [selStockSymbol, setSelStockSymbol] = useState<string>("SMPC");
  const [earnData, setEarnData] = useState<EarningsModel>();
  const [defKeyData, setDefKeyData] = useState<DefaultKeyStatistics>();
  const [quoteData, setQuoteData] = useState<QuoteType>();
  const [priceData, setPriceData] = useState<Price>();

  //Component did mount
  useEffect(() => {
    getPrice();
    getKeyInfo();
    getQuoteType();
  }, [router.query]);

  //Function information
  const getKeyInfo = async () => {
    if (props.symbolQ) {
      const api_link =
        apiHost +
        "/stockinfo?stock=" +
        props.symbolQ +
        "&mode=defaultKeyStatistics";
      console.log("api : ", api_link);
      const response = await axios.get<Reply_DefaultKeyStatistics>(api_link);
      setDefKeyData(response.data.defaultKeyStatistics);
    }
  };

  const getQuoteType = async () => {
    if (props.symbolQ) {
      const api_link =
        apiHost + "/stockinfo?stock=" + props.symbolQ + "&mode=quoteType";
      console.log("api : ", api_link);
      const response = await axios.get<Reply_QuoteType>(api_link);
      setQuoteData(response.data.quoteType);
    }
  };

  const getPrice = async () => {
    if (props.symbolQ) {
      const api_link =
        apiHost + "/stockinfo?stock=" + props.symbolQ + "&mode=price";
      console.log("api : ", api_link);
      const response = await axios.get<Reply_Price>(api_link);
      setPriceData(response.data.price);
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

  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  ];

  return (
    <>
      <HeaderNav />
      <Container fluid>
        <h1 className="tx-header">
          Home
          <Badge bg="primary">New </Badge>
        </h1>
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
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
                  <option value="">Please select stock symbol</option>
                  <option value="SMPC">SMPC</option>
                  <option value="PTT">PTT</option>
                  <option value="JMT">JMT</option>
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
            <Card.Title className="tx-header">Hight-light</Card.Title>
            <Card.Subtitle className="mb-2 text-muted tx-subtitle">
              Stock <Badge>{selStockSymbol}</Badge> hight-light and current
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
                  <div className="fs-14px text-middle-gray m-0">
                    {priceData
                      ? (priceData.regularMarketChangePercent * 100).toFixed(
                          2
                        ) + "%"
                      : "-"}
                  </div>
                </Col>
              </Row>
              <Row>
                <hr />
              </Row>
              <Row>
                <Col className="p-2" xs={6} md={4}>
                  <div className="title-font-family fs-20px text-neutral-deep-gray">
                    Market Cap.
                  </div>
                  <div className="fs-14px text-middle-gray m-0">
                    {priceData
                      ? numberMilCommas(priceData.marketCap) + " M."
                      : "-"}
                  </div>
                </Col>
                <Col className="p-2" xs={6} md={4}>
                  <div className="title-font-family fs-20px text-neutral-deep-gray">
                    EV. (Enterprise Value)
                  </div>
                  <div className="fs-14px text-middle-gray m-0">
                    {defKeyData
                      ? numberMilCommas(defKeyData.enterpriseValue) + " M."
                      : "-"}
                  </div>
                </Col>
                <Col className="p-2" xs={6} md={4}>
                  <div className="title-font-family fs-20px text-neutral-deep-gray">
                    SharesOut standing
                  </div>
                  <div className="fs-14px text-middle-gray m-0">
                    {defKeyData
                      ? numberWithCommas(defKeyData.sharesOutstanding)
                      : "-"}
                  </div>
                </Col>
                <Col className="p-2" xs={6} md={4}>
                  <div className="title-font-family fs-20px text-neutral-deep-gray">
                    Book Value
                  </div>
                  <div className="fs-14px text-middle-gray m-0">
                    {defKeyData ? defKeyData.bookValue : "-"}
                  </div>
                </Col>
                <Col className="p-2" xs={6} md={4}>
                  <div className="title-font-family fs-20px text-neutral-deep-gray">
                    P/BV.
                  </div>
                  <div className="fs-14px text-middle-gray m-0">
                    {defKeyData ? defKeyData.priceToBook : "-"}
                  </div>
                </Col>
                <Col className="p-2" xs={6} md={4}>
                  <div className="title-font-family fs-20px text-neutral-deep-gray">
                    P/BV.
                  </div>
                  <div className="fs-14px text-middle-gray m-0">
                    {defKeyData ? defKeyData.priceToBook : "-"}
                  </div>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title className="tx-header">Earnings</Card.Title>
            <Card.Subtitle className="mb-2 text-muted tx-subtitle">
              Stock <Badge>{selStockSymbol}</Badge> earning information.
            </Card.Subtitle>
            <div className="col-12 chartBody">
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                  height={250}
                  data={data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                  <Area
                    type="monotone"
                    dataKey="pv"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

IndexPage.getInitialProps = async (ctx: NextPageContext) => {
  const { symbol } = ctx.query;
  return { symbolQ: symbol ? symbol.toString() : "" };
};

export default IndexPage;

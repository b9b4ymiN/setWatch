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
} from "react-bootstrap";

//Model
import StockInfoPageModel from "@/models/stockInfoModel";
import axios from "axios";
import apiHost from "@/utils/apiconfig";
import { EarningsModel } from "@/models/earningsModel";

interface propType {
  symbolQ: string;
}

const IndexPage: NextPage<propType> = (props) => {
  //Router
  const router = useRouter();

  //State proprety
  const [selStockSymbol, setSelStockSymbol] = useState<string>("SMPC");
  const [earnData, setEarnData] = useState<EarningsModel>();

  //Component did mount
  useEffect(() => {
    getEarningInfo();
  }, [router.query]);

  //Function information
  const getEarningInfo = async () => {
    if (props.symbolQ) {
      const api_link =
        apiHost + "/stockinfo?stock=" + props.symbolQ + "&mode=earnings";
      console.log("api : ", api_link);
      const response = await axios.get<EarningsModel>(api_link);
      console.info(response.data);
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
        <Card>
          <Card.Body>
            <Card.Title className="tx-header">Earnings</Card.Title>
            <Card.Subtitle className="mb-2 text-muted tx-subtitle">
              Stock <Badge>{selStockSymbol}</Badge> earning information.
            </Card.Subtitle>
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

import HeaderNav from "@/component/shared/header";
import type { NextPage } from "next";
import Head from "next/head";
import { Card } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const IndexPage: NextPage = () => {
  return (
    <>
      <HeaderNav />
      <Container fluid>
        <Card>
          <Card.Body>This is some text within a card body.</Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default IndexPage;

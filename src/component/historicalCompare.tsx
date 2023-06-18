import { HistoricalCompareModel } from "@/models/StockInfo/HistoricalCompareModel";
import { Badge, Card, Col, Row } from "react-bootstrap";

function HistoricalCompare({ symbol, mode, detail }: HistoricalCompareModel) {
  return (
    <Card className="mt-3">
      <Card.Body>
        <Row>
          <Col xs={12}>
            <Card.Title className="tx-header">
              <div style={{ display: "block" }}>
                <div style={{ float: "left" }}>
                  Historical
                  <br />
                  <span className="mb-2 text-muted tx-subtitle">
                    Stock <Badge>{symbol}</Badge> compare history information
                  </span>
                </div>
              </div>
            </Card.Title>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default HistoricalCompare;

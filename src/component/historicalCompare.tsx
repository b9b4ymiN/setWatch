import { HistoricalCompareModel } from "@/models/StockInfo/HistoricalCompareModel";
import { ListModel } from "@/models/detailStockModel";
import { number3F, numberCmp } from "@/utils/format";
import { Badge, Card, Col, Row, Table } from "react-bootstrap";

function HistoricalCompare({ symbol, mode, detail }: HistoricalCompareModel) {
  console.info(detail);
  let listDisplay: ListModel[] = [];
  let maxEarningYear = 0;
  if (detail != null && detail != undefined) {
    if (mode != "Quarterly") {
      listDisplay = detail.yearly;
      maxEarningYear = Math.max(...detail.yearly.map((item) => item.NetProfit));
      console.log("Max Net : ", maxEarningYear);
      const cYear = new Date().getFullYear();
      const listCurrent: ListModel[] = detail.quarterly.filter((item) =>
        item.keyValue.includes(cYear.toString())
      );

      let listLastYear: ListModel[] = detail.quarterly.filter((item) =>
        item.keyValue.includes((cYear - 1).toString())
      );

      listLastYear = listLastYear.slice(
        listCurrent.length,
        listLastYear.length
      );

      let listEST: ListModel[] = [...listLastYear, ...listCurrent];
      console.log(listEST);
      //Checking this data have all not before adding
      if (
        listDisplay.findIndex(
          (item) => item.keyValue == listCurrent[0].keyValue
        ) == -1
      ) {
        listCurrent.forEach((item) => {
          listDisplay.push(item);
        });

        listCurrent.push();
      }
    }
  }
  return (
    <>
      {detail != null && detail != undefined ? (
        <Card className="mt-3">
          <Card.Body>
            <Card.Title className="tx-header">
              <Col xs="12">
                <div>
                  Historical
                  <br />
                  <span className="mb-2 text-muted tx-subtitle">
                    Summary historical compare revenue earnings with current
                  </span>
                </div>
              </Col>
              <Col xs="12">
                <Table
                  striped
                  bordered
                  hover
                  size="sm"
                  className="tableFin mt-2"
                >
                  <thead>
                    <tr className="td-headerCenter">
                      <th>Year</th>
                      <th>Price</th>
                      <th>Revenue</th>
                      <th>Earning</th>
                      <th>P/E</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listDisplay.map((item, index) => {
                      return (
                        <tr
                          key={"Tr" + item.keyValue + index.toString()}
                          className={item.keyValue.length != 4 ? "trcYear" : ""}
                        >
                          <td className="td-headerCenter">{item.keyValue}</td>
                          <td>{item.Close ? item.Close : "-"}</td>
                          <td>{numberCmp(item.Revenue)}</td>
                          <td
                            className={
                              maxEarningYear == item.NetProfit ? "tx-up bg-up" : ""
                            }
                          >
                            {numberCmp(item.NetProfit)}
                          </td>
                          <td>
                            {item.Close && item.EarningPerShare
                              ? numberCmp(item.Close / item.EarningPerShare)
                              : "-"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Col>
            </Card.Title>
          </Card.Body>
        </Card>
      ) : (
        <h3 className="tx-red"> Can't load History Stock {symbol}</h3>
      )}
    </>
  );
}

export default HistoricalCompare;

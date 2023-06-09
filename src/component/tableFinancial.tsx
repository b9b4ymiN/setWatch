import {
  FinancialsDetailModel,
  FinancialsTableModel,
} from "@/models/StockInfo/FinancialsTableModel";
import { number3F, numberCmp } from "@/utils/format";
import { calPercen } from "@/utils/mathFuntion";
import { Table } from "react-bootstrap";

function FinancialTable({ bodyData, header, equity }: FinancialsTableModel) {
  return (
    <Table striped bordered hover size="sm" className="tableFin mt-2">
      <thead>
        <tr>
          <td className="tdKeyLeft td-headerCenter pl-3">#</td>
          {header
            ? header.map((item, index) => {
                return (
                  <td key={"Header-" + index.toString()} className="td-headerCenter">
                    {item}
                  </td>
                );
              })
            : null}
        </tr>
      </thead>
      <tbody>
        <tr>
          {/*38,847,751,291 */}
          <td className="tdKeyLeft td-headerCenter">Revenue</td>
          {bodyData.map((item, index) => {
            return (
              <td key={"Revenue-" + index.toString()}>{numberCmp(item.revenue)}</td>
            );
          })}
        </tr>
        <tr>
          <td className="tdKeyLeft td-headerCenter">Earnings</td>
          {bodyData.map((item, index) => {
            return (
              <td
                key={"Earnings-" + index.toString()}
                className={item.earnings < 0 ? "tx-down" : ""}
              >
                {numberCmp(item.earnings)}
              </td>
            );
          })}
        </tr>
        {equity && equity != 0 ? (
          <tr>
            <td className="tdKeyLeft td-headerCenter">EPS</td>
            {bodyData.map((item, index) => {
              return (
                <td
                  key={"eps-" + index.toString()}
                  className={item.earnings < 0 ? "tx-down" : ""}
                >
                  {number3F(item.earnings / equity)}
                </td>
              );
            })}
          </tr>
        ) : (
          <></>
        )}
        {equity && equity != 0 ? (
          <tr>
            <td className="tdKeyLeft td-headerCenter">EPS (%Growth)</td>
            {bodyData.map((item, index) => {
              if (index == 0) {
                return <td key={"GrowthIndex"}></td>;
              } else {
                return (
                  <td
                    key={"Growth-" + index.toString()}
                    className={item.earnings < 0 ? "tx-down" : ""}
                  >
                    {calPercen(
                      bodyData[index - 1].earnings / equity,
                      item.earnings / equity
                    ) + "%"}
                  </td>
                );
              }
            })}
          </tr>
        ) : (
          <></>
        )}
      </tbody>
    </Table>
  );
}

export default FinancialTable;

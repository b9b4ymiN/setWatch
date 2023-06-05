import {
  FinancialsDetailModel,
  FinancialsTableModel,
} from "@/models/StockInfo/FinancialsTableModel";
import { numberMilCommas, numberMorBMCommas } from "@/utils/format";
import { Table } from "react-bootstrap";

function FinancialTable({ bodyData, header }: FinancialsTableModel) {
  return (
    <Table striped bordered hover size="sm" className="tableFin mt-2">
      <thead>
        <tr>
          <td className="tdKeyLeft td-headerCenter pl-3">#</td>
          {header
            ? header.map((item, index) => {
                return (
                  <td key={"H" + item + index} className="td-headerCenter">
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
              <td key={"BR" + index}>{numberMorBMCommas(item.revenue)}</td>
            );
          })}
        </tr>
        <tr>
          <td className="tdKeyLeft td-headerCenter">Earnings</td>
          {bodyData.map((item, index) => {
            return (
              <td
                key={"BE" + index}
                className={item.earnings < 0 ? "tx-down" : ""}
              >
                {numberMorBMCommas(item.earnings)}
              </td>
            );
          })}
        </tr>
      </tbody>
    </Table>
  );
}

export default FinancialTable;

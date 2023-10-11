import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import "../App.css";

const PartListComponent = observer((props) => {
  const { parts } = useContext(Context);

  //const [selectedRow, setSelectedRow] = React.useState(-1);

  return (
    <div
      className="ag-theme-alpine mt-5 mx-auto mb-3"
      style={{ height: 300, width: 600 }}
    >
      <h2 className="text-center">Parts</h2>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th>Part ID</th>
            <th>Part Name</th>
            <th>Part Type</th>
            <th>Stock Quantity</th>
            <th>Price</th>
            <th>Shelf</th>
          </tr>
        </thead>
        <tbody>
          {props.list.length
            ? props.list.map((part) => (
                <tr
                  style={{ cursor: "pointer" }}
                  //active={part.partID === parts.selectedPart.partID}
                  onClick={() => parts.setSelectedPart(part)}
                  //if concat(true) then use scc "selected"
                  className={"clickable-row ".concat(
                    parts.selectedPart.partID === part.partID ? "selected" : ""
                  )}
                  key={part.partID}
                >
                  <td>{part.partID}</td>
                  <td>{part.partName}</td>
                  <td>{part.partType}</td>
                  <td>{part.stockQuantity}</td>
                  <td>{part.partPrice}</td>
                  <td>{part.shelfNumber}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      {props.errorMsg ? <div>{props.errorMsg}</div> : null}
    </div>
  );
});

export default PartListComponent;

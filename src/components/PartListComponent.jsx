import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const PartListComponent = observer((props) => {
  const { parts } = useContext(Context);

  //const [selectedRow, setSelectedRow] = React.useState(-1);

  return (
    <div
      className="ag-theme-alpine mt-5 mb-3 mx-auto p-3 card-box"
      style={{ height: 300, width: 600 }}
    >
      <h2 className="text-center">Parts</h2>
      <table className="table">
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
                  onClick={() => parts.setSelectedPart(part)}
                  //code below while concat is true, then insert scc's "selected"
                  className={"clickable-row ".concat(
                    parts.selectedPart.partID === part.partID
                      ? "text-bg-secondary"
                      : ""
                  )}
                  key={part.partID}
                >
                  <td>{part.partID}</td>
                  <td>{part.partName}</td>
                  <td>{part.partType}</td>
                  <td>{part.stockQuantity}</td>
                  <td>{part.partPrice}</td>
                  <td>{part.shelf}</td>
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

import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const PartListComponent = observer((props) => {
  const { parts } = useContext(Context);

  return (
    <div
      className="ag-theme-alpine mt-5 mb-3 mx-auto p-3 card-box"
      style={{ height: 300, width: 600 }}
    >
      <h2 className="text-center">Parts</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="text-center">Part ID</th>
            <th className="text-start">Part Name</th>
            <th className="text-start">Part Type</th>
            <th className="text-center">Stock Quantity</th>
            <th className="text-start">Price</th>
            <th className="text-start">Shelf</th>
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
                  <td className="text-center">{part.partID}</td>
                  <td className="text-start">{part.partName}</td>
                  <td className="text-start">{part.partType}</td>
                  <td className="text-center">{part.stockQuantity}</td>
                  <td className="text-start">{part.partPrice}</td>
                  <td className="text-start">{part.shelf}</td>
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

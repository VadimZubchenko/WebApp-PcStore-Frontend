import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import Row from "react-bootstrap/Row";
import "../App.css";

const ListPartComponent = observer((props) => {
  const { parts } = useContext(Context);

  const [selectedRow, setSelectedRow] = React.useState(-1);

  return (
    <Row className="d-flex">
      <div className="contaner">
        <h2 className="text-center">Parts</h2>
        <table
          onClick={() => {
            console.log(props.list[0].partName);
          }}
        >
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
                    onClick={() => setSelectedRow(part.partID)}
                    className={"clickable-row ".concat(
                      selectedRow === part.partID ? "selected" : ""
                    )}
                    key={part.partID}
                  >
                    <td
                      onClick={() =>
                        console.log(`Cell ${part.partID} was clicked!`)
                      }
                    >
                      {part.partID}
                    </td>
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
      </div>
      {props.errorMsg ? <div>{props.errorMsg}</div> : null}
    </Row>
  );
});

export default ListPartComponent;

import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import Row from "react-bootstrap/Row";
import "../App.css";
import { useState, useEffect } from "react";
import { Container, Col } from "react-bootstrap";

let nextID = 0;
const OrderListComponent = observer(() => {
  const { parts } = useContext(Context);

  const [order, setOrder] = useState([]);

  const addPart = () => {
    let rowPart = {
      partID: nextID++,
      partName: parts.selectedPart.partName,
      partType: parts.selectedPart.partType,
      partPrice: parts.selectedPart.partPrice,
    };
    setOrder([...order, rowPart]);
  };

  return (
    <div>
      <Col md={3} className={"mt-3"}>
        <button type="button" class="btn btn-primary d-flex" onClick={addPart}>
          Add part
        </button>
      </Col>

      <div>
        <h2 className="text-center">Order</h2>
        <table
          className="table table-striped"
          onClick={() => console.log(order.length)}
        >
          <thead>
            <tr>
              <th>Part Name</th>
              <th>Part Type</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.length
              ? order.map((part) => (
                  <tr key={part.partID}>
                    <td>{part.partName}</td>
                    <td>{part.partType}</td>
                    <td>{part.partPrice}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default OrderListComponent;

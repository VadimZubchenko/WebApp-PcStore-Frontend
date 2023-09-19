import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

import "../App.css";
import { useState } from "react";
import { Container } from "react-bootstrap";

let nextID = 0;
const OrderListComponent = observer(() => {
  const { parts } = useContext(Context);

  const [order, setOrder] = useState([]);
  const [stockQuantity, setQuantity] = useState({ value: 1 });
  const [summa, setSumma] = useState({ value: 0 });

  const increment = () => {
    setQuantity({ value: ++stockQuantity.value });
  };
  const decrement = () => {
    setQuantity({
      value: stockQuantity.value > 1 ? --stockQuantity.value : 1,
    });
  };

  const addPart = () => {
    let rowPart = {
      partID: nextID++,
      partName: parts.selectedPart.partName,
      partType: parts.selectedPart.partType,
      partQuantity: stockQuantity.value,
      partPrice: parts.selectedPart.partPrice,
    };
    setOrder([...order, rowPart]);

    setSumma({
      value: summa.value + parts.selectedPart.partPrice * stockQuantity.value,
    });
  };

  return (
    <Container>
      <div>
        <div>
          <button
            type="button"
            className="btn btn-outline-primary quantity-input__screen"
            onClick={addPart}
          >
            Add part
          </button>
        </div>
        <h2>Set the quantity</h2>
        <button
          className="quantity-input__modifier quantity-input__modifier--left"
          onClick={decrement}
        >
          &mdash;
        </button>
        <input
          className="quantity-input__screen"
          type="text"
          value={stockQuantity.value}
          readOnly
        />
        <button
          className="quantity-input__modifier quantity-input__modifier--right"
          onClick={increment}
        >
          &#xff0b;
        </button>
        <h2>Total Price:</h2>
        <input
          className="quantity-input__screen"
          type="text"
          value={summa.value}
          readOnly
        />

        <Container></Container>
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
          <h2 className="text-center">Order</h2>
          <table
            className="table table-striped"
            onClick={() => console.log(order.length)}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Part Name</th>
                <th>Part Type</th>
                <th>Par Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order.length
                ? order.map((part) => (
                    <tr key={part.partID}>
                      <td>{part.partID}</td>
                      <td>{part.partName}</td>
                      <td>{part.partType}</td>
                      <td>{part.partQuantity}</td>
                      <td>{part.partPrice}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
});

export default OrderListComponent;

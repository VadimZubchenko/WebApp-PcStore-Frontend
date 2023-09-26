import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import "../App.css";
import { useState } from "react";

let nextID = 1;

const OrderListComponent = observer(() => {
  const { parts } = useContext(Context);

  const [orderedParts, setOrderedParts] = useState([]);
  const [orderedQuantity, setQuantity] = useState({ value: 1 });
  const [summa, setSumma] = useState({ value: 0 });
  const [order, setOrder] = useState({
    staff: "",
    totalPrice: "",
    customer: [],
    orderedParts: [],
  });

  const increment = () => {
    setQuantity({ value: ++orderedQuantity.value });
  };
  const decrement = () => {
    setQuantity({
      value: orderedQuantity.value > 1 ? --orderedQuantity.value : 1,
    });
  };

  const addPart = () => {
    let rowPart = {
      partID: nextID++,
      partName: parts.selectedPart.partName,
      partType: parts.selectedPart.partType,
      partQuantity: orderedQuantity.value,
      partPrice: parts.selectedPart.partPrice,
    };
    setOrderedParts([...orderedParts, rowPart]);
    setSumma({
      value: summa.value + parts.selectedPart.partPrice * orderedQuantity.value,
    });
  };
  const createOrder = () => {
    let customer = {
      custName: parts.newCustomer.customerName,
      custAddress: parts.newCustomer.address,
      custEmail: parts.newCustomer.email,
    };
    setOrder({
      staff: "Admin_Seller",
      totalPrice: summa.value,
      customer: [customer],
      orderedParts: [orderedParts],
    });
    console.log(order);
  };

  return (
    <div>
      <div className="selector">
        <button
          type="button"
          className="quantity-input__modifier btn btn-outline-primary quantity-input__screen"
          onClick={addPart}
        >
          Add part
        </button>

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
          value={orderedQuantity.value}
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
      </div>

      <div
        className="orderTable ag-theme-alpine"
        style={{ height: 400, width: 600 }}
      >
        <h2 className="text-center">Order</h2>
        <table
          className="table table-striped table-borderless"
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
            {orderedParts.length
              ? orderedParts.map((part) => (
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
        <button
          type="button"
          className="quantity-input__modifier btn btn-outline-primary quantity-input__screen"
          onClick={createOrder}
        >
          Do Order
        </button>
      </div>
    </div>
  );
});

export default OrderListComponent;

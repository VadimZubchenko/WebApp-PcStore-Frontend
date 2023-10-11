import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import "../App.css";
import { useState } from "react";

let nextID = 0;

const OrderListComponent = observer((props) => {
  const { parts } = useContext(Context);
  // set selected parts
  const [orderedParts, setOrderedParts] = useState([]);
  // set partDetails to the POST id/quantity of selected part
  const [partDetails, setPartDetail] = useState([]);
  const [orderedQuantity, setQuantity] = useState({
    value: 1,
  });
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
      ID: nextID++,
      partID: parts.selectedPart.partID,
      partName: parts.selectedPart.partName,
      partType: parts.selectedPart.partType,
      partQuantity: orderedQuantity.value,
      partPrice: parts.selectedPart.partPrice,
    };
    setOrderedParts([...orderedParts, rowPart]);
    setPartDetail([
      ...partDetails,
      {
        partID: rowPart.partID,
        partQuantity: rowPart.partQuantity,
        partPrice: rowPart.partPrice,
      },
    ]);
    setSumma({
      value: summa.value + parts.selectedPart.partPrice * orderedQuantity.value,
    });
  };
  const createOrder = () => {
    let customer = {
      customerName: parts.newCustomer.customerName,
      address: parts.newCustomer.address,
      email: parts.newCustomer.email,
    };
    setOrder({
      staff: "Admin_Seller",
      totalPrice: summa.value,
      customer: [customer],
      orderedParts: [partDetails],
    });
    props.addOrder(order);
    console.log(order);
  };

  const cancel = () => {
    setSumma({ value: 0 });
    setOrderedParts([]);
    setQuantity({ value: 1 });
  };

  useEffect(() => {
    if (!order.totalPrice) {
      return;
    }
    createOrder();
  }, [order.totalPrice]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-4 mx-auto">
          <h2>Total Price:</h2>
          <input
            className="quantity-input__screen"
            type="text"
            value={summa.value}
            readOnly
          />
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
          <br />
          <br />

          <button
            type="button"
            className="quantity-input__modifier btn btn-outline-primary quantity-input__screen"
            onClick={addPart}
          >
            Add part
          </button>
        </div>
        <div className="col-lg-5 mx-auto mx-auto">
          <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
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
                      <tr key={part.ID}>
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
              className="btn btn-success"
              onClick={createOrder}
              style={{ marginLeft: "20px" }}
            >
              Do Order
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={cancel}
              style={{ marginLeft: "20px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default OrderListComponent;

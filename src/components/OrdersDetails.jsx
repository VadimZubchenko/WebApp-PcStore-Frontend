import { useState } from "react";

const OrdersDetails = (props) => {
  const [state, setState] = useState([]);

  let orders = props.orders.length
    ? props.orders.map((order) => {
        return (
          <tr
            className="clickable-row"
            //getting parts of order with certain orderID
            onClick={() => setState(order.orderDetails)}
            key={order.orderID}
          >
            <td>{order.orderID}</td>
            <td>{order.customerName}</td>
            <td>{order.totalPrice}</td>
            <td>{order.orderDate}</td>
            <td>{order.staffName}</td>
          </tr>
        );
      })
    : null;

  let orderDtl = state.length
    ? state.map((part) => {
        return (
          <tr key={part.orderDetailID}>
            <td>{part.orderDetailID}</td>
            <td>{part.partName}</td>
            <td>{part.orderDetailQuantity}</td>
            <td>{part.orderDetailsPrice}</td>
          </tr>
        );
      })
    : null;
  return (
    <div className="row">
      <div className="col-6 mx-auto">
        <h2 className="text-center mt-4">Orders</h2>
        <div
          className="ag-theme-alpine mx-auto mb-3 card-box scrollable-table"
          style={{ height: 600, width: 800 }}
        >
          <table className="table table-striped">
            <thead className="th">
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Total price</th>
                <th>Date</th>
                <th>Staff</th>
              </tr>
            </thead>
            <tbody>{orders}</tbody>
          </table>
          {props.errorMsg ? <div>{props.errorMsg}</div> : null}
        </div>
      </div>
      <div className="col-6 mx-auto">
        <h2 className="text-center mt-4">Order Details</h2>
        <div
          className="ag-theme-alpine mx-auto mb-3 card-box scrollable-table"
          style={{ height: 600, width: 800 }}
        >
          <table className="table table-striped">
            <thead className="th">
              <tr>
                <th>ID</th>
                <th>Part Name</th>
                <th>Quantity</th>
                <th>Part Price</th>
              </tr>
            </thead>
            <tbody>{orderDtl}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default OrdersDetails;

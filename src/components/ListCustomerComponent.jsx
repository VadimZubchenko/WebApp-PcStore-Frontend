const ListCustomerComponent = (props) => {
  return (
    <div>
      <h2 className="text-center">Customers List</h2>
      <div className="row">
        <table className="table table-stript table-bordered ">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Customer Address</th>
              <th>Customer Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.list.length
              ? props.list.map((customer) => (
                  <tr key={customer.customerID}>
                    <td>{customer.customerID}</td>
                    <td>{customer.customerName}</td>
                    <td>{customer.address}</td>
                    <td>{customer.email}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
      {props.errorMsg ? <div>{props.errorMsg}</div> : null}
    </div>
  );
};

export default ListCustomerComponent;

/////////////// - OLD VERSION CLASS COMPONENT - /////////////
//////////////  includes AXIOS promised-based HTTP client for JavaScript.

/* import React, { Component } from "react";
import axios from "axios";

const CUSTOMER_API_BASE_URL = "http://localhost:8080/customers";

class ListCustomerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      errorMsg: "",
    };
  }
  componentDidMount() {
    axios
      .get(CUSTOMER_API_BASE_URL)
      .then((response) => {
        console.log(response);
        this.setState({ customers: response.data });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errorMsg: "Error retreiving data" });
      });
  }
  render() {
    const { customers, errorMsg } = this.state;
    return (
      <div>
        <h2 className="text-center">Customers List</h2>
        <div className="row">
          <table className="table table-stript table-bordered ">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Customer Address</th>
                <th>Customer Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.length
                ? customers.map((customer) => (
                    <tr key={customer.customerID}>
                      <td>{customer.customerName}</td>
                      <td>{customer.address}</td>
                      <td>{customer.email}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
        {errorMsg ? <div>{errorMsg}</div> : null}
      </div>
    );
  }
}

export default ListCustomerComponent;
 */

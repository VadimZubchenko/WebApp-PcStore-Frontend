import React, { useState, useEffect } from "react";

const ListCustomerComponent = (props) => {
  //initaite in 'App.js' class's getCustomer() method via props.
  useEffect(() => {
    props.getCustomerList(props.token);
  }, []);

  return (
    <div className="row mx-auto">
      <h2 className="text-center mt-4">Customers List</h2>
      <div className="ag-theme-alpine mt-3 mx-auto p-3 mb-3 card-box">
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="text-center">Customer ID</th>
              <th className="text-start">Customer Name</th>
              <th className="text-start">Customer Address</th>
              <th className="text-start">Customer Email</th>
              <th className="text-start">Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.customers.length
              ? props.customers.map((customer) => (
                  <tr key={customer.customerID}>
                    <td className="text-center">{customer.customerID}</td>
                    <td className="text-start">{customer.customerName}</td>
                    <td className="text-start">{customer.address}</td>
                    <td className="text-start">{customer.email}</td>
                    <td className="text-start"></td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        {props.errorMsg ? <div>{props.errorMsg}</div> : null}
      </div>
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

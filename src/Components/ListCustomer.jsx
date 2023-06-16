import React, { Component } from "react";
import CustomerService from "../services/CustomerService";

class ListCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
    };
  }
  componentDidMount() {
    CustomerService.getCustomers().then((res) => {
      this.setState({ customers: res.data });
    });
  }
  render() {
    return (
      <div>
        <h2 className="text-center">Orders List</h2>
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
              {this.state.customers.map((customer) => (
                <tr key={customer.customerID}>
                  <td>{customer.customerName}</td>
                  <td>{customer.address}</td>
                  <td>{customer.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListCustomer;

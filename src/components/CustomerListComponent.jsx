import React, { useState, useEffect } from "react";
import Row from "./Row";
import EditRow from "./EditRow";
import RemoveRow from "./RemoveRow";

const ListCustomerComponent = (props) => {
  const [state, setState] = useState({
    removeIndex: -1,
    editIndex: -1,
  });
  //initaite in 'App.js' class's getCustomer() method via props.
  useEffect(() => {
    props.getCustomerList(props.token);
  }, [state.removeIndex, state.editIndex]);

  const changeToRemoveMode = (index) => {
    setState({
      removeIndex: index,
      editIndex: -1,
    });
  };
  const changeToEditMode = (index) => {
    setState({
      removeIndex: -1,
      editIndex: index,
    });
  };

  const cancel = () => {
    setState({
      removeIndex: -1,
      editIndex: -1,
    });
  };
  const editCustomer = (customer) => {
    props.editCustomer(customer);
    cancel();
  };
  const removeCustomer = (customerID) => {
    props.removeCustomer(customerID);
    cancel();
  };

  let customers = props.customers.length
    ? props.customers.map((customer, index) => {
        if (state.editIndex === index) {
          return (
            <EditRow
              key={customer.customerID}
              customer={customer}
              editCustomer={editCustomer}
              cancel={cancel}
            />
          );
        }
        if (state.removeIndex === index) {
          return (
            <RemoveRow
              key={customer.customerID}
              customer={customer}
              removeCustomer={removeCustomer}
              cancel={cancel}
            />
          );
        }
        return (
          <Row
            key={customer.customerID}
            customer={customer}
            role={props.role}
            index={index}
            changeToRemoveMode={changeToRemoveMode}
            changeToEditMode={changeToEditMode}
          />
        );
      })
    : null;

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
              <th className="text-center">Remove</th>
              <th className="text-center">Edit</th>
            </tr>
          </thead>
          <tbody>{customers}</tbody>
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

import React, { useState } from "react";
// import axios from "axios";

//const CUSTOMER_API_BASE_URL = "http://localhost:8080/customers";

const AddCustomerForm = (props) => {
  const [state, setState] = useState({
    customerName: "",
    address: "",
    email: "",
  });

  /* create a class property with arrow function, that doesn't have own 'this.'
     and uses object of includes this arrow function class.
    It makes possible to avoid binding the arrow function in constructor */
  const changeHandler = (event) => {
    /* 1. no need separates handlers for differents input elements,
          because [event.target.name] takes the names of state from 'name' attribute in XML 
      2. extract the input element from event parameter */
    setState((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value,
      };
    });
  };

  const saveCustomer = (event) => {
    // to avoid page refreshing
    event.preventDefault();
    console.log(state);
    props.addCustomer(state);
    setState({
      customerName: "",
      address: "",
      email: "",
    });
    /* axios
      .post(CUSTOMER_API_BASE_URL, this.state)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      }); */
  };

  const cancel = (event) => {
    event.preventDefault();
    setState({
      customerName: "",
      address: "",
      email: "",
    });
  };

  const { customerName, address, email } = state;
  return (
    <div
      className="customerForm ag-theme-alpine position-relative"
      style={{ height: 300, width: 600 }}
    >
      <div className="card-body">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Full name"
            name="customerName"
            value={customerName}
            /* onChange make possible user to write text on input element */
            onChange={changeHandler}
          />

          <input
            type="text"
            className="form-control"
            placeholder="address"
            name="address"
            value={address}
            onChange={changeHandler}
          />

          <input
            type="email"
            className="form-control"
            placeholder="email "
            name="email"
            value={email}
            onChange={changeHandler}
          />
        </div>
        <button className="btn btn-success" onClick={saveCustomer}>
          Create order
        </button>
        <button
          className="btn btn-danger"
          onClick={cancel}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddCustomerForm;

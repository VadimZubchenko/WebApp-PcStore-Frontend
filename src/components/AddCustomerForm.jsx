import React, { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
// import axios from "axios";

//const CUSTOMER_API_BASE_URL = "http://localhost:8080/customers";

const AddCustomerForm = observer((props) => {
  const { parts } = useContext(Context);

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

  const cancel = (event) => {
    event.preventDefault();
    setState({
      customerName: "",
      address: "",
      email: "",
    });
  };
  useEffect(() => {
    parts.setNewCustomer(state);
  }, [state]);

  const { customerName, address, email } = state;
  return (
    <div
      className="ag-theme-alpine mx-auto mt-3"
      style={{ height: 200, width: 600 }}
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
});

export default AddCustomerForm;

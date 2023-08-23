import React, { Component } from "react";
// import axios from "axios";

//const CUSTOMER_API_BASE_URL = "http://localhost:8080/customers";

class AddCustomerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerName: "",
      address: "",
      email: "",
    };
  }

  /* create a class property with arrow function, that doesn't have own 'this.'
     and uses object of includes this arrow function class.
    It makes possible to avoid binding the arrow function in constructor */
  changeHandler = (event) => {
    /* 1. no need separates handlers for differents input elements,
          because [event.target.name] takes the names of state from 'name' attribute in XML 
      2. extract the input element from event parameter */
    this.setState({ [event.target.name]: event.target.value });
  };

  saveCustomer = (event) => {
    // to avoid page refreshing
    event.preventDefault();
    console.log(this.state);
    this.props.addCustomer(this.state);
    this.setState({
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

  cancel = (event) => {
    event.preventDefault();
    this.setState({
      customerName: "",
      address: "",
      email: "",
    });
  };

  render() {
    const { customerName, address, email } = this.state;
    return (
      <div className="contaner">
        <div className="raw">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center">Add Customer</h3>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="customerName">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="customerName"
                  placeholder="Full name"
                  name="customerName"
                  value={customerName}
                  /* onChange make possible user to write text on input element */
                  onChange={this.changeHandler}
                />
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="address"
                  name="address"
                  value={address}
                  onChange={this.changeHandler}
                />
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="email "
                  name="email"
                  value={email}
                  onChange={this.changeHandler}
                />
              </div>
              <button className="btn btn-success" onClick={this.saveCustomer}>
                Save
              </button>
              <button
                className="btn btn-danger"
                onClick={this.cancel}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCustomerForm;

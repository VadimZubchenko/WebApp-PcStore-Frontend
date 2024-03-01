//import ListCustomerComponent from "../components/CustomerListComponent";
import React from "react";
import OrderListComponent from "../components/OrderListCompont";
import PartListComponent from "../components/PartListComponent";
import AddCustomerForm from "../components/AddCustomerForm";

const ShopPage = (props) => {
  return (
    <div className="row">
      <div className="col-md-5 mx-auto">
        <div className="row">
          <div className="col mx-auto">
            <PartListComponent list={props.list} setError={props.setError} />
          </div>
        </div>
        <div className="row">
          <div className="col mx-auto">
            <AddCustomerForm />
          </div>
        </div>
      </div>
      <div className="col-md-7 mx-auto">
        <OrderListComponent
          addOrder={props.addOrder}
          setError={props.setError}
          staff={props.staff}
        />
      </div>
    </div>
  );
};

export default ShopPage;

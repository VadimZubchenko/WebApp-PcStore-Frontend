//import ListCustomerComponent from "../components/CustomerListComponent";
import React from "react";
import OrderListComponent from "../components/OrderListCompont";
import PartListComponent from "../components/PartListComponent";
import AddCustomerForm from "../components/AddCustomerForm";

const ShopPage = (props) => {
  return (
    <div className="row grey-background">
      <div className="col-lg-4">
        <div className="row">
          <PartListComponent list={props.list} errorMsg={props.error} />
        </div>
        <div>
          <AddCustomerForm />
        </div>
      </div>
      <div className="col-lg-8">
        <OrderListComponent addOrder={props.addOrder} />
      </div>
    </div>
  );
};

export default ShopPage;

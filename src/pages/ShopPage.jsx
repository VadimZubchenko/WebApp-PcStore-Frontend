import ListCustomerComponent from "../components/CustomerListComponent";
import ListPartComponent from "../components/PartListComponent";

const ShopPage = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 offset-md-1 offset-md-1">
          <ListPartComponent list={props.list} errorMsg={props.error} />
        </div>
        <div className="col-md-4 offset-md-1 offset-md-2">
          <h3 className="text-center">TABLE II</h3>
          {/* <ListCustomerComponent list={props.list} errorMsg={props.error} /> */}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;

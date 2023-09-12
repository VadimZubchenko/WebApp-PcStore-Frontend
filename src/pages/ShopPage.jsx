import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListCustomerComponent from "../components/CustomerListComponent";
import ListPartComponent from "../components/PartListComponent";

const ShopPage = (props) => {
  return (
    <div class="container-fluid">
      <div className="row">
        <div className="col">
          <ListPartComponent list={props.list} errorMsg={props.error} />
        </div>
        <div className="col">Second Column</div>
        <div className="col">
          <ListCustomerComponent list={props.list} errorMsg={props.error} />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;

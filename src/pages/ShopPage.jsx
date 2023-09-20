//import ListCustomerComponent from "../components/CustomerListComponent";
import React from "react";
import OrderListComponent from "../components/OrderListCompont";
import PartListComponent from "../components/PartListComponent";
import { Container, Row, Col } from "react-bootstrap";

const ShopPage = (props) => {
  return (
    <Container className="container-fluid">
      <Col className="partsZone">
        <PartListComponent list={props.list} errorMsg={props.error} />
      </Col>
      <Col className="orderZone">
        <OrderListComponent />
      </Col>
    </Container>
  );
};

export default ShopPage;

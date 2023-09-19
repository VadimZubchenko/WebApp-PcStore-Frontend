//import ListCustomerComponent from "../components/CustomerListComponent";
import React from "react";
import OrderListComponent from "../components/OrderListCompont";
import PartListComponent from "../components/PartListComponent";
import { Container, Row, Col } from "react-bootstrap";

const ShopPage = (props) => {
  return (
    <Container>
      <Row>
        <Col>
          <PartListComponent list={props.list} errorMsg={props.error} />
        </Col>
        <Col>
          <OrderListComponent />
        </Col>
      </Row>
    </Container>
  );
};

export default ShopPage;

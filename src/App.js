import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListCustomerComponent from "./components/ListCustomerComponent";
import AddCustomerForm from "./components/AddCustomerForm";
import NoMatch from "./components/NoMatch";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <nav style={{ margin: 10 }}>
          <Link to="/" style={{ padding: 5 }}>
            Home
          </Link>
          <Link to="customers" style={{ padding: 5 }}>
            Customers List
          </Link>
          <Link to="/add-customer" style={{ padding: 5 }}>
            Add Customer
          </Link>
        </nav>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<ListCustomerComponent />} />
            <Route path="/customers" element={<ListCustomerComponent />} />
            <Route path="/add-customer" element={<AddCustomerForm />} />
            <Route path="/*" element={<NoMatch />} />
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;

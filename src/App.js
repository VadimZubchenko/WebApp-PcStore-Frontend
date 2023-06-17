import "./App.css";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListCustomerComponent from "./components/ListCustomerComponent";

function App() {
  return (
    <div>
      <HeaderComponent />
      <div className="container">
        <ListCustomerComponent />
      </div>
      <FooterComponent />
    </div>
  );
}

export default App;

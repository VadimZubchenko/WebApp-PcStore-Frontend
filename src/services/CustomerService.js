import axios from "axios";

const CUSTOMER_API_BASE_URL = "http://localhost:8080/customers/all";

class CustomerService {
  getCustomers() {
    return axios.get(CUSTOMER_API_BASE_URL);
  }
}

export default new CustomerService();

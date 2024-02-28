import { Link } from "react-router-dom";

// Navbar gets App component's functions via props
const Navbar = (props) => {
  console.log("staff:", props.staff);
  let links = (
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav"></ul>
    </div>
  );
  if (props.isLogged) {
    links = (
      <div className="row">
        <div className="col mt-4">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item" style={{ marginRight: 30 }}>
                <Link className="nav-link" to="/parts">
                  Make Order
                </Link>
              </li>
              <li className="nav-item" style={{ marginRight: 30 }}>
                <Link className="nav-link" to="/add-customer">
                  Add Customer
                </Link>
              </li>
              <li className="nav-item" style={{ marginRight: 350 }}>
                <Link className="nav-link" to="/customers">
                  Customers
                </Link>
              </li>
              <li className="nav-item" style={{ marginRight: 50 }}>
                <Link className="nav-link" to="/logout" onClick={props.logout}>
                  Logout
                </Link>
              </li>
              <li>
                <p className="navbar-text m-1 p-0">
                  Signed in as:{" "}
                  <a className="navbar-brand mx-3">{props.staff}</a>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="navbar-brand mt-3">PC Store</p>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
        {links}
      </div>
    </nav>
  );
};
export default Navbar;

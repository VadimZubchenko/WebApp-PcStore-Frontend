import { Link } from "react-router-dom";
// Navbar gets App component's functioins via props
const Navbar = (props) => {
  let links = (
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav"></ul>
    </div>
  );
  if (props.isLogged) {
    links = (
      <div className="row">
        <div className="col mt-4">
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item" style={{ marginRight: 30 }}>
                <Link className="nav-link active" to="/parts">
                  Make Order
                </Link>
              </li>
              <li className="nav-item" style={{ marginRight: 800 }}>
                <Link className="nav-link active" to="/add-customer">
                  Add Customer
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout" onClick={props.logout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="navbar-brand mt-3">PC Store</p>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
        {links}
      </div>
    </nav>
  );
};
export default Navbar;

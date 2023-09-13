import { Link } from "react-router-dom";
// Navbar gets App component's functioins via props
const Navbar = (props) => {
  let links = <ul className="navbar-nav"></ul>; // ul- unordered list
  if (props.isLogged) {
    links = (
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link to="/parts">Make Order</Link>
        </li>
        <li className="nav-item" style={{ marginLeft: 5 }}>
          <Link to="/add-customer">Add Customer</Link>
        </li>
        <li className="nav-item" style={{ marginLeft: 5 }}>
          <Link to="/logout" onClick={props.logout}>
            Logout
          </Link>
        </li>
      </ul>
    );
  }
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{ paddingLeft: 20 }}
    >
      <p className="navbar-brand">PC Store</p>
      {links}
    </nav>
  );
};
export default Navbar;

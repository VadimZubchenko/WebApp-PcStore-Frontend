import { useState } from "react";
// Controlled components (form handling)
const LoginPage = (props) => {
  // state of LoginPage
  const [state, setState] = useState({
    staffName: "",
    password: "",
  });
  //define method 'onChange' as a property, that is equal as an arrow function,
  //where 'event' is passed as a parameter
  const onChange = (event) => {
    setState((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (state.staffName.length < 4 || state.password.length < 8) {
      // the message will appear in messageArea of App's component by changig state's parameter 3setError=(error)
      props.setError(
        "staffName needs to be at least four and password eight characters long"
      );
      return;
    }
    // create object 'user' from values of state
    let user = {
      staffName: state.staffName,
      password: state.password,
    };
    if (event.target.name === "register") {
      props.register(user);
    } else {
      props.login(user);
    }
  };
  //this is just for changing in return() the state.staffName and state.password to staffName and password.
  const { staffName, password } = state;
  return (
    <div style={{ width: 500, backgroundColor: "lightgreen", margin: "auto" }}>
      <form className="mb-3">
        <label htmlFor="staffName" className="form-label">
          staffName
        </label>
        <input
          type="text"
          name="staffName"
          id="staffName"
          className="form-control"
          onChange={onChange}
          value={staffName}
        />
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="form-control"
          onChange={onChange}
          value={password}
        />
        <button className="btn btn-primary" name="register" onClick={onSubmit}>
          Register
        </button>
        <button
          className="btn btn-primary"
          name="login"
          onClick={onSubmit}
          style={{ marginLeft: 10 }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

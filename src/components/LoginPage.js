import { React } from "react";
import { Container, Form, FormControl } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";

// Controlled components (form handling)
const LoginPage = (props) => {
  // state of LoginPage
  const [state, setState] = useState({
    isReg: false,
    staffName: "",
    login: "",
    password: "",
    confirmPassword: "",
  });

  //useEffect being intitiated if 'isReg' state changes
  useEffect(() => {}, [state.isReg]);

  //function which changes a type of form for login/reg
  const changeToReg = (event) => {
    if (event.target.name === "toRegForm") {
      props.setError("Registration form");
      setState((state) => {
        return {
          ...state,
          isReg: true,
        };
      });
    }
    if (event.target.name === "toLogForm") {
      props.setError("Authorization form");
      setState((state) => {
        return {
          ...state,
          isReg: false,
        };
      });
    }
  };

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
    if (state.login.length < 4 || state.password.length < 8) {
      // the message will appear in messageArea of App's component by changig state's parameter 3setError=(error)
      props.setError(
        "Login needs to be at least four and password eight characters long"
      );
      return;
    }

    // create object 'user' from values of state
    let user = {
      login: state.login,
      password: state.password,
    };
    let newUser = {
      staffName: state.staffName,
      login: state.login,
      password: state.password,
      confirmPassword: state.confirmPassword,
    };
    if (event.target.name === "register") {
      props.register(newUser);
      console.log("befor: " + state.staffName);

      console.log("after: " + state.staffName);
    } else {
      props.login(user);
    }
  };

  //this is just for changing in return() the state.login and state.password to login and password.
  const { staffName, login, password, confirmPassword } = state;

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 70 }}
    >
      <Card style={{ width: 500 }} className="p-5">
        <h2>{state.isReg ? "Registration" : "Authorization"}</h2>
        <div
          style={{ width: 400, backgroundColor: "lightgreen", margin: "auto" }}
        >
          <Form className="d-flex flex-column">
            {state.isReg && (
              <label htmlFor="staffName" className="form-label">
                Name
              </label>
            )}
            {state.isReg && (
              <FormControl
                type="text"
                name="staffName"
                id="staffName"
                className="mt-3"
                placeholder="Enter your name..."
                onChange={onChange}
                value={staffName}
              />
            )}

            <label htmlFor="login" className="form-label">
              Login
            </label>
            <FormControl
              type="text"
              name="login"
              id="login"
              className="mt-3"
              placeholder="Enter your login..."
              onChange={onChange}
              value={login}
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <FormControl
              type="password"
              name="password"
              id="password"
              className="mt-3"
              placeholder="Enter your password"
              onChange={onChange}
              value={password}
            />
            {state.isReg && (
              <label htmlFor="confirmPassword" className="form-label">
                Confirm password
              </label>
            )}
            {state.isReg && (
              <FormControl
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="mt-3"
                placeholder="Repeat your password"
                onChange={onChange}
                value={confirmPassword}
              />
            )}
            <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
              <Button
                variant={"outline-success"}
                className="btn btn-primary"
                name={state.isReg ? "toLogForm" : "toRegForm"}
                onClick={changeToReg}
                style={{ marginLeft: 10 }}
              >
                {state.isReg ? "to SingIn" : "to Register"}
              </Button>
              <Button
                variant={"outline-success"}
                className="btn btn-primary"
                name={state.isReg ? "register" : "login"}
                onClick={onSubmit}
                style={{ marginRight: 10 }}
              >
                {state.isReg ? "Register" : "Sign in"}
              </Button>
            </Row>
          </Form>
        </div>
      </Card>
    </Container>
  );
};

export default LoginPage;

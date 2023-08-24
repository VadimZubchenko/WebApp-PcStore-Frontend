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
    login: "",
    password: "",
  });

  //useEffect being intitiated if 'isReg' state changes
  useEffect(() => {}, [state.isReg]);

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
        "login needs to be at least four and password eight characters long"
      );
      return;
    }
    // create object 'user' from values of state
    let user = {
      login: state.login,
      password: state.password,
    };
    if (event.target.name === "register") {
      props.register(user);
    } else {
      props.login(user);
    }
  };

  console.log("Registration state:" + state.isReg);
  //this is just for changing in return() the state.login and state.password to login and password.
  const { login, password } = state;

  let tempForm = (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 60 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2>Authorization</h2>
        <div
          style={{ width: 400, backgroundColor: "lightgreen", margin: "auto" }}
        >
          <Form className="d-flex flex-column">
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
            <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
              <Button
                variant={"outline-success"}
                className="btn btn-primary"
                name="toRegForm"
                onClick={changeToReg}
                style={{ marginLeft: 10 }}
              >
                Register
              </Button>
              <Button
                variant={"outline-success"}
                className="btn btn-primary"
                name="login"
                onClick={onSubmit}
                style={{ marginRight: 10 }}
              >
                SingIn
              </Button>
            </Row>
          </Form>
        </div>
      </Card>
    </Container>
  );

  if (state.isReg) {
    tempForm = (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: window.innerHeight - 60 }}
      >
        <Card style={{ width: 600 }} className="p-5">
          <h2>Registration</h2>
          <div
            style={{
              width: 500,
              backgroundColor: "lightgreen",
              margin: "auto",
            }}
          >
            <Form className="d-flex flex-column">
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
              <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                <Button
                  variant={"outline-success"}
                  className="btn btn-primary"
                  name="toLogForm"
                  onClick={changeToReg}
                  style={{ marginLeft: 10 }}
                >
                  SingIn
                </Button>
                <Button
                  variant={"outline-success"}
                  className="btn btn-primary"
                  name="register"
                  onClick={onSubmit}
                  style={{ marginRight: 10 }}
                >
                  Register
                </Button>
              </Row>
            </Form>
          </div>
        </Card>
      </Container>
    );
  }

  return <div>{tempForm}</div>;
};

export default LoginPage;

/* import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListCustomerComponent from "./components/ListCustomerComponent";
import AddCustomerForm from "./components/AddCustomerForm";
import NoMatch from "./components/NoMatch";
 */
import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import ListCustomerComponent from "./components/ListCustomerComponent";
import AddCustomerForm from "./components/AddCustomerForm";

function App() {
  // Create first state with staff list, token and error for showing a message of processing
  const [state, setState] = useState({
    list: [],
    isLogged: false,
    token: "",
    loading: false,
    error: "",
  });

  // Create second state for changing URL and requests with differents cases as action (register, login, logout ...)
  const [urlRequest, setUrlRequest] = useState({
    url: "",
    request: {}, // {} includes object with http-request parameters method, mode, header, body
    action: "",
  });

  //APP STATE FUNCTIONS

  //update state with 'loading' status: false or true
  const setLoading = (loading) => {
    setState((state) => {
      return {
        ...state,
        loading: loading,
        error: "",
      };
    });
  };

  const setError = (error) => {
    setState((state) => {
      let tempState = {
        ...state,
        error: error,
      };
      /* saveToStorage(tempState); */
      return tempState;
    });
  };

  const clearState = () => {
    let state = {
      list: [],
      isLogged: false,
      token: "",
      loading: false,
      error: "",
    };
    //saveToStorage(state);
    setState(state);
  };

  // create useEffect(), which will render App comp. while urlRequest.url, *.request, *.action are changed
  // useEffect() call async fetch() to REST API on BackEnd-side
  useEffect(() => {
    const fetchData = async () => {
      if (!urlRequest.url) {
        return;
      }
      setLoading(true);
      let response = await fetch(urlRequest.url, urlRequest.request);
      setLoading(false);
      if (response.ok) {
        switch (urlRequest.action) {
          case "register":
            setError("Register success"); // methood upddates STATE with error: "Register succes" and first time saveToStorage see above
            return;
          case "login":
            //let token = await response.json();
            setState((state) => {
              // isLogged == true ,state.isLogged changes to true, see above
              // which opens other tempRender page, see below
              let tempState = {
                ...state,
                isLogged: true,
                //token: token.token, // token.token, because in session is token:token
              };
              // saving the page state into sessionStorage
              //saveToStorage(tempState);
              return tempState;
            });
            //getShoppingList(token.token);
            return;
          case "logout":
            clearState();
            return;
          default:
            return;
        }
      } else {
        if (response.status === 403) {
          clearState();
          setError("Your session has expired. Logging you out!");
          return;
        }
        //handle all different failed requests for the backend
        switch (urlRequest.action) {
          case "register":
            if (response.status === 409) {
              setError("Username already in use. Try another.");
            } else {
              setError(
                "Failed to register new user. Server responded with a status:" +
                  response.status
              );
            }
            return;
          default:
            return;
        }
      }
    };
    fetchData();
  }, [urlRequest.url, urlRequest.request, urlRequest.action]);

  //LOGIN API  (REGISTER, LOGIN, LOGOUT)

  // new user registration where user={username, password}
  const register = (user) => {
    // change second state of 'urlRequest', that makes to trigger component updating with useEffect()
    setUrlRequest({
      url: "http://localhost:8080/staffs",
      request: {
        method: "POST",
        mode: "cors",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
      },
      action: "register",
    });
  };

  const login = (user) => {
    setUrlRequest({
      url: "http://localhost:8080/login",
      request: {
        method: "POST",
        mode: "cors",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
      },
      action: "login",
    });
  };
  const logout = (user) => {
    setUrlRequest({
      url: "/logout",
      request: {
        method: "POST",
        mode: "cors",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
      },
      action: "logout",
    });
  };

  //CONDITION RENDERING for different JSX presentation

  // create a 'message area' under Navbar for Informing client what being happended while different stage of requesting is
  // the message will appear every rendering when first 'type' of state error param change  for instance even "empty"..." or "Register success"
  let messageArea = <h4></h4>;
  if (state.loading) {
    messageArea = <h4>Loading...</h4>;
  }
  if (state.error) {
    messageArea = <h4>{state.error}</h4>;
  }

  // Create temporaly XML page, which will be present on the first page of APP when isLogged: 'false' in the 'first' type of state
  let tempRender = (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <LoginPage setError={setError} register={register} login={login} />
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
  // this part XML will be loaded when user is already logged and isLogged change to true in the 'first' type of state
  if (state.isLogged) {
    tempRender = (
      <Routes>
        <Route exact path="/" element={<ListCustomerComponent />} />
        <Route path="/add-customer" element={<AddCustomerForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <div className="App">
      <Navbar isLogged={state.isLogged} logout={logout} />
      {messageArea}
      <hr />
      {tempRender}
    </div>

    /*{ <<<<<<<<<<<<<< On branch main being version >>>>>>>>>>>>>>>>>> */
    /* <div>
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
   <<<<<<<<<<<<<< On branch main being version >>>>>>>>>>>>>>>>>> 
  }*/
  );
}

export default App;

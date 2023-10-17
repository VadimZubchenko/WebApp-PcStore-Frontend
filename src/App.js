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
import LoginPage from "./pages/LoginPage";
import ListCustomerComponent from "./components/CustomerListComponent";
import AddCustomerForm from "./components/AddCustomerForm";
import ShopPage from "./pages/ShopPage";
import FooterComponent from "./components/FooterComponent";

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

  //useEffect being intitiated from all states changes
  //STORAGE FUNCTIOINS

  useEffect(() => {
    // saving session on the web-browser gives opportunity reload page into same state
    // without that it goes comeback to loginpage
    // first passing here('true') will be just after case of action: "register" and setError's saveToStorage(tempState);
    if (sessionStorage.getItem("state")) {
      let state = JSON.parse(sessionStorage.getItem("state"));
      setState(state);
      if (state.isLogged) {
        //after 'login' loads first time the empty getShoppList(token) after reloading the page
        getPartList(state.token);
      }
    }
  }, []);
  //sessionStorage is embedded lib, first time initiated while login
  const saveToStorage = (state) => {
    sessionStorage.setItem("state", JSON.stringify(state));
  };

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
      saveToStorage(tempState);
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
    saveToStorage(state);
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
          case "getlist":
            let data = await response.json();
            setState((state) => {
              let tempState = {
                ...state,
                list: data,
              };
              // saving the page state into sessionStorage
              saveToStorage(tempState);
              return tempState;
            });
            return;
          case "addcustomer":
            getPartList();
            return;
          case "addOrder":
            getPartList();
            return;

          case "register":
            setError("Register success"); // methood upddates STATE with error: "Register succes" and first time saveToStorage see above
            return;
          case "login":
            //the resp will include created on backEnd token with login & password
            let token = await response.json();
            setState((state) => {
              // isLogged == true ,state.isLogged changes to true, see above
              // which opens other tempRender page, see below
              let tempState = {
                ...state,
                isLogged: true,
                token: token.token, // token.token, because in resp the token is under token name
              };
              // saving the page state into sessionStorage
              saveToStorage(tempState);
              return tempState; //just now it changes the state
            });
            getPartList(token.token);
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
          case "login":
            if (response.status === 400) {
              setError("Login or password are not correct.");
            } else {
              setError(
                "Failed to login user. Server responded with a status:" +
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
      url: "/registration",
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
      url: "/login",
      request: {
        method: "POST",
        mode: "cors",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
      },
      action: "login",
    });
  };
  const logout = () => {
    setUrlRequest({
      url: "/logout",
      request: {
        method: "POST",
        mode: "cors",
        headers: { "Counter-type": "application/json", token: state.token },
      },
      action: "logout",
    });
  };

  // whether getPartList(null) or  getPartList(argument)
  const getPartList = (token) => {
    let temptoken = state.token; // it "null " before 'login'
    if (token) {
      temptoken = token;
    }

    setUrlRequest({
      url: "/parts",
      request: {
        method: "GET",
        mode: "cors",
        //The token is inserted into headers.
        headers: { "Content-type": "application/json", token: temptoken },
      },
      action: "getlist",
    });
  };

  // add Customers function
  const addCustomer = (item) => {
    setUrlRequest({
      url: "/customers",
      request: {
        method: "POST",
        mode: "cors",
        headers: { "Content-type": "application/json", token: state.token },
        body: JSON.stringify(item),
      },
      action: "addcustomer",
    });
  };
  //addOrder
  const addOrder = (item) => {
    setUrlRequest({
      url: "/orders",
      request: {
        method: "POST",
        mode: "cors",
        headers: { "Content-type": "application/json", token: state.token },
        body: JSON.stringify(item),
      },
      action: "addOrder",
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

  // Create temporaly XML page, which will be present on the first page of APP
  // when isLogged: 'false' in the 'first' type of state
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
        <Route
          exact
          path="/"
          element={
            //<ListCustomerComponent list={state.list} errorMsg={state.error} />
            <ShopPage
              addOrder={addOrder}
              list={state.list}
              setError={setError}
            />
          }
        />
        <Route
          path="/add-customer"
          element={<AddCustomerForm addCustomer={addCustomer} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <div className="container-fluid">
      <header>
        <Navbar isLogged={state.isLogged} logout={logout} />
      </header>
      <div className="text-center">
        <hr />
        {messageArea}
      </div>
      <div className="container-fluid bd-gutter grey-background card-box">
        {tempRender}
      </div>
      <footer className="footer bd-footer py-2 py-md-3 mt-4 bg-black position-relative">
        <FooterComponent />
      </footer>
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

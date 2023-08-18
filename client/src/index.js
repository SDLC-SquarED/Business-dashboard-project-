import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import reportWebVitals from "./reportWebVitals";

//import { Login } from "./Pages/Login";

import { GoogleOAuthProvider } from "@react-oauth/google";

//const googleClientID = process.env.REACT_APP_GOOGLE_LOGIN;
// console.log(process.env);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  //  <GoogleOAuthProvider clientId={googleClientID}>
    <React.StrictMode>
      {/* <Login /> */}
       <App /> 

    </React.StrictMode>

  //  </GoogleOAuthProvider> 

);



reportWebVitals();


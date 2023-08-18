import App from "./App";import React from "react";

import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";

import reportWebVitals from "./reportWebVitals";

import { Login } from "./Pages/Login";


const googleClientID = process.env.REACT_APP_GOOGLE_LOGIN;
// console.log(process.env);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
   <GoogleOAuthProvider clientId={googleClientID}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<App />} />
        </Routes>
      </Router>
    </React.StrictMode>

   </GoogleOAuthProvider> 

);



reportWebVitals();


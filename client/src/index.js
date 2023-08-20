import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Login from './Pages/Login';
import { Logout } from './Pages/Logout';

const googleClientID = process.env.REACT_APP_GOOGLE_LOGIN;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={googleClientID}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<App />} />
          <Route path="/logout" element={<Logout />} /> {/* Add the route for the Logout component */}
        </Routes>
      </Router>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

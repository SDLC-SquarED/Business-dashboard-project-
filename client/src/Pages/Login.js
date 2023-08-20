import React, { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveUserAfterLogin } from "../utils/apiCaller"; // Update with correct path
import stockBackground from "../assets/stock.png"; // Import the background image

const Login = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      const user = codeResponse;
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          const profile = res.data;

          // Check if user already exists in the database
          const userData = {
            username: profile.email, // Use email as username for simplicity
            email: profile.email,
          };

          try {
            console.log(profile);
            localStorage.setItem("userInfo", profile.given_name);
            await saveUserAfterLogin(userData); // Call the API to save user
          } catch (error) {
            console.error("Error saving user:", error);
          }

          // Redirect to the homepage after successful login
          navigate("/app");
        })
        .catch((err) => console.log(err));
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/app");
    }
  }, [navigate]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: `url(${stockBackground})`,
        backgroundSize: "cover",
      }}
    >
      <h2 className="text-2xl font-bold mb-4"></h2>
      <br />
      <br />
      <button
        onClick={() => login()}
        className="px-4 py-2 bg-blue-800 text-white rounded-2xl hover:bg-blue-900"
      >
        Sign in with Google 🚀
      </button>
    </div>
  );
};

export default Login;

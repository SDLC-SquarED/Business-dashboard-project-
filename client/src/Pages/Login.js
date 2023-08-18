import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export const Login = () => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
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
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div className="text-center">
          <img
            src={profile.picture}
            alt="user image"
            className="w-20 h-20 mx-auto rounded-full mb-4"
          />
          <h3 className="text-xl font-semibold">User Logged in</h3>
          <p className="mb-2">Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <button
            onClick={logOut}
            className="px-4 py-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Log out
          </button>
        </div>
      ) : (
        <button
          onClick={() => login()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign in with Google 🚀
        </button>
      )}
    </div>
  );
};

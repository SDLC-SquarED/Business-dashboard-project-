import React, { useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const Logout = () => {
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    googleLogout();
    navigate('/'); // Redirect to the login page
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Logging Out...</h2>
    </div>
  );
};

"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

  const handleGoogleLogin = () => {
    // Change this URL to your NestJS API for Google login
    //window.location.href = "http://localhost:3001/v1/auth/google/";
     window.location.href = "https://tictactoe-backend-gsjf.onrender.com/v1/auth/google/";
  };

  useEffect(() => {
    // Check for token in localStorage on component mount
    const token = localStorage.getItem("token"); // Get the token from localStorage

    if (token) {
      console.log("Token found in localStorage:", token); // Log the token
      setIsLoggedIn(true); // Update the login state
    }

    // Check for token in the URL parameters
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token"); // Get the token parameter from the URL

    if (urlToken) {
      localStorage.setItem("token", urlToken); // Store the token in localStorage
      console.log("Token stored in localStorage:", urlToken); // Log the token

      // Remove token parameter from the URL
      params.delete("token");
      window.history.replaceState({}, document.title, window.location.pathname);

      setIsLoggedIn(true); // Update the login state
    }
  }, []); // Run this effect only once when the component mounts

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {!isLoggedIn && ( // Render button only if not logged in
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center rounded-full border border-transparent bg-blue-600 text-white text-lg h-12 px-6 hover:bg-blue-700 transition duration-300"
        >
          <Image
            className="mr-2"
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_%22G%22_Logo.svg" // Google icon
            alt="Google logo"
            width={24}
            height={24}
          />
          Sign in with Google
        </button>
      )}
    </div>
  );
}

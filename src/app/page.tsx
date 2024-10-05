"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AUTH_CONSTANTS, COPYRIGHT  } from '../constants/constants';
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const handleSignIn = () => {
    console.log(AUTH_CONSTANTS.SIGN_IN_WITH_GOOGLE);
    // เพิ่ม logic การเซ็นอินด้วย Google ที่นี่
  };
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
    <main className="flex flex-col min-h-screen justify-items-center">
    
  
    <div className="flex  flex-1 my-10  justify-items-center justify-between gap-10  h-full  bg-primary">
    <nav className="bg-yellow-50 w-full h-9">
    asdad
    {!isLoggedIn && (
        
        <div className="flex items-center justify-between gap-2 rounded-md border border-transparent bg-gray-30 text-blue-20 text-lg h-12 px-6 hover:bg-[#ddd] transition duration-300">

<FcGoogle/>
        <button
          onClick={handleGoogleLogin}
          className="text-grey-10"
        >
          
          
          {AUTH_CONSTANTS.SIGN_IN_WITH_GOOGLE}
        </button>
        </div>
      )}
    </nav> 
     
  <section className="bg-red-20 w-full">
section
  </section>
  <aside className="bg-blue-20 w-full">
aside
    </aside>
    </div>
    
  
    
    <footer className="h-12 flex justify-center items-center bg-gray-90 text-blue-20">
      <span>{COPYRIGHT}</span></footer>
    </main>
  );
}

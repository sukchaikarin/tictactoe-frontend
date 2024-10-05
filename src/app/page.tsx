"use client";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import ox from "../../public/logo/ox-games.webp"
import { AUTH_CONSTANTS, FOOTER, HOWTOPLAY, SWITCHLANG, GAME_RULES } from '../constants/constants';
import React from 'react';
import GamesRules from '@/components/modals/GamesRules';
import { Button } from 'react-daisyui';
export default function Home() {
  const [language, setLanguage] = useState<'en' | 'th'>('en'); // กำหนดประเภทให้เป็น 'en' หรือ 'th'
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  //const [isOpen, setIsOpen] = useState(false); // ใช้เพื่อจัดการสถานะเปิด/ปิดของ modal

  const [isModalHowToPlayOpen, setModalHowToPlayOpen] = useState<boolean>(false);

  const openModalHowToPlay = () => setModalHowToPlayOpen(true);
  const closeModalHowToPlay = () => setModalHowToPlayOpen(false);

  //const openModal = () => setIsOpen(true);
  //const closeModal = () => setIsOpen(false);
  const handleGoogleLogin = () => {
    // Change this URL to your NestJS API for Google login
    window.location.href = "http://localhost:3001/v1/auth/google/";
    //window.location.href = "https://tictactoe-backend-gsjf.onrender.com/v1/auth/google/";
  };

  // const toggleLanguage = () => {
  //   setLanguage(prevLanguage => (prevLanguage === 'en' ? 'th' : 'en')); // สลับภาษา
  // };
  const toggleLanguage = (lang: 'en' | 'th') => {
    setLanguage(lang);
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
        <nav className="bg-yellow-50 gap-10 w-full flex flex-col  my-10 items-center relative">
          <div className="join scale-75 absolute top-3 right-3">
            <input
              id="radioENG"
              className="join-item btn"
              type="radio"
              name="options"
              aria-label={SWITCHLANG.BUTTON_LABEL.en}
              checked={language === 'en'}
              onChange={() => toggleLanguage('en')} // สลับเป็นภาษาอังกฤษ
            />
            <input
              id="radioTH"
              className="join-item btn"
              type="radio"
              name="options"
              aria-label={SWITCHLANG.BUTTON_LABEL.th}
              checked={language === 'th'}
              onChange={() => toggleLanguage('th')} // สลับเป็นภาษาไทย
            />
          </div>
          <div className="w-2/3 h-1/3 flex items-center  mt-10 ">
            <Image
              src={ox}
              alt="Description of the image"
              layout="responsive"
            />
          </div>
          <div className='bg-green-50 h-full mb-10 flex flex-col gap-4 py-10 '>

            {!isLoggedIn && (
              <>
                <Button onClick={handleGoogleLogin} id="SignInGoogle" className="btn w-full"><FcGoogle />{AUTH_CONSTANTS.SIGN_IN[language]}</Button>
                <Button onClick={openModalHowToPlay} id="btn-how-to-play" className="btn w-full">{HOWTOPLAY.TITLE[language]}</Button>
              </>
            )}
            <div>

              <GamesRules isOpen={isModalHowToPlayOpen} language={language} closeModal={closeModalHowToPlay} />

            </div>

          </div>

        </nav>

        <section className="bg-red-20 w-full">
          section
        </section>
        <aside className="bg-blue-20 w-full">
          aside
        </aside>
      </div>



      <footer className="p-2 flex gap-2 justify-center items-center bg-gray-90 text-blue-20">
        <span>{FOOTER.COPYRIGHT[language]}</span>
        <span>{FOOTER.DEVELOPED_BY[language]}</span>
      </footer>
    </main>
  );
}

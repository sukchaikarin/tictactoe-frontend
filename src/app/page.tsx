"use client";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import ox from "../../public/logo/ox-games.webp"
import { AUTH_CONSTANTS, FOOTER, HOWTOPLAY, SWITCHLANG,  } from '../constants/constants';
import React from 'react';
import GamesRules from '@/components/modals/GamesRules';
import { Button } from 'react-daisyui';
import ScoreAndWinTabs from '@/components/ScoreAndWinTabs';
import TicTacToe from '@/components/TicTacToe';






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
    <main className="flex flex-col min-h-screen justify-items-center bg-primary">

      <div className="flex  flex-1 my-10  justify-items-center justify-between gap-10  h-full ">

        <nav className="gap-10 w-full flex flex-col  my-10 items-center relative bg-gray-90 rounded-r-xl shadow-lg border-2  border-gray-10">
          <div className="join scale-75 absolute top-1 left-1 shadow-md border-2 border-gray-10 rounded-xl">
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
          <div className="w-8/10 h-1/3 flex items-center  m-5 mt-10">
            <Image
              className='border-2 border-gray-10 rounded-xl shadow-lg'
              src={ox}
              alt="Description of the image"
              width={500}
             
            />
          </div>

          <div className=' h-full w-full'>
            {!isLoggedIn && (
              <div className='flex flex-col items-center justify-center gap-4  h-2/3'>
                <Button onClick={handleGoogleLogin} id="SignInGoogle" className="btn rounded-xl border-2 border-gray-10 w-1/2 mt-4"><FcGoogle className="text-black text-3xl " />{AUTH_CONSTANTS.SIGN_IN[language]}</Button>
                <Button onClick={openModalHowToPlay} id="btn-how-to-play-isloggin" className="btn rounded-xl border-2 border-gray-10 w-1/2">{HOWTOPLAY.TITLE[language]}</Button>
              </div>
            )}
            {isLoggedIn && (<>
              <div className="w-full flex-1 bg-yellow-70 text-gray-10">asd</div>

              <Button onClick={openModalHowToPlay} id="btn-how-to-play-loggin" className="btn w-2/5 mt-auto">{HOWTOPLAY.TITLE[language]}</Button>

            </>)}

          </div>
          <GamesRules isOpen={isModalHowToPlayOpen} language={language} closeModal={closeModalHowToPlay} />
        </nav>

        <section className="w-full my-10 flex flex-col justify-center bg-gray-90 rounded-xl shadow-lg border-2  border-gray-10">
          {/* Div 2/3 */}
          {/* เนื้อหาสำหรับ ตารางเกม XO */}
          <TicTacToe />



          {/* Div 1/3 */}
          <div className="h-1/3 p-4 bg-red-70 m-2">
            {/* เนื้อหาสำหรับ div คะแนนในเกมนั้น รวมถึงปุ่มกดเริ่ม start game*/}
            Div 1/3
          </div>
        </section>


        <aside className=" w-full  my-10 flex justify-center bg-gray-90 rounded-l-xl shadow-lg border-2  border-gray-10">

          <ScoreAndWinTabs language={language} />




        </aside>

      </div>

      <footer className="p-2 flex gap-2 justify-center items-center bg-gray-90 text-blue-20">
        {/* <span>{FOOTER.COPYRIGHT[language]}</span> */}
        <span>{FOOTER.DEVELOPED_BY[language]}</span>
      </footer>

    </main>
  );
}

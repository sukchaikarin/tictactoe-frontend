"use client";
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { FcGoogle } from "react-icons/fc";
import ox from "../../public/logo/ox-games.webp";
import { AUTH_CONSTANTS, FOOTER, HOWTOPLAY } from '../constants/constants';
import GamesRules from '@/components/modals/GamesRules';
import { Button } from 'react-daisyui';
import ScoreAndWinTabs from '@/components/ScoreAndWinTabs';
import TicTacToe from '@/components/TicTacToe/TicTacToe';
import LanguageSelector from '@/components/LanguageSelector';  // นำเข้า component

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'th'>('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalHowToPlayOpen, setModalHowToPlayOpen] = useState<boolean>(false);

  const openModalHowToPlay = () => setModalHowToPlayOpen(true);
  const closeModalHowToPlay = () => setModalHowToPlayOpen(false);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3001/v1/auth/google/";
  };

  const toggleLanguage = (lang: 'en' | 'th') => {
    setLanguage(lang);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }

    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");

    if (urlToken) {
      localStorage.setItem("token", urlToken);
      params.delete("token");
      window.history.replaceState({}, document.title, window.location.pathname);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <main className="flex flex-col min-h-screen justify-items-center bg-gray-90">

      <div className="flex  flex-1 my-10  justify-items-center justify-between gap-10  h-full ">
        <nav className="gap-10 w-full flex flex-col  my-10 items-center relative bg-gray-90 rounded-r-xl shadow-lg   shadow-gray-10">

          {/* นำ component LanguageSelector มาใช้ */}
          <LanguageSelector language={language} toggleLanguage={toggleLanguage} />

          <div className="w-8/10 h-1/3 flex items-center  m-5 mt-10">
            <Image
              className=' rounded-xl shadow-lg shadow-gray-10'
              src={ox}
              alt="Description of the image"
              width={500}
            />
          </div>

          <div className=' h-full w-full'>
            {!isLoggedIn && (
              <div className='flex flex-col items-center justify-center gap-4  h-2/3'>
                <Button onClick={handleGoogleLogin} id="SignInGoogle" className="btn rounded-xl border-2 border-gray-10 w-1/2 mt-4">
                  <FcGoogle className="text-black text-3xl" />
                  {AUTH_CONSTANTS.SIGN_IN[language]}
                </Button>
                <Button onClick={openModalHowToPlay} id="btn-how-to-play-isloggin" className="btn rounded-xl border-2 border-gray-10 w-1/2">
                  {HOWTOPLAY.TITLE[language]}
                </Button>
              </div>
            )}
            {isLoggedIn && (
              <>
                <div className="w-full flex-1 bg-yellow-70 text-gray-10">asd</div>
                <Button onClick={openModalHowToPlay} id="btn-how-to-play-loggin" className="btn w-2/5 mt-auto">
                  {HOWTOPLAY.TITLE[language]}
                </Button>
              </>
            )}
          </div>
          <GamesRules isOpen={isModalHowToPlayOpen} language={language} closeModal={closeModalHowToPlay} />
        </nav>

        <section className="w-full my-10 flex flex-col justify-center rounded-xl shadow-lg shadow-gray-10 ">
          <TicTacToe />
          <div className="h-1/3 p-4 bg-red-70 m-2">Div 1/3</div>
        </section>

        <aside className=" w-full  my-10 flex justify-center  rounded-l-xl shadow-lg border-2  border-gray-10">
          <ScoreAndWinTabs language={language} />
        </aside>
      </div>

      <footer className="p-2 flex gap-2 justify-center items-center bg-gray-10 text-[#fff]">
        <span>{FOOTER.DEVELOPED_BY[language]}</span>
      </footer>
    </main>
  );
}

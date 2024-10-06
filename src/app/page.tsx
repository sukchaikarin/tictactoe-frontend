// Home.tsx
"use client";
import React, { useState, useEffect } from "react";
import { FOOTER } from "../constants/constants";
import NavBar from "@/components/NavBar"; // นำเข้า NavBar component
import ScoreAndWinTabs from "@/components/leaderboard/ScoreAndWinTabs";
import TicTacToe from "@/components/TicTacToe/TicTacToe";

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
      <div className="flex flex-1 flex-col md:flex-row justify-items-center justify-between gap-4 h-full">
        {/* ใช้ NavBar ใหม่ที่สร้างขึ้น */}
        <NavBar 
        setIsLoggedIn={setIsLoggedIn}
          language={language}
          isLoggedIn={isLoggedIn}
          openModalHowToPlay={openModalHowToPlay}
          handleGoogleLogin={handleGoogleLogin}
          toggleLanguage={toggleLanguage}
          isModalHowToPlayOpen={isModalHowToPlayOpen}
          closeModalHowToPlay={closeModalHowToPlay}
        />

        <section className="w-full my-4 flex flex-col  justify-center shadow-md   shadow-gray-10 ">
          <TicTacToe language={language} />
          <div className="h-1/3 p-4 bg-red-70 m-2">Div 1/3</div>
        </section>

        <aside className="w-full my-4 flex justify-center  shadow-md   shadow-gray-10 ">
          <ScoreAndWinTabs language={language} />
        </aside>
      </div>

      <footer className="p-2 flex gap-2 justify-center items-center bg-gray-10 text-[#fff]">
        <span>{FOOTER.DEVELOPED_BY[language]}</span>
      </footer>
    </main>
  );
}

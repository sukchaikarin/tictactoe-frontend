// NavBar.tsx
"use client";
import React from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { AUTH_CONSTANTS, HOWTOPLAY } from "../constants/constants";
import { Button } from "react-daisyui";
import LanguageSelector from "@/components/langs/LanguageSelector"; // นำเข้า component
import { useUser } from "@/context/UserContext";
import GamesRules from "./modals/GamesRules";
interface NavBarProps {
  language: 'en' | 'th';
  isLoggedIn: boolean;
  openModalHowToPlay: () => void;
  handleGoogleLogin: () => void;
  toggleLanguage: (lang: 'en' | 'th') => void;
  isModalHowToPlayOpen: boolean;
  closeModalHowToPlay: () => void;
}

const NavBar: React.FC<NavBarProps> = ({
  language,
  isLoggedIn,
  openModalHowToPlay,
  handleGoogleLogin,
  toggleLanguage,
  isModalHowToPlayOpen,
  closeModalHowToPlay,
}) => {

  const { user } = useUser();
 
  return (
    <nav className="w-full flex flex-col my-4 items-center relative bg-gray-90  shadow-md shadow-gray-10">
      {/* นำ component LanguageSelector มาใช้ */}
      <LanguageSelector language={language} toggleLanguage={toggleLanguage} />
     
      <div className="flex items-center mb-2 mt-14 bg-yellow-50">
        <Image
          className="rounded-md shadow-md shadow-gray-10"
          src="/logo/ox-games.webp"
          alt="OX-Games images"
          width={500}
          height={300}
          priority
        />
      </div>

      <div className="h-full w-full mb-4">
        {!isLoggedIn && (
          <div className="flex flex-col items-center justify-center gap-4 h-2/3 px-4">
            <Button
              onClick={handleGoogleLogin}
              id="SignInGoogle"
              className="btn rounded-xl max-w-screen-md border-2 min-w-52 border-gray-10 mt-4 px-4 py-2 overflow-hidden"
            >
              <FcGoogle className="text-black text-3xl mr-2" />
              {AUTH_CONSTANTS.SIGN_IN[language]}
            </Button>
            <Button
              onClick={openModalHowToPlay}
              id="btn-how-to-play-isloggin"
              className="btn rounded-xl border-2 min-w-52 border-gray-10 px-4 py-2"
            >
              {HOWTOPLAY.TITLE[language]}
            </Button>
          </div>
        )}

        {isLoggedIn && (
          <>
 {user ? (
        <div className="flex  bg-green-60 p-6" >
          
          <Image 
            src={user.picture} 
            alt={`${user.name}'s profile`} 
            width={80} // กำหนดความกว้างที่คุณต้องการ
            height={80} // กำหนดความสูงที่คุณต้องการ
            className="rounded-full m-3" // เพิ่มคลาสสำหรับการจัดรูปทรง
          />
<div className="bg-[#ddd] flex-1">

<p className="text-gray-10 text-xl">Welcome, {user.name}!</p>
</div>
        </div>
      ) : (
        <p>Please log in</p>
      )}


            <div className="w-full flex-1 bg-yellow-70 text-gray-10">asd</div>
            <Button onClick={openModalHowToPlay} id="btn-how-to-play-loggin" className="btn w-2/5 mt-auto">
              {HOWTOPLAY.TITLE[language]}
            </Button>
          </>
        )}
      </div>
      

      <GamesRules isOpen={isModalHowToPlayOpen} language={language} closeModal={closeModalHowToPlay} />
    </nav>
  );
};

export default NavBar;

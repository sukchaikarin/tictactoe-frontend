"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { AUTH_CONSTANTS, HOWTOPLAY } from "../constants/constants";
import { Button } from "antd";
import LanguageSelector from "@/components/langs/LanguageSelector"; // Import LanguageSelector component
import { useUser } from "@/context/UserContext";
import GamesRules from "./modals/GamesRules";
import UserProfile from "@/components/UserProfile"; // Import the UserProfile component
import { Modal, Spin } from "antd";

interface NavBarProps {
  language: 'en' | 'th';
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
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
  setIsLoggedIn,
  toggleLanguage,
  isModalHowToPlayOpen,
  closeModalHowToPlay,
}) => {
  const { user } = useUser(); // Accessing the user from context

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSignOutLoading, setIsSignOutLoading] = useState(false); // สถานะการโหลดสำหรับ Sign Out

  const signOut = async () => {
    setIsSignOutLoading(true); // เริ่มการโหลด

    // รอ 2-3 วินาที
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Remove token from localStorage
    localStorage.removeItem("token");

    // Update isLoggedIn state
    setIsLoggedIn(false);
    
    setIsModalVisible(false); // ปิด modal
    setIsSignOutLoading(false); // หยุดการโหลด
  };

  const handleSignOutClick = () => {
    setIsModalVisible(true); // เปิด modal
  };

  const handleCancelModalSignout = () => {
    setIsModalVisible(false); // ปิด modal
  };

  return (
    <nav className="w-full flex flex-col my-4 items-center relative bg-gray-90 shadow-md shadow-gray-10">
      {/* Use LanguageSelector component */}
      <LanguageSelector language={language} toggleLanguage={toggleLanguage} />

      <div className="flex items-center  mb-2 mt-14 bg-yellow-50">
        <Image
          className="rounded-md shadow-md shadow-gray-10"
          src="/logo/ox-games.webp"
          alt="OX-Games images"
          width={500}
          height={300}
          priority
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <div className="flex flex-col items-center justify-center h-full w-full mb-4 ">
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
            {user && (<UserProfile />)}
            <div className="w-full flex flex-col items-center sm:flex-row-reverse  sm:justify-between p-8">
              <Button
                onClick={openModalHowToPlay}
                id="btn-how-to-play-loggin"
                className="btn w-48 bg-primary text-white font-bold py-3 rounded-lg shadow-lg hover:bg-yellow-70 transition duration-200"
              >
                {HOWTOPLAY.TITLE[language]}
              </Button>
           
              <Button
        className="btn w-48 border-2 border-gray-70 text-gray-600 bg-transparent hover:bg-gray-100"
        onClick={handleSignOutClick}
      >
        Sign out
      </Button>

      {/* Modal สำหรับการยืนยันการ Sign Out */}
      <Modal
        title="Confirm Sign Out"
        open={isModalVisible}
        onCancel={handleCancelModalSignout}
        footer={null}
        centered
      >
        <p>Are you sure you want to sign out?</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={handleCancelModalSignout}>Cancel</Button>
          <Button type="primary" onClick={signOut} disabled={isSignOutLoading}>
            {isSignOutLoading ? <Spin size="small" /> : 'Sign Out'}
          </Button>
        </div>
      </Modal>
            </div>

          </>
        )}
      </div>

      <GamesRules isOpen={isModalHowToPlayOpen} language={language} closeModal={closeModalHowToPlay} />
    </nav>
  );
};

export default NavBar;

"use client"
import Image from "next/image";

export default function Home() {
  const handleGoogleLogin = () => {
    // เปลี่ยน URL นี้ให้เป็น URL ของ NestJS API สำหรับการเข้าสู่ระบบ Google
   // window.location.href = "http://localhost:3001/v1/auth/google/"; 
   window.location.href = "https://tictactoe-backend-gsjf.onrender.com/v1/auth/google/";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center rounded-full border border-transparent bg-blue-600 text-white text-lg h-12 px-6 hover:bg-blue-700 transition duration-300"
      >
        <Image
          className="mr-2"
          src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_%22G%22_Logo.svg" // ไอคอน Google
          alt="Google logo"
          width={24}
          height={24}
        />
        Sign in with Google
      </button>
    </div>
  );
}

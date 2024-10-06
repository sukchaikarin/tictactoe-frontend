"use client"
import { jwtDecode } from 'jwt-decode';
import { User, UserService } from "@/_service/users";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";


// ประเภทข้อมูล User
interface UserPayload {
  user: {
    id: string;
  };
}

interface UserContextType {
  user: User | null; // ใช้ user เป็น object หรือ null
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  gameStats: {
    score: number; // เก็บคะแนน
    streak: number; // เก็บจำนวนผลชนะติดต่อกัน
  };
  win: () => void; // ฟังก์ชันชนะ
  draw: () => void; // ฟังก์ชันเสมอ
  lose: () => void; // ฟังก์ชันแพ้
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null); // เปลี่ยนเป็น user เดียวที่เป็น object
  const [score, setScore] = useState<number>(0); // สถานะคะแนน
  
  const [streak, setStreak] = useState<number>(0); // สถานะจำนวนผลชนะติดต่อกัน
  

  useEffect(() => {
    const fetchUser = async (userId: string) => {
      try {
        const userData: User = await UserService.fetchUserById(userId); // เรียกใช้ฟังก์ชันจาก service
        setUser(userData); // ตั้งค่า state user ด้วยข้อมูลที่ดึงมา
      } catch (error) {
        console.error("Error fetching user:", error); // แสดง error ใน console ถ้ามี
      }
    };

    const token = localStorage.getItem("token"); // ดึง JWT token จาก localStorage
    if (token) {
      try {
        // Decode the token to get the payload
        const decoded: UserPayload = jwtDecode(token); // ใช้ประเภทข้อมูลที่ประกาศไว้
        const userId = decoded.user.id; // ดึง user ID จาก payload
        fetchUser(userId); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลผู้ใช้
      } catch (error) {
        console.error("Error decoding token:", error); // แสดง error หากมีปัญหาในการ decode token
      }
    } else {
      console.warn("Token not found"); // แสดงข้อความเตือนถ้าไม่มี token
    }
  }, []);

  // ฟังก์ชันจัดการคะแนนเมื่อชนะ
  const win = () => {
    console.log(score)
    setScore(prevScore => prevScore + 1); // เพิ่มคะแนน 1
    setStreak(prevStreak => {
      const newStreak = prevStreak + 1; // เพิ่ม streak 1
      if (newStreak === 3) {
        setScore(prevScore => prevScore + 1); // เพิ่มคะแนนอีก 1 ถ้า streak เท่ากับ 3
        return 0; // รีเซ็ต streak เป็น 0
      }
      return newStreak;
    });
    console.log("🚀 ~ UserProvider ~ score:", score)
    console.log("🚀 ~ UserProvider ~ streak:", streak)
  };

  // ฟังก์ชันจัดการคะแนนเมื่อเสมอ
  const draw = () => {
    setStreak(0); // รีเซ็ต streak เป็น 0
    console.log("🚀 ~ UserProvider ~ score:", score)
    console.log("🚀 ~ UserProvider ~ streak:", streak)
  };

  // ฟังก์ชันจัดการคะแนนเมื่อแพ้
  const lose = () => {
    setScore(prevScore => prevScore - 1); // ลดคะแนน 1
    setStreak(0); // รีเซ็ต streak เป็น 0
    console.log("🚀 ~ UserProvider ~ score:", score)
    console.log("🚀 ~ UserProvider ~ streak:", streak)
  };

  // สร้างอ็อบเจกต์สำหรับเก็บค่าทั้งหมด
  const gameStats = {
    score,
    streak,
  };

  return (
    <UserContext.Provider value={{ user, setUser, gameStats, win, draw, lose }}>
      {children}
    </UserContext.Provider>
  );
};

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

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

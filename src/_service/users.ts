// src/_services/user.ts
import axios from 'axios';

// กำหนดประเภทข้อมูลที่เราจะใช้
export interface User {
  _id: string;
  name: string;
  email: string;
  picture: string;
  googleId: string;
  scores: number;
  highestScore: number;
  maxWinsStreak: number;
  createdAt: string;
  updatedAt: string;
}

// ใช้ environment variable สำหรับ base URL
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/v1'; // ปรับ URL ตามที่คุณต้องการ

// ฟังก์ชัน fetchUsers สำหรับดึงข้อมูลผู้ใช้ทั้งหมด
 const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${baseURL}/users`); // เปลี่ยน endpoint ตาม API ของคุณ
    return response.data; // คืนค่าข้อมูลผู้ใช้
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // ขึ้น error ถ้ามีปัญหา
  }
};

// ฟังก์ชัน fetchUser สำหรับดึงข้อมูลผู้ใช้ตาม ID
 const fetchUserById = async (userId: string): Promise<User> => {
  try {
    const response = await axios.get(`${baseURL}/users/${userId}`); // ดึงข้อมูลผู้ใช้ตาม ID
    console.log("🚀 ~ fetchUserById ~ response:", response)
    return response.data; // คืนค่าข้อมูลผู้ใช้
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error; // ขึ้น error ถ้ามีปัญหา
  }
};

export const UserService = {
    fetchUsers,fetchUserById
}

// src/_services/leaderboard.service.ts
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/v1'; // ปรับ URL ตามที่คุณต้องการ


export interface UserScoreData {
    _id: string;
    name: string;
    scores: number;
  }

// ฟังก์ชันเพื่อดึงอันดับผู้ใช้ตามคะแนน
const getLeaderboardScores = async (page: number = 1): Promise<{ users: UserScoreData[], totalPages: number }> => {
 
  try {
    const response = await axios.get(`${baseURL}/users/scores`, {
      params: { page } // ส่งเฉพาะ page และ limit
    });
    return response.data; // คืนค่าข้อมูลที่ได้รับจาก API
  } catch (error) {
    console.error("Error fetching leaderboard scores:", error);
    throw error; // ขึ้น error ถ้ามีปัญหา
  }
};

 // สร้าง UserMaxWinsStreakData interface
 export interface UserMaxWinsStreakData {
    _id: string;
    name: string;
    maxWinsStreak: number;
  }
const getLeaderboardStreak = async (page: number = 1): Promise<{ users: UserMaxWinsStreakData[], totalPages: number }> => {
    try {
      const response = await axios.get(`${baseURL}/users/max-wins-streak`, {
        params: { page } // ส่งเฉพาะ page
      });
      return response.data; // คืนค่าข้อมูลที่ได้รับจาก API
    } catch (error) {
      console.error("Error fetching leaderboard max wins streak:", error);
      throw error; // ขึ้น error ถ้ามีปัญหา
    }
  };
  
 
  

// สร้าง LeaderBoardService
export const LeaderBoardService = {
  getLeaderboardScores,getLeaderboardStreak
};

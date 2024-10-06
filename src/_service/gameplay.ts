// src/_services/gameplay.service.ts
import axios from 'axios';
import { User } from './users'; // นำเข้าข้อมูลประเภทผู้ใช้

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/v1'; // ปรับ URL ตามที่คุณต้องการ

// ฟังก์ชัน incrementScore สำหรับเพิ่มคะแนนของผู้ใช้
const incrementScore = async (userId: string, currentScore: number,streak:number):  Promise<{ streakMessage: { en: string; th: string };  scoresMessage: { en: string; th: string }; user: User; maxWinsStreakUpdated: boolean; newHighScores: boolean }>  => {
  try {
    const response = await axios.patch(`${baseURL}/users/${userId}/scores/increment`, { currentScore,streak });
    return response.data; // คืนค่าข้อมูลที่ได้รับจาก API
  } catch (error) {
    console.error("Error incrementing score:", error);
    throw error; // ขึ้น error ถ้ามีปัญหา
  }
};

// ฟังก์ชัน incrementScoreByTwo สำหรับเพิ่มคะแนน 2 ของผู้ใช้
const incrementScoreByTwo = async (userId: string, currentScore: number,streak:number):  Promise<{ streakMessage: { en: string; th: string };scoresMessage: { en: string; th: string }; user: User; maxWinsStreakUpdated: boolean; newHighScores: boolean }>  => {
  try {
    const response = await axios.patch(`${baseURL}/users/${userId}/scores/increment-2`, { currentScore,streak });
    return response.data; // คืนค่าข้อมูลที่ได้รับจาก API
  } catch (error) {
    console.error("Error incrementing score by 2:", error);
    throw error; // ขึ้น error ถ้ามีปัญหา
  }
};

// ฟังก์ชัน decrementScore สำหรับลดคะแนนของผู้ใช้
const decrementScore = async (userId: string): Promise<{ message: { en: string; th: string }; user: User }> => {
  try {
    const response = await axios.patch(`${baseURL}/users/${userId}/scores/decrement`);
    return response.data; // คืนค่าข้อมูลที่ได้รับจาก API
  } catch (error) {
    console.error("Error decrementing score:", error);
    throw error; // ขึ้น error ถ้ามีปัญหา
  }
};

// ฟังก์ชัน resetScore สำหรับรีเซ็ตคะแนนของผู้ใช้
const resetScore = async (userId: string): Promise<{ message: { en: string; th: string }; user: User }> => {
  try {
    const response = await axios.patch(`${baseURL}/users/${userId}/scores/reset`);
    return response.data; // คืนค่าข้อมูลที่ได้รับจาก API
  } catch (error) {
    console.error("Error resetting score:", error);
    throw error; // ขึ้น error ถ้ามีปัญหา
  }
};

// สร้าง GameplayService
export const GameplayService = {
  incrementScore,
  incrementScoreByTwo,
  decrementScore,
  resetScore,
};

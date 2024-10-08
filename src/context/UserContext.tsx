"use client"
import { jwtDecode } from 'jwt-decode';
import { User, UserService } from "@/_service/users";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { GameplayService } from '@/_service/gameplay';
import { notification } from "antd";
// ประเภทข้อมูล User
interface UserPayload {
  user: {
    id: string;
  };
}

interface UserContextType {
  language: 'en' | 'th';
  user: User | null; // ใช้ user เป็น object หรือ null
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  gameStats: {
    score: number; // เก็บคะแนน
    streak: number;
    highStreak: number; // เก็บจำนวนผลชนะติดต่อกัน
  };
  setLanguage: (lang: 'en' | 'th') => void;
  win: () => void; // ฟังก์ชันชนะ
  draw: () => void; // ฟังก์ชันเสมอ
  lose: () => void; // ฟังก์ชันแพ้
}

interface Message {
  en: string;
  th: string;
}
// แสดงข้อมูลการตอบสนอง
interface IncrementResponseData {
  streakMessage: Message;
  scoresMessage: Message; // เปลี่ยนชื่อเป็น scoresMessage เพื่อให้ตรงกับข้อมูลที่คุณใช้งาน
  user: User;
  maxWinsStreakUpdated: boolean;
  newHighScores: boolean; // เพิ่มเพื่อแสดงว่ามีคะแนนสูงใหม่หรือไม่
}

interface DecrementResponseData {
  message: Message;
  user: User;
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
  const [language, setLanguage] = useState<'en' | 'th'>('en');
  const [streak, setStreak] = useState<number>(0); // สถานะจำนวนผลชนะติดต่อกัน
  const [highStreak, setHighStreak] = useState<number>(0);

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
  const win = async () => {
    const newStreak = streak + 1;
    const newHighStreak = highStreak + 1;
    if (newStreak === 3) {
      if (user) {
        console.log(`this is user+2",${user._id} scores:${user.scores}`)
        const responseBonus: IncrementResponseData = await GameplayService.incrementScoreByTwo(user._id, user.scores, newHighStreak)
        console.log("🚀 ~ win ~ responseBonus:", responseBonus)
        if (responseBonus) {
          console.log("this is a responseBonus", responseBonus)
          //newHighScores
          //maxWinsStreakUpdated


          //แจ้งเตือนเมื่อทำลายสถิติชนะต่อเนื่องสูงสุด
          if(responseBonus.maxWinsStreakUpdated){
            notification.open({
              message: language === 'en' ? "Winner!" : "ผู้ชนะ!", // เปลี่ยนข้อความตามภาษา
              description: (
                <div style={{ padding: '10px' }}> {/* กำหนด padding ที่นี่ */}
                  {responseBonus.streakMessage[language]}
                </div>
              ),
              icon: '🏆',
              //placement: 'top',
            });
           }
              
           //แจ้งเตือนผลชนะ
            if (responseBonus.scoresMessage) {
              notification.open({
                message: language === 'en' ? "Winner!" : "ผู้ชนะ!", // เปลี่ยนข้อความตามภาษา
                description: (
                  <div style={{ padding: '10px' }}> {/* กำหนด padding ที่นี่ */}
                    {responseBonus.scoresMessage[language]}
                  </div>
                ),
                icon: '🏆',
                //placement: 'top',
              });
            }

          setUser(responseBonus.user);
        }
      }
      setStreak(0);
      setScore(prevScore => prevScore + 2);
    } else {
      if (user) {
        const responseIncrement: IncrementResponseData = await GameplayService.incrementScore(user._id, user.scores, newHighStreak)

        if (responseIncrement) {
          console.log("this is a responseIncrement", responseIncrement)
          //newHighScores
          //maxWinsStreakUpdated
         //แจ้งเตือนเมื่อทำลายสถิติชนะต่อเนื่องสูงสุด
         if(responseIncrement.maxWinsStreakUpdated){
          notification.open({
            message: language === 'en' ? "Winner!" : "ผู้ชนะ!", // เปลี่ยนข้อความตามภาษา
            description: (
              <div style={{ padding: '10px' }}> {/* กำหนด padding ที่นี่ */}
                {responseIncrement.streakMessage[language]}
              </div>
            ),
            icon: '🏆',
            //placement: 'top',
          });
         }
            
         //แจ้งเตือนผลชนะ
          if (responseIncrement.scoresMessage) {
            notification.open({
              message: language === 'en' ? "Winner!" : "ผู้ชนะ!", // เปลี่ยนข้อความตามภาษา
              description: (
                <div style={{ padding: '10px' }}>
                  {responseIncrement.scoresMessage[language]} {/* ข้อความตามภาษาที่เลือก */}
                </div>
              ),
              icon: '🏆', // ใช้อิโมจิเป็นไอคอน
              // placement: 'top',
            });
          }

          //scoresMessage
          //streakMessage
          // ใส่ notice ที่นี่
          // ใส่ notice ที่นี่
          setUser(responseIncrement.user);


        }
      }
      setScore(prevScore => prevScore + 1);
      setStreak(newStreak);
    }
    setHighStreak(prevScore => prevScore + 1);

  };

  // ฟังก์ชันจัดการคะแนนเมื่อเสมอ
  const draw = () => {

    // ใส่ notice ที่นี่
    notification.open({
      message: language === "en" ? "It's a tie!" : "เสมอ!", // เปลี่ยนข้อความตามภาษา
      description: (
        <div style={{ padding: '10px' }}>
          {language === "en" 
            ? "Great effort! Let's aim for victory next time!" 
            : "ความพยายามดีมาก! สู้ใหม่ในครั้งหน้า!"}
        </div>
      ),
      icon: '💪', // ใช้สัญลักษณ์ที่แสดงถึงการให้กำลังใจ
     // placement: 'top',
    });
    

    setStreak(0); // รีเซ็ต streak เป็น 0
  };

  // ฟังก์ชันจัดการคะแนนเมื่อแพ้
  const lose = async () => {
    if (user) {
      const responseDecrement: DecrementResponseData = await GameplayService.decrementScore(user._id)
      if (responseDecrement) {

        // ใส่ notice ที่นี่
        notification.open({
          message: language === 'en' ? "Loser!" : "ผู้แพ้!", // เปลี่ยนข้อความตามภาษา
          description: (
            <div style={{ padding: '10px' }}>
              {responseDecrement.message[language]}
            </div>
          ),
          icon: '😞', // ใช้อิโมจิแทนไอคอน
          // placement: 'top',
        });

        setUser(responseDecrement.user);
      }
    }
    setScore(prevScore => prevScore - 1); // ลดคะแนน 1
    setStreak(0); // รีเซ็ต streak เป็น 0
    setHighStreak(0);

  };

  // สร้างอ็อบเจกต์สำหรับเก็บค่าทั้งหมด
  const gameStats = {
    score,
    streak,
    highStreak,
  };

  return (
    <UserContext.Provider value={{ language, setLanguage, user, setUser, gameStats, win, draw, lose }}>
      {children}
    </UserContext.Provider>
  );
};

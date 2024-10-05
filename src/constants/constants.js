
export const SWITCHLANG = {
  BUTTON_LABEL: {
    en: "EN",
    th: "TH",
  },
  // คุณสามารถเพิ่มข้อความอื่น ๆ ได้ที่นี่
};

export const CLOSE ={
        en:"close",
        th:"ปิด",
}

export const AUTH_CONSTANTS = {
  SIGN_IN: {
    en: "Sign in with Google",
    th: "เข้าสู่ระบบด้วย Google",
  },
  SIGN_IN_WITH_FACEBOOK: {
    en: "Sign in with Facebook",
    th: "เข้าสู่ระบบด้วย Facebook",
  },
  SIGN_IN_WITH_EMAIL: {
    en: "Sign in with Email",
    th: "เข้าสู่ระบบด้วยอีเมล",
  },
  SIGN_OUT: {
    en: "Sign Out",
    th: "ออกจากระบบ",
  },
};

export const FOOTER = {
  COPYRIGHT: {
    en: "Copyright © 2024 tictactoe-frontend-smoky.vercel.app, ",
    th: "ลิขสิทธิ์ © 2024 tictactoe-frontend-smoky.vercel.app,",
  },
  DEVELOPED_BY: {
    en: "Developed by Karin Sukchai, Tel.098-647-7922, E-mail: karinsukchai.official@gmail.com",
    th: "พัฒนาโดย กรินทร์ สุขชัย, โทร.098-647-7922, อีเมลล์: karinsukchai.official@gmail.com",
  },
};

export const HOWTOPLAY = {
  TITLE: {
    en: "How to play",
    th: "วิธีการเล่น",
  },

};

export const STATISTICLABEL = {
  leaderBoard: {
    en: "Leader Board",
    th: "กระดานผู้นำ",
  },
  topScorers: {
    en: "Top Scorers",
    th: "คะแนนสูงสุด",
  },
  topWinners: {
    en: "Top Winners",
    th: "ผู้ชนะติดต่อกัน",
  },
  name: {
    en: "Name",
    th: "ชื่อ",
  },
  score: {
    en: "Score",
    th: "คะแนน",
  },
  consecutiveWins: {
    en: "Consecutive Wins",
    th: "จำนวนครั้งที่ชนะติดต่อกัน",
  },
};



export const GAME_RULES = {
  TITLE: {
    en: "How to Play OX Games (Tic Tac Toe)",
    th: "วิธีการเล่นเกม OX (Tic Tac toe)",
  },
  BASIC_RULES: {
    title: {
      en: "Basic Rules of OX Games:",
      th: "กฎพื้นฐานของเกม OX:",
    },
    rules: {
      "1": {
        en: "OX game is played on a 3x3 grid (9 squares).",
        th: "เกม OX เล่นบนกระดานขนาด 3x3 (ช่องทั้งหมด 9 ช่อง)",
      },
      "2": {
        en: "Each player gets their own symbol:",
        th: "ผู้เล่นแต่ละคนจะได้รับสัญลักษณ์ของตนเอง:",
        subRules: {
          "2.1": {
            en: "Player 1: Uses the symbol 'X'.",
            th: "ผู้เล่นคนที่ 1: ใช้เครื่องหมาย 'X'.",
          },
          "2.2": {
            en: "Player 2 (Bot): Uses the symbol 'O'.",
            th: "ผู้เล่นคนที่ 2 (บอท): ใช้เครื่องหมาย 'O'.",
          },
        },
      },
      "3": {
        en: "Players take turns placing their symbols on the empty squares of the grid.",
        th: "ผู้เล่นทั้งสองผลัดกันวางสัญลักษณ์ของตนลงในช่องว่างในกระดาน",
      },
      "4": {
        en: "The goal is to line up 3 of your symbols in a row, column, or diagonal.",
        th: "เป้าหมายของเกมคือการจัดเรียงสัญลักษณ์ของตนเองให้เรียงกัน 3 ช่อง ไม่ว่าจะเป็นแนวนอน แนวตั้ง หรือแนวทแยง",
      },
      "5": {
        en: "The game ends when:",
        th: "เกมจะสิ้นสุดเมื่อ:",
        subRules: {
          "5.1": {
            en: "One player wins.",
            th: "มีผู้เล่นคนหนึ่งชนะ.",
          },
          "5.2": {
            en: "No empty spaces remain on the board and no winner can be found (considered a draw).",
            th: "ไม่มีพื้นที่ว่างเหลือบนกระดานและไม่สามารถหาผู้ชนะได้ (ถือว่าเสมอ).",
          },
        },
      },
    },
  },
  SCORING_RULES: {
    title: {
      en: "Scoring Rules:",
      th: "กฎเกี่ยวกับคะแนน:",
    },
    rules: {
      "1": {
        en: "Players gain 1 point when they win against the bot:",
        th: "ผู้เล่นจะได้ 1 คะแนนเมื่อชนะบอท:",
        subRules: {
          "1.1": {
            en: "If the player successfully lines up 3 'X' symbols (wins against the bot), they immediately gain 1 point.",
            th: "ถ้าผู้เล่นสามารถจัดเรียงเครื่องหมาย 'X' 3 ตัวได้สำเร็จ (ชนะบอท) จะได้รับ 1 คะแนนทันที.",
          },
        },
      },
      "2": {
        en: "Players lose 1 point when they lose to the bot:",
        th: "ผู้เล่นจะเสีย 1 คะแนนเมื่อแพ้บอท:",
        subRules: {
          "2.1": {
            en: "If the bot successfully lines up 3 'O' symbols (bot wins), the player loses 1 point.",
            th: "ถ้าบอทจัดเรียงเครื่องหมาย 'O' 3 ตัวได้สำเร็จ (บอทชนะ) ผู้เล่นจะเสีย 1 คะแนน.",
          },
        },
      },
      "3": {
        en: "Bonus for winning 3 times in a row:",
        th: "โบนัสเมื่อชนะ 3 ครั้งติดต่อกัน:",
        subRules: {
          "3.1": {
            en: "If the player wins against the bot 3 times in a row, they receive an additional bonus of 1 point.",
            th: "ถ้าผู้เล่นสามารถชนะบอทได้ 3 ครั้งติดต่อกัน จะได้รับโบนัสเพิ่มอีก 1 คะแนน.",
          },
          "3.2": {
            en: "The count for winning 3 times in a row resets each time the player loses to the bot.",
            th: "การนับการชนะ 3 ครั้งติดต่อกันจะถูกรีเซ็ตทุกครั้งที่ผู้เล่นแพ้บอท.",
          },
        },
      },
    },
  },
  GAMEPLAY_STEPS: {
    title: {
      en: "Gameplay Steps:",
      th: "ขั้นตอนการเล่น:",
    },
    steps: {
      "1": {
        en: "Start the game:",
        th: "เริ่มต้นเกม:",
        subSteps: {
          "1.1": {
            en: "Open the OX board with 9 empty squares (3x3).",
            th: "เปิดกระดาน OX ที่มี 9 ช่องว่าง (3x3).",
          },
          "1.2": {
            en: "The player always plays first using the 'X' symbol.",
            th: "ผู้เล่นจะเริ่มเล่นก่อนเสมอ โดยใช้เครื่องหมาย 'X'.",
          },
        },
      },
      "2": {
        en: "Place symbols:",
        th: "วางสัญลักษณ์:",
        subSteps: {
          "2.1": {
            en: "The player chooses one of the empty squares on the board and places their 'X' symbol.",
            th: "ผู้เล่นเลือกช่องว่างใดช่องหนึ่งบนกระดาน แล้ววางเครื่องหมาย 'X'.",
          },
          "2.2": {
            en: "The bot chooses from the remaining empty squares and places its 'O' symbol.",
            th: "บอทจะทำการเลือกช่องว่างที่เหลือและวางเครื่องหมาย 'O'.",
          },
          "2.3": {
            en: "Players and the bot take turns placing their symbols until there is a winner or the board is full.",
            th: "ผู้เล่นและบอทจะผลัดกันวางสัญลักษณ์ จนกว่าจะมีผู้ชนะหรือกระดานเต็ม.",
          },
        },
      },
      "3": {
        en: "Check results:",
        th: "ตรวจสอบผลลัพธ์:",
        subSteps: {
          "3.1": {
            en: "If the player lines up 3 'X' symbols, they win and gain 1 point.",
            th: "หากผู้เล่นจัดเรียงเครื่องหมาย 'X' ได้ 3 ตัวติดต่อกัน ผู้เล่นจะชนะและได้รับ 1 คะแนน.",
          },
          "3.2": {
            en: "If the bot lines up 3 'O' symbols, the player loses and loses 1 point.",
            th: "ถ้าบอทจัดเรียงเครื่องหมาย 'O' ได้ 3 ตัว ผู้เล่นจะแพ้และเสีย 1 คะแนน.",
          },
          "3.3": {
            en: "If there is no winner and the board is full, the game is considered a draw with no score change.",
            th: "หากไม่มีผู้ชนะและกระดานเต็ม ถือว่าเกมเสมอ ไม่มีการเพิ่มหรือลดคะแนน.",
          },
        },
      },
      "4": {
        en: "Count consecutive wins:",
        th: "การนับการชนะติดต่อกัน:",
        subSteps: {
          "4.1": {
            en: "If the player wins against the bot 3 times in a row, they receive a bonus of 1 point.",
            th: "ถ้าผู้เล่นชนะบอท 3 ครั้งติดต่อกัน ผู้เล่นจะได้รับโบนัสเพิ่มอีก 1 คะแนน.",
          },
          "4.2": {
            en: "The count resets if the player loses to the bot or draws.",
            th: "การนับจะถูกรีเซ็ตเมื่อผู้เล่นแพ้บอท หรือเสมอ.",
          },
        },
      },
      "5": {
        en: "End the game:",
        th: "สิ้นสุดเกม:",
        subSteps: {
          "5.1": {
            en: "The game can be played multiple rounds, with scores accumulating based on the above rules.",
            th: "เกมสามารถเล่นซ้ำได้หลายรอบโดยคะแนนจะสะสมต่อเนื่องตามกฎข้างต้น.",
          },
          "5.2": {
            en: "Players can choose to play until they are satisfied or set a target score.",
            th: "ผู้เล่นสามารถเลือกเล่นจนกว่าจะพอใจหรือกำหนดเป้าหมายของคะแนนตามที่ต้องการ.",
          },
        },
      },
    },
  },
  EXAMPLE_SCORING: {
    title: {
      en: "Example of Scoring:",
      th: "ตัวอย่างการคิดคะแนน:",
    },
    example: [
      {
        en: "Win against the bot for the first time → Gain 1 point.",
        th: "ชนะบอทครั้งที่ 1 → ได้ 1 คะแนน.",
      },
      {
        en: "Win against the bot for the second time → Gain 1 point.",
        th: "ชนะบอทครั้งที่ 2 → ได้ 1 คะแนน.",
      },
      {
        en: "Win against the bot for the third time → Gain 1 point + bonus 1 point (total 3 points).",
        th: "ชนะบอทครั้งที่ 3 → ได้ 1 คะแนน + โบนัส 1 คะแนน (รวม 3 คะแนน).",
      },
      {
        en: "Lose against the bot → Lose 1 point (total 2 points).",
        th: "แพ้บอท → เสีย 1 คะแนน (รวม 2 คะแนน).",
      },
      {
        en: "Draw with the bot → No score change (still 2 points).",
        th: "เสมอกับบอท → ไม่มีการเปลี่ยนแปลงคะแนน (ยังคง 2 คะแนน).",
      },
    ],
  },
  NOTE: {
    en: "Note: Players can adjust the scoring and rules as per their preference to make the game more fun.",
    th: "หมายเหตุ: ผู้เล่นสามารถปรับคะแนนและกฎตามความชอบเพื่อทำให้เกมสนุกยิ่งขึ้น.",
  },
};


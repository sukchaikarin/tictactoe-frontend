// utils/formatDate.ts

interface FormattedDateTime {
  date: string;
  time: string;
}

export const formatDate = (date: string | Date, language: 'en' | 'th'): FormattedDateTime => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;

  // กำหนดตัวเลือกสำหรับการจัดรูปแบบวันที่
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: language === 'th' ? 'long' : 'long', // ใช้ชื่อเดือนแบบเต็ม
    day: 'numeric',
    timeZone: 'Asia/Bangkok',
  };

  // ฟอร์แมตวันที่ตามภาษา
  const dateString = parsedDate.toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US', dateOptions);

  // กำหนดตัวเลือกสำหรับการจัดรูปแบบเวลา
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // ใช้รูปแบบ 24 ชั่วโมง
    timeZone: 'Asia/Bangkok',
  };

  // ฟอร์แมตเวลา
  const timeString = parsedDate.toLocaleTimeString(language === 'th' ? 'th-TH' : 'en-US', timeOptions);

  return { date: dateString, time: timeString };
};

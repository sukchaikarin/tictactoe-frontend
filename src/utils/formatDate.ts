// utils/formatDate.ts

interface FormattedDateTime {
    date: string;
    time: string;
  }
  
  export const formatDate = (date: string | Date): FormattedDateTime => {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
  
    // Format the date for the Bangkok timezone (UTC+7)
    const dateString = parsedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',  // Full month name
      day: 'numeric', // Day of the month
      timeZone: 'Asia/Bangkok', // Set timezone to Bangkok (UTC+7)
    });
  
    // Format the time for the Bangkok timezone (UTC+7)
    const timeString = parsedDate.toLocaleTimeString('en-US', {
      hour: '2-digit', // Hour in 2 digits
      minute: '2-digit', // Minutes in 2 digits
      second: '2-digit', // Seconds in 2 digits
      hour12: false,  // Use 24-hour format
      timeZone: 'Asia/Bangkok', // Set timezone to Bangkok (UTC+7)
    });
  
    return { date: dateString, time: timeString };
  };
  
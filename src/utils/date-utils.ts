// form > 오후 07시 03분 or 오후 12시 11분
export function formatToMeridiemTime(date: Date): string {
  let hours: number = date.getHours();
  const minutes: number = date.getMinutes();
  const amPm: string = hours >= 12 ? '오후' : '오전';
  hours = hours % 12 || 12;
  const formattedMinutes = String(minutes).padStart(2, '0'); // 분 2자리로 관리 (05분, 07분 ..)
  return `${amPm} ${hours}:${formattedMinutes}`;
}

// form > 2024년 06월
export function formatToYearMonth(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${year}년 ${month}월`;
}

// form > 2024-06-24
export function formatToDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedMonth = String(month).padStart(2, '0'); // 한 자리 수 월을 두 자리로 변환
  const formattedDay = String(day).padStart(2, '0');
  return `${year}-${formattedMonth}-${formattedDay}`;
}

export function calculateDaysSince(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays; 
}

export const parseTime = (timeStr: string): Date => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setUTCHours(hours - 9, minutes, 0, 0); // UTC 시간 기준으로 설정
  return date;
};

export const convertToTimeString = (date: Date): string => {
  const kstOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
  const kstDate = new Date(date.getTime() + kstOffset); // KST 시간으로 변환
  const hours = kstDate.getUTCHours().toString().padStart(2, '0');
  const minutes = kstDate.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// form > 2024-03-24T07:03:00.000Z 데이터가 들어오면 ['2024-03', '...', '2024-08'] 반환
export const generateMonthArray = (createdDate: string): string[] => {
  const months = [];
  let currentDate = new Date();
  const startDate = new Date(createdDate);

  while (currentDate >= startDate) {
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    months.push(`${year}-${month < 10 ? '0' : ''}${month}`);
    currentDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
  }

  // '2024-09' 추가 (임시)
  months.push('2024-09');
  return months;
};

// form > 2024-03-24T07:03:00.000Z 데이터가 들어오면 ['2023', '2024'] 반환
export const generateYearArray = (createdDate: string): string[] => {
  const years = [];
  const currentDate = new Date();
  const startDate = new Date(createdDate);

  while (currentDate.getFullYear() >= startDate.getFullYear()) {
    const year = currentDate.getFullYear();
    years.push(`${year}`);
    currentDate.setFullYear(currentDate.getFullYear() - 1);
  }

  // '2025' 추가 (임시)
  years.push('2025');

  return years;
};

// form > 2024-08 -> 2024년 08월 / 2024 -> 2024년
export const formatDateString = (input: string): string => {
  const parts = input.split('-');

  if (parts.length === 2) {
    const [year, month] = parts;
    return `${year}년 ${month}월`;
  } else if (parts.length === 1) {
    const [year] = parts;
    return `${year}년`;
  } else {
    return 'Invalid date';
  }
};

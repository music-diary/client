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

// form > 2024-08
export const getFormattedMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${year}-${month}`;
};

// form > 2024-06-24 (한국시간 변환 x)
export function formatToDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedMonth = String(month).padStart(2, '0'); // 한 자리 수 월을 두 자리로 변환
  const formattedDay = String(day).padStart(2, '0');
  return `${year}-${formattedMonth}-${formattedDay}`;
}

// form > 2024-03-24T07:03:00.000Z -> 3월 15일
export const formatMonthDayDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
  });
};

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

// form > 2024-03-24T07:03:00.000Z 데이터가 들어오면 ['2024-08', '...', '2024-03'] 반환
export const generateMonthArray = (createdDate: string): string[] => {
  const months = [];
  let currentDate = new Date();
  const startDate = new Date(createdDate);

  startDate.setDate(1);

  while (currentDate >= startDate) {
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    months.push(`${year}-${month < 10 ? '0' : ''}${month}`);
    currentDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
  }

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

// toISOString()를 한국 시간으로 변환 cf> 2024-07-01T15:00:00.000Z -> 2024-07-02
export const formatKST = (date: Date) => {
  const offset = 1000 * 60 * 60 * 9; // UTC+9
  const koreaDate = new Date(date.getTime() + offset);
  return koreaDate.toISOString().split('T')[0];
};

// cf> 2024-07-02 -> { weekStart: 2024-06-30, weekEnd: 2024-07-06 }
export const cvtDateToWeekStr = (
  date: Date,
): { weekStart: Date; weekEnd: Date } => {
  const weekStart = new Date(date);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // 시작일: 일요일로 설정

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6); // 종료일: 토요일로 설정

  return { weekStart, weekEnd };
};

// cf> 2024-07-02 -> { startDate: 2024-06-25, endDate: 2024-07-01 }
export const moveWeek = (date: Date, type: 'prev' | 'post') => {
  const currentDate = new Date(date);

  if (type === 'prev') {
    currentDate.setDate(currentDate.getDate() - currentDate.getDay() - 7);
  } else if (type === 'post') {
    currentDate.setDate(currentDate.getDate() + (7 - currentDate.getDay()));
  }

  const startDate = new Date(currentDate);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  return { startDate, endDate };
};

// cf> 2024-07-02 -> { startAt: 2024-07-01, endAt: 2024-07-31 }
export const getCurrentMonthRange = (date: Date) => {
  // 해당 달의 첫째 날
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const startAt = formatKST(startOfMonth); // 필요한 시간대 포맷 적용 (KST)

  // 다음 달의 첫째 날에서 하루를 뺀 날짜 (이번 달의 마지막 날)
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const endAt = formatKST(endOfMonth);

  return { startAt, endAt };
};

// '2024년 07월' -> 그 달의 시작과 끝 날짜를 { startAt: '2024-07-01', endAt: '2024-07-31' }로 반환
export const getMonthRangeFromParams = (monthString: string | undefined) => {
  const yearMonthMatch = monthString?.match(/(\d{4})년 (\d{2})월/);

  if (!yearMonthMatch) {
    throw new Error('잘못된 날짜 형식입니다.');
  }

  const year = parseInt(yearMonthMatch[1], 10);
  const month = parseInt(yearMonthMatch[2], 10) - 1;

  const startOfMonth = new Date(year, month, 1);
  const startAt = formatKST(startOfMonth);

  const endOfMonth = new Date(year, month + 1, 0);
  const endAt = formatKST(endOfMonth);

  return { startAt, endAt };
};

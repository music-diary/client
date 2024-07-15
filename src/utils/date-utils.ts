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

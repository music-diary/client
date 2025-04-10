import { COLORS } from '@/constants';

export const colorWithOpacity = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const moods = [
  { value: 'good', color: COLORS.GREEN },
  { value: 'normal', color: COLORS.PURPLE },
  { value: 'bad', color: COLORS.BLUE },
];

// 감정에 따라 색상을 반환하는 함수
export function getColorForMood(mood: string) {
  const moodEntry = moods.find((entry) => entry.value === mood);
  return moodEntry ? moodEntry.color : COLORS.BLACK;
}

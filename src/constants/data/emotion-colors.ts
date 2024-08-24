import { COLORS } from '..';

export const emotionColor: Record<string, string> = {
  good: COLORS.GREEN,
  normal: COLORS.PURPLE,
  bad: COLORS.BLUE,
};

export const emotionBackgroundColor: Record<string, string> = {
  good: COLORS.PURPLE,
  normal: COLORS.GREEN,
  bad: COLORS.PURPLE,
};

export const emotionHomeText: Record<string, string> = {
  good: '긍정적인',
  normal: '괜찮은',
  bad: '부정적인',
};

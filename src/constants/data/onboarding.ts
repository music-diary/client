import { type AnimationObject } from 'lottie-react-native';

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  title: string;
  description: string;
  textColor: string;
  backgroundColor: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: require('../../assets/animations/Lottie1.json'),
    title: 'Feel',
    description: '오늘 하루 느낀 감정을 적어보세요.',
    textColor: '#005b4f',
    backgroundColor: '#ffa3ce',
  },
  {
    id: 2,
    animation: require('../../assets//animations/Lottie2.json'),
    title: 'Discover',
    description: '오늘 감정과 딱 맞는 음악을 발견해 보세요.',
    textColor: '#1e2169',
    backgroundColor: '#bae4fd',
  },
  {
    id: 3,
    animation: require('../../assets//animations/Lottie3.json'),
    title: 'Record',
    description: `나의 감정을 카드 형태로 기록해 보세요.`,
    textColor: '#F15937',
    backgroundColor: '#faeb8a',
  },
];

export default data;

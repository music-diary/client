import { type ITemplate } from '@/models/interfaces';

export const templates: ITemplate[] = [
  {
    name: 'SCS 회고',
    description: '더 강하고 단단한 나로 발전하고 싶을 때',
    type: 'SCS',
    preview: {
      Stop: '멈추고 싶은 것',
      Continue: '이어나갈 것',
      Start: '새롭게 시작하고 싶은 것',
    },
    height: 228,
  },
  {
    name: 'KPT 회고',
    description: '사실에 기반해 더 나은 나로 발전하고 싶을 때',
    type: 'KPT',
    preview: {
      Keep: '유지할 것',
      Problem: '해결해야 할 것',
      Try: '시도해볼 것',
    },
    height: 228,
  },
  {
    name: '5F 회고',
    description: '거침없이 감정에 솔직하고 싶을 때',
    type: '5F',
    preview: {
      Fact: '사실',
      Feeling: '느낌',
      Finding: '인사이트',
      'Future Action': '향후계획',
      Feedback: '피드백',
    },
    height: 296,
  },
  {
    name: '4L 회고',
    description: '내면의 열망을 이끌어 내고 싶을 때',
    type: '4L',
    preview: {
      Loved: '사랑하는 것',
      Learned: '배웠던 것',
      Lacked: '부족했던 것',
      'Longed for': '열망하는 것',
    },
    height: 290,
  },
  {
    name: 'Mad, Sad, Glad',
    description: '사실과 감정을 균형있게 담는 일기를 쓰고 싶을 때',
    type: 'MSG',
    preview: { Mad: '화남', Sad: '슬픔', Glad: '기쁨' },
    height: 228,
  },
];

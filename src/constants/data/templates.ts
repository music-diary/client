import { type ITemplate } from '@/models/interfaces';

export const templates: ITemplate[] = [
  {
    id: '1',
    name: 'SCS 회고',
    description: '더 강하고 단단한 나로 발전하고 싶을 때',
    type: 'SCS',
    templateContent: {
      Stop: '멈추고 싶은 것',
      Continue: '이어나갈 것',
      Start: '새롭게 시작하고 싶은 것',
    },
  },
  {
    id: '2',
    name: 'KPT 회고',
    description: '사실에 기반해 더 나은 나로 발전하고 싶을 때',
    type: 'KPT',
    templateContent: {
      Keep: '유지할 것',
      Problem: '해결해야 할 것',
      Try: '시도해볼 것',
    },
  },
  {
    id: '3',
    name: '5F 회고',
    description: '거침없이 감정에 솔직하고 싶을 때',
    type: '5F',
    templateContent: {
      Fact: '사실',
      Feeling: '느낌',
      Finding: '인사이트',
      'Future Action': '향후계획',
      Feedback: '피드백',
    },
  },
  {
    id: '4',
    name: '4L 회고',
    description: '내면의 열망을 이끌어 내고 싶을 때',
    type: '4L',
    templateContent: {
      Loved: '사랑하는 것',
      Learned: '배웠던 것',
      Lacked: '부족했던 것',
      'Longed for': '열망하는 것',
    },
  },
  {
    id: '5',
    name: 'Mad, Sad, Glad',
    description: '사실과 감정을 균형있게 담는 일기를 쓰고 싶을 때',
    type: 'MSG',
    templateContent: { Mad: '화남', Sad: '슬픔', Glad: '기쁨' },
  },
];

const dd = [
  {
    id: '6d6616d7-767c-4e57-91d2-b8d5b2cfc3b3',
    name: 'SCS 회고',
    description: '더 강하고 단단한 나로 발전하고 싶을 때',
    type: 'SCS',
    templateContent: {
      stop: '멈추고 싶은 것',
      start: '새롭게 시작하고 싶은 것',
      continue: '이어나갈 것',
    },
  },
  {
    id: '8a26a321-4109-4cca-bdae-81f7454f21c0',
    name: 'KPT 회고',
    description: '사실에 기반해 더 나은 나로 발전하고 싶을 때',
    type: 'KPT',
    templateContent: {
      try: '시도해볼 것',
      keep: '유지할 것',
      problem: '해결해야 할 것',
    },
  },
  {
    id: '2bcd4d28-43fd-4b90-882d-ea42c62dddee',
    name: 'MSG 회고',
    description: '거침없이 감정에 솔직하고 싶을 때',
    type: 'MSG',
    templateContent: {
      mad: '멈추고 싶은 것',
      sad: '이어나갈 것',
      good: '새롭게 시작하고 싶은 것',
    },
  },
  {
    id: '639add6a-8d0e-462c-b8b5-dd77725571dd',
    name: '4L 회고',
    description: '내면의 열망을 이끌어 내고 싶을 때',
    type: 'FOURL',
    templateContent: {
      loved: '사랑하는 것',
      lacked: '부족했던 것',
      learned: '배웠던 것',
      'longed-for': '열망하는 것',
    },
  },
  {
    id: '21e0e3d3-f071-4ba8-9a35-45fc0df85fca',
    name: '5F 회고',
    description: '사실과 감정을 균형있게 담긴 일기를 쓰고 싶을 때',
    type: 'FIVEF',
    templateContent: {
      fact: '사실',
      feeling: '느낌',
      finding: '인사이트',
      feedback: '피드백',
      'future-action': '향후 계획',
    },
  },
];

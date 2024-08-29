import { type SvgProps } from 'react-native-svg';
import { type SplashKey } from '@/models/types';
import {
  AlarmSvg,
  ArchiveCheerSvg,
  ArchiveIdeaSvg,
  ArchiveSaveSvg,
  MusicLoadingGood1Svg,
  MusicLoadingGood2Svg,
  MusicLoadingNormal1Svg,
  MusicLoadingNormal2Svg,
  MusicLoadingNormal3Svg,
  MusicLoadingBad1Svg,
  MusicLoadingBad2Svg,
  MusicLoadingBad3Svg,
} from 'assets/images/splash';

export interface SplashOption {
  svg: React.FC<SvgProps>; // Type for SVG components
  description: string;
}

export const splashOptions: Record<SplashKey, SplashOption> = {
  cheer: {
    svg: ArchiveCheerSvg,
    description: '당신의 하루를 뮤다가 응원해요',
  },
  save: {
    svg: ArchiveSaveSvg,
    description: '오늘의 ost가 뮤다에 소중히 담겼어요',
  },
  idea: {
    svg: ArchiveIdeaSvg,
    description: `이 노래가 떠오를 때면\n언제든지 놀러오세요!`,
  },
  alarm: {
    svg: AlarmSvg,
    description: '잊지 않고 뮤다 알림을 보내드릴게요',
  },
  good1: {
    svg: MusicLoadingGood1Svg,
    description: '빛나는 오늘의 음악을\n오래오래 간직하길 바라요!',
  },
  good2: {
    svg: MusicLoadingGood2Svg,
    description: '빛나는 오늘을 뮤다와 기억해줘서 고마워요',
  },
  good3: {
    svg: ArchiveCheerSvg,
    description: '오늘의 음악이 당신의 하루를\n더욱 반짝이게 만들거에요',
  },
  normal1: {
    svg: MusicLoadingNormal1Svg,
    description: '평범한 순간들이 모여 진짜 행복을 만들죠',
  },
  normal2: {
    svg: MusicLoadingNormal2Svg,
    description: '잔잔한 오늘 하루같은 음악을 선물할게요',
  },
  normal3: {
    svg: MusicLoadingNormal3Svg,
    description: '소소한 일상에도 음악이 있으면 특별해질걸요?',
  },
  bad1: {
    svg: MusicLoadingBad1Svg,
    description: '지친 당신에게 노래를 선물할게요',
  },
  bad2: {
    svg: MusicLoadingBad2Svg,
    description: '당신을 위로하는 음악 선물을 보내드려요',
  },
  bad3: {
    svg: MusicLoadingBad3Svg,
    description: '때로는 감정을 온전히\n마주하는 것도 도움이 돼요',
  },
} as const;

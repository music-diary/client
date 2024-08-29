import {
  AlarmSvg,
  ArchiveCheerSvg,
  ArchiveIdeaSvg,
  ArchiveSaveSvg,
  StandByGood3,
} from 'assets/images/splash';

export const splashOptions = {
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
    toastMessage: '일기 알림이 설정되었습니다',
  },
  standBy3: {
    svg: StandByGood3,
    description: '오늘의 음악이 당신의 하루를\n더욱 반짝이게 만들거예요',
  },
} as const;

import { type IMusic, type IEmotion } from './diary';

export interface IArchiveEmotion {
  id: string;
  name: string;
  label: string;
  parentId: string | null;
  parent: IEmotion | null;
  level: number;
  order: number;
  rootId?: string | null;
  aiScale?: string | null;
}

export interface IArchiveMusic {
  id: string;
  songId: string;
  title: string;
  artist: string;
  albumUrl: string;
  selectedLyric: string | null;
  lyric: string;
  originalGenre: string;
  selected: boolean;
  youtubeUrl: string | null;
  editorPick: string | null;
  userId: string;
  diaryId: string;
  createdAt: string;
  updatedAt: string;
  diary: {
    emotions: IMusic | IArchiveMusic;
  } | null;
}

export interface ISummaryMusic {
  id?: string;
  songId: string;
  title: string;
  artist: string;
  albumUrl: string;
  selected?: boolean;
}

export interface IMusicSummaryEntry {
  id: string;
  month: string;
  mood: string;
  albumCoverUrl: string;
  songTitle: string;
  artist: string;
  diaryEntries: number;
}

export interface IArchiveMusicRecommendation {
  albumCoverUrl: string;
  songTitle: string;
  artist: string;
  emotionName: string;
}

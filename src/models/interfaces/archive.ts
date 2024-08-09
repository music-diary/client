export interface IArchiveEmotion {
  id: string;
  name: string;
  label: string;
  parentId: string | null;
  rootId: string | null;
  level: number;
  order: number;
  aiScale: string | null;
  parent: IArchiveEmotion | null;
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
    emotions: Array<{ emotions: { parent: IArchiveEmotion } }>;
  } | null;
}

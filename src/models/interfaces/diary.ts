import { type Template } from '../types';

export interface ITopic {
  id: string;
  label: string;
  emoji: string;
  name: string;
}

export interface IGenre {
  id: string;
  label?: string;
  name: string;
  color?: string;
}

export interface IEmotion {
  id: string;
  name: string;
  label: string;
  parentId: string;
  parent: IEmotion;
  level: number;
  order: number;
}

export interface ITemplate {
  id: string;
  name: string;
  description: string;
  type: Template;
  order: number;
  isExample: boolean;
  templateContents: ITemplateContent[];
}

export interface ITemplateContent {
  id: string;
  templateId: string;
  content: string | null;
  order: number;
  name: string;
  label: string;
}

export interface IMusic {
  id: string;
  title: string;
  artist: string;
  albumUrl: string;
  selectedLyric: string;
  lyric: string;
  selected: boolean;
  youtubeUrl: string;
  editorPick: string;
}

export interface IDiary {
  title: string;
  status: 'EDIT' | 'DONE';
  topics: Array<{ id: string }>;
  emotions: IEmotion[];
  templates?: ITemplate | null;
  musics?: IMusic[];
  content?: string | null;
}


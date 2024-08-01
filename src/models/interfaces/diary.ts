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
  level: number;
  order: number;
}

export interface ITemplate {
  id: string;
  name: string;
  description: string;
  type: Template;
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
  selectedLyric: number | null;
  lyric: string;
  selected: boolean;
  youtubeUrl: string;
  editorPick: boolean | null;
}

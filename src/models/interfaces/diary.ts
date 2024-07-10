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

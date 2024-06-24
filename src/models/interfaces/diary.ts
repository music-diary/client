import { type Template } from '../types';

export interface ITopic {
  id: string;
  emoji: string;
  name: string;
}

export interface IGenre {
  name: string;
}

export interface ITemplate {
  name: string;
  description: string;
  type: Template;
  preview: Record<string, string>;
  height: number;
}

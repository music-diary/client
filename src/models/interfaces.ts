import { type Template, type Gender, type Role, type Status } from './types';

export interface IUser {
  id: string;
  phoneNumber: string;
  name: string;
  birthDay: string;
  gender: Gender;
  isGenreSuggested: boolean;
  isAgreedMarketing: boolean;
  profileImageKey: string | null;
  profileImageUrl: string | null;
  useLimitCount: number;
  role: Role;
  status: Status;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
}

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

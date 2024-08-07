import {
  type IUserGenre,
  type IGenre,
  type IStatisticEmotion,
  type IStatisticTopic,
  type IDiaryYear,
} from './interfaces';
import { type Status, type Gender, type Role } from './types';

export interface VerifyPhoneSchema {
  phoneNumber: string;
  code: string;
}

export interface SignUpSchema {
  phoneNumber: string;
  name: string;
  birthDay: Date | null;
  gender: Gender;
  genres: IGenre[];
  isGenreSuggested: boolean;
  isAgreedMarketing: boolean;
}

export interface PathDiarySchema {
  id: string;
  payload: Record<string, any>;
}

export interface UserSchema {
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
  IsAgreedDiaryAlarm: boolean;
  diaryAlarmTime: string;
  role: Role;
  status: Status;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  genre: IUserGenre[];
}

export interface UserPayloadSchema {
  name: string;
  birthDay: string;
  gender: Gender;
  isGenreSuggested: boolean;
  isAgreedMarketing: boolean;
  IsAgreedDiaryAlarm: boolean;
  diaryAlarmTime: string;
  genres: Array<{ id: string }>;
}

export interface PathUserSchema {
  id: string;
  payload: UserPayloadSchema;
}

export interface MonthlyStatisticsSchema {
  date: string;
  diaryCount: number;
  emotions: IStatisticEmotion[];
  genreCounts: Array<{ genre: string; count: number }>;
  topics: IStatisticTopic[];
}

export interface YearlyStatisticsSchema {
  year: string;
  diaries: IDiaryYear[];
  emotions: IStatisticEmotion[];
  genreCounts: Array<{ genre: string; count: number }>;
  topics: IStatisticTopic[];
}

export interface ContactTypeSchema {
  id: string;
  name: string;
  label: string;
  order: number;
}

export interface ContactPayloadSchema {
  senderEmail: string;
  contactTypeId: string;
  message: string;
}

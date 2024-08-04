import {
  type IGenre,
  type IUserGenre,
  type IStatisticEmotion,
  type IStatisticTopic,
  type IDiaryYear,
} from './interfaces';
import { type IDiary, type IEmotion } from './interfaces/diary';
import { type Gender, type Role, type Status } from './types';

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

export interface PatchDiarySchema {
  id: string;
  payload: Partial<IDiary>;
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

export interface UserPayload {
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
  payload: UserPayload;
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

export interface DiaryResponseSchema extends Omit<IDiary, 'emotions'> {
  emotions: Array<{
    emotions: IEmotion;
    parent?: IEmotion | null; // 상위 감정 객체
    parentId?: string | null; // 상위 감정의 ID
    rootId?: string; // 최상위 감정의 ID
  }>;
}

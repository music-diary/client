import {
  type IGenre,
  type IUserGenre,
  type IStatisticEmotion,
  type IStatisticTopic,
  type IDiaryYear,
  type IArchiveMusic,
  type ISummaryMusic,
} from './interfaces';
import {
  type IMusic,
  type IDiary,
  type IEmotion,
  type ITopic,
} from './interfaces/diary';
import { type Gender, type Role, type Status } from './types';

export interface VerifyPhoneSchema {
  phoneNumber: string;
  code: string;
}

export interface SignUpSchema {
  name: string;
  birthDay: Date | null;
  gender: Gender;
  genres: IGenre[];
  isGenreSuggested: boolean;
  isAgreedMarketing: boolean;
  oauthUserId: string;
}

export interface PatchDiarySchema {
  id: string;
  payload: Partial<Omit<IDiary, 'musics'> & { music?: IMusic }>;
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

export interface EmotionNode {
  emotions: IEmotion;
}

export interface DiaryResponseSchema extends Omit<IDiary, 'emotions'> {
  emotions: EmotionNode[];
}

export interface WithdrawalPayloadSchema {
  withdrawalReasonsId: string;
  content: string;
}
export interface PathWithdrawalSchema {
  id: string;
  payload: WithdrawalPayloadSchema;
}

export interface MusicRecommendationSchema {
  musics: IArchiveMusic[];
  count: number;
  emotion: IEmotion;
}

export interface MusicRecommendationCalendarSchema {
  musics: IArchiveMusic[];
}

export interface DiaryListArchiveSchema {
  id: string;
  userId: string;
  title: string;
  content: string;
  templateId: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface MusicArchiveSummarySchema {
  date: string;
  music: ISummaryMusic | null;
  count: number;
  emotion: { parent: IEmotion | null } | null;
}

export interface DiaryMonthArchiveSchema {
  id: string;
  userId: string;
  title: string;
  content: string;
  templateId: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: { id: string };
  emotions: Array<{ emotions: IEmotion }>;
  topics: Array<{ topic: ITopic }>;
  musics: ISummaryMusic[];
}

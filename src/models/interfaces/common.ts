import { type Gender, type Role, type Status } from '../types';

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

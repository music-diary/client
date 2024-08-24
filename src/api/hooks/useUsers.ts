import { useMutation, useQuery } from '@tanstack/react-query';
import {
  type PathUserSchema,
  type UserSchema,
  type YearlyStatisticsSchema,
  type MonthlyStatisticsSchema,
  type ContactTypeSchema,
  type ContactPayloadSchema,
  type PathWithdrawalSchema,
} from '@/models/schemas';
import { API_ENDPOINTS } from '@/api/endpoints';
import apiClient from '../client';

const USERS = API_ENDPOINTS.USERS;

// const delay = async (ms: number) =>
//   await new Promise((resolve) => setTimeout(resolve, ms));

const getUser = async () => {
  const { data } = await apiClient.get(API_ENDPOINTS.USERS.SELF);
  console.log('getUser data ::: ', data);
  return data;
};

export const useGetUser = () => {
  return useMutation({ mutationFn: getUser });
};

// 유저 정보 가져오기
const getUserInfo = async (): Promise<UserSchema> => {
  const { data } = await apiClient.get(API_ENDPOINTS.USERS.INFO);
  return data.user;
};

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    initialData: {} as UserSchema,
  });
};

// 유저 생성일 가져오기
export const useUserCreatedInfo = () => {
  return useGetUserInfo().data?.createdAt;
};

// 유저 이름 가져오기
export const useUserName = () => {
  return useGetUserInfo().data?.name;
};

// 유저 아이디 가져오기
export const useUserId = () => {
  return useGetUserInfo().data?.id;
};

// 유저 정보 수정하기
const patchUser = async ({ id, payload }: PathUserSchema) => {
  const { data } = await apiClient.patch(
    USERS.UPDATE.replace(':id', id),
    payload,
  );
  return data;
};

export const usePatchUser = (options = {}) => {
  return useMutation({
    mutationFn: patchUser,
    onSuccess: (data) => {
      console.log('Update successful:', data);
    },
    onError: (error) => {
      console.log('Update failed:', error);
    },
    ...options,
  });
};

// 월간 통계 데이터 가져오기
const getMonthlyStatistics = async (
  month: string,
): Promise<MonthlyStatisticsSchema> => {
  const url = API_ENDPOINTS.USERS.STATISTICS.MONTH.replace(':value', month);
  const { data } = await apiClient.get(url);
  // await delay(3000);
  return data.data;
};

// 연간 통계 데이터 가져오기
const getYearlyStatistics = async (
  year: string,
): Promise<YearlyStatisticsSchema> => {
  const url = API_ENDPOINTS.USERS.STATISTICS.YEAR.replace(':value', year);
  const { data } = await apiClient.get(url);
  return data.data;
};

export const useGetMonthlyStatistics = (month: string) => {
  return useQuery({
    queryKey: ['monthlyStatistics', month],
    queryFn: async () => await getMonthlyStatistics(month),
    placeholderData: {
      date: '',
      diaryCount: -1,
      emotions: [],
      genreCounts: [],
      topics: [],
    },
  });
};

export const useGetYearlyStatistics = (year: string) => {
  return useQuery({
    queryKey: ['yearlyStatistics', year],
    queryFn: async () => await getYearlyStatistics(year),
    placeholderData: {
      year: '',
      diaries: [
        {
          year: '',
          count: 0,
          months: [],
        },
      ],
      emotions: [],
      genreCounts: [],
      topics: [],
    },
  });
};

// 문의 유형 조회
const getContactTypes = async (): Promise<ContactTypeSchema[]> => {
  const { data } = await apiClient.get(USERS.CONTACT);
  return data.contactTypes;
};

export const useGetContactTypes = () => {
  return useQuery({
    queryKey: ['contactTypes'],
    queryFn: getContactTypes,
    placeholderData: [],
  });
};

// 문의 유형 post
const sendInquiry = async (payload: ContactPayloadSchema) => {
  const { data } = await apiClient.post(USERS.CONTACT, payload);
  return data;
};

export const useSendInquiry = (options = {}) => {
  return useMutation({
    mutationFn: sendInquiry,
    onError: (error) => {
      console.log('Send Inquiry error:', error);
    },
    ...options,
  });
};

// 회원 탈퇴 목록 get
const getWithdrawalList = async () => {
  const { data } = await apiClient.get(USERS.WITHDRAWAL_LIST);
  return data.withdrawalReasons;
};

export const useGetWithdrawalList = () => {
  return useQuery({
    queryKey: ['withdrawalList'],
    queryFn: getWithdrawalList,
    placeholderData: [],
  });
};

// 회원 탈퇴 post
const withdrawal = async ({ id, payload }: PathWithdrawalSchema) => {
  const { data } = await apiClient.post(
    USERS.WITHDRAWAL.replace(':id', id),
    payload,
  );
  return data;
};

export const useWithdrawal = (options = {}) => {
  return useMutation({
    mutationFn: withdrawal,
    onError: (error) => {
      console.log('Withdrawal failed:', error);
    },
    ...options,
  });
};

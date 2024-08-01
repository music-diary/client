import { useMutation, useQuery } from '@tanstack/react-query';
import {
  type IMusic,
  type IEmotion,
  type ITemplate,
  type ITopic,
} from '@/models/interfaces';
import { type PathDiarySchema } from '@/models/schemas';
import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';

const DIARIES = API_ENDPOINTS.DIARIES;

export const createDiary = async (): Promise<string> => {
  const payload = { status: 'EDIT' };
  const { data } = await apiClient.post(DIARIES.CREATE, payload);
  return data.diaryId;
};

const patchDiary = async ({ id, payload }: PathDiarySchema) => {
  const { data } = await apiClient.patch(
    DIARIES.ID.replace(':id', id),
    payload,
  );
  return data;
};

const getAllEmotions = async (): Promise<IEmotion[]> => {
  const { data } = await apiClient.get(DIARIES.EMOTIONS);
  return data.emotions;
};

const getTopics = async (): Promise<ITopic[]> => {
  const { data } = await apiClient.get(DIARIES.TOPICS);
  return data.topics;
};

const getTemplates = async (): Promise<ITemplate[]> => {
  const { data } = await apiClient.get(DIARIES.TEMPLATES);
  return data.templates;
};

const getMusicRecommendation = async (diaryId: string): Promise<IMusic[]> => {
  const { data } = await apiClient.get(DIARIES.MUSIC.replace(':id', diaryId));
  return data.data;
};

export const usePatchDiary = (options = {}) => {
  return useMutation({
    mutationFn: patchDiary,
    ...options,
  });
};

const useAllEmotions = (select: (data: IEmotion[]) => IEmotion[]) => {
  return useQuery({
    queryKey: ['emotions'],
    queryFn: getAllEmotions,
    select,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useMoods = () => {
  return useAllEmotions((data: IEmotion[]) =>
    data.filter((emotion) => emotion.level === 0),
  );
};

export const useEmotions = () => {
  return useAllEmotions((data: IEmotion[]) =>
    data.filter((emotion) => emotion.level === 1),
  );
};

export const useDetailedEmotions = () => {
  return useAllEmotions((data: IEmotion[]) =>
    data.filter((emotion) => emotion.level === 2),
  );
};

export const useTopics = () => {
  return useQuery({
    queryKey: ['topics'],
    queryFn: getTopics,
    initialData: [],
  });
};

export const useTemplates = () => {
  return useQuery({
    queryKey: ['templates'],
    queryFn: getTemplates,
    initialData: [],
  });
};

export const useMusicRecommendation = (diaryId: string) => {
  return useQuery({
    queryKey: ['music', diaryId],
    queryFn: async () => await getMusicRecommendation(diaryId),
    initialData: [],
  });
};

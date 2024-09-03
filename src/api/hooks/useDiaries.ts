import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  type IEmotion,
  type ITemplate,
  type ITopic,
  type IMusic,
} from '@/models/interfaces';
import {
  type DiaryResponseSchema,
  type PatchDiarySchema,
} from '@/models/schemas';
import { type DiaryStatus } from '@/models/types';
import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';

const DIARIES = API_ENDPOINTS.DIARIES;

const createDiary = async (): Promise<string> => {
  const payload = { status: 'EDIT' };
  const { data } = await apiClient.post(DIARIES.CREATE, payload);
  return data.diaryId;
};

const patchDiary = async ({ id, payload }: PatchDiarySchema) => {
  const { data } = await apiClient.patch(
    DIARIES.ID.replace(':id', id),
    payload,
  );
  return data;
};

const deleteDiary = async (id: string) => {
  const { data } = await apiClient.delete(DIARIES.ID.replace(':id', id));
  return data;
};

const getDiary = async (id: string): Promise<DiaryResponseSchema> => {
  const { data } = await apiClient.get(DIARIES.ID.replace(':id', id));
  return data.diary;
};

const getAllDiaries = async (status: DiaryStatus) => {
  const endpoint = DIARIES.ME.replace(':status', status);
  const { data } = await apiClient.get(endpoint);
  return data.diaries;
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

export const useDeleteDiary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDiary,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: ['diary', id] });
    },
  });
};

export const useCreateDiary = (options = {}) => {
  return useMutation({
    mutationFn: createDiary,
    ...options,
  });
};

export const useDiary = (id: string) => {
  return useQuery({
    queryKey: ['diary', id],
    queryFn: async () => await getDiary(id),
    initialData: {} as DiaryResponseSchema,
  });
};

export const useAllDiaries = (status: DiaryStatus) => {
  return useQuery({
    queryKey: ['diaries', status],
    queryFn: async () => await getAllDiaries(status),
    initialData: [],
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

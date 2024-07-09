import { useQuery } from '@tanstack/react-query';
import {
  type IEmotion,
  type ITemplate,
  type ITopic,
} from '@/models/interfaces';
import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';

const DIARIES = API_ENDPOINTS.DIARIES;

// const fetchDiaries = async () => {
//   const { data } = await apiClient.get(DIARIES.ALL);
//   return data;
// };

// const fetchDiary = async (id: string) => {
//   const { data } = await apiClient.get(DIARIES.ID.replace(':id', id));
//   return data;
// };

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

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';
import {
  type MusicArchiveSummarySchema,
  type DiaryListArchiveSchema,
  type MusicRecommendationSchema,
  type DiaryMonthArchiveSchema,
} from '@/models/schemas';

const getMusicArchive = async (
  startAt: string,
  endAt: string,
  group: string,
): Promise<MusicRecommendationSchema> => {
  const endpoint = API_ENDPOINTS.ARCHIVES.MUSIC_ARCHIVE.replace(
    ':startAt',
    startAt,
  )
    .replace(':endAt', endAt)
    .replace(':group', group);
  // 3초 지연

  const { data } = await apiClient.get(endpoint);
  return data.data;
};

export const useMusicArchive = (
  startAt: string,
  endAt: string,
  group: string,
) => {
  return useQuery({
    queryKey: ['archive', 'musicArchive', startAt, endAt, group],
    queryFn: async () => await getMusicArchive(startAt, endAt, group),
  });
};

// diary archive
const getDiaryArchive = async (
  startAt: string,
  endAt: string,
): Promise<DiaryListArchiveSchema[]> => {
  const endpoint = API_ENDPOINTS.ARCHIVES.DIARY_ARCHIVE.replace(
    ':start',
    startAt,
  ).replace(':end', endAt);
  const { data } = await apiClient.get(endpoint);

  return data.diaries;
};

export const useDiaryArchive = (startAt: string, endAt: string) => {
  return useQuery({
    queryKey: ['archive', 'diaryArchive', startAt, endAt],
    queryFn: async () => await getDiaryArchive(startAt, endAt),
    initialData: [],
  });
};

// summary archive
const getMusicSummaryArchive = async (): Promise<
  MusicArchiveSummarySchema[]
> => {
  const endpoint = API_ENDPOINTS.ARCHIVES.SUMMARY;
  const { data } = await apiClient.get(endpoint);

  return data.summary;
};

export const useMusicArchiveSummary = () => {
  return useQuery({
    queryKey: ['archive', 'summaryArchive'],
    queryFn: async () => await getMusicSummaryArchive(),
  });
};

const getDiaryMonthlyArchive = async (
  startAt: string,
  endAt: string,
  group: string,
): Promise<DiaryMonthArchiveSchema[]> => {
  const endpoint = API_ENDPOINTS.ARCHIVES.DIARY_MONTHLY_ARCHIVE.replace(
    ':startAt',
    startAt,
  )
    .replace(':endAt', endAt)
    .replace(':group', group);
  const { data } = await apiClient.get(endpoint);

  return data.diaries;
};

export const useDiaryMonthlyArchive = (
  startAt: string,
  endAt: string,
  group: string,
) => {
  return useQuery({
    queryKey: ['archive', 'diaryMonthlyArchive', startAt, endAt, group],
    queryFn: async () => await getDiaryMonthlyArchive(startAt, endAt, group),
  });
};

const deleteDiary = async (diaryId: string): Promise<void> => {
  const endpoint = API_ENDPOINTS.DIARIES.ID.replace(':id', diaryId);
  await apiClient.delete(endpoint);
};

export const useDeleteDiary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (diaryId: string) => await deleteDiary(diaryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archive'] });
    },
  });
};

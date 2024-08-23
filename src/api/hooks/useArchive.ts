import { useQuery } from '@tanstack/react-query';
import apiClient from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';
import {
  type MusicArchiveSummarySchema,
  type DiaryListArchiveSchema,
  type MusicRecommendationSchema,
} from '@/models/schemas';

// const delay = async (ms: number) =>
//   await new Promise((resolve) => setTimeout(resolve, ms));

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
  // await delay(3000);
  const { data } = await apiClient.get(endpoint);
  return data.data;
};

export const useMusicArchive = (
  startAt: string,
  endAt: string,
  group: string,
) => {
  return useQuery({
    queryKey: ['musicArchive', startAt, endAt, group],
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
    queryKey: ['diaryArchive', startAt, endAt],
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
    queryKey: ['summaryArchive'],
    queryFn: async () => await getMusicSummaryArchive(),
  });
};

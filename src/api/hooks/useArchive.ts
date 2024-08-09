import { useQuery } from '@tanstack/react-query';
import apiClient from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';
import { type MusicRecommendationSchema } from '@/models/schemas';

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
  // await new Promise((resolve) => setTimeout(resolve, 3000));
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

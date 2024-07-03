import { useQuery } from '@tanstack/react-query';
import { type IGenre } from '@/models/interfaces';
import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';

const getGenres = async (): Promise<IGenre[]> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GENRES);
  return data.genres;
};
export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });
};

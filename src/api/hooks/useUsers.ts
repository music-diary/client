import { useMutation } from '@tanstack/react-query';
import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';

const getUser = async () => {
  const { data } = await apiClient.get(API_ENDPOINTS.USERS.SELF);
  console.log('getUser data ::: ', data);
  return data;
};

export const useGetUser = () => {
  return useMutation({ mutationFn: getUser });
};

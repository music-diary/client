import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { type PathUserSchema, type UserSchema } from '@/models/schemas';
import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';

const USERS = API_ENDPOINTS.USERS;

const getUser = async () => {
  const { data } = await apiClient.get(API_ENDPOINTS.USERS.SELF);
  console.log('getUser data ::: ', data);
  return data;
};

export const useGetUser = () => {
  return useMutation({ mutationFn: getUser });
};

const getUserInfo = async (): Promise<UserSchema> => {
  const { data } = await apiClient.get(API_ENDPOINTS.USERS.INFO);
  return data.user;
};

export const useGetUserInfo = () => {
  return useSuspenseQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });
};

export const useUserCreatedInfo = () => {
  return useGetUserInfo().data.createdAt;
};

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

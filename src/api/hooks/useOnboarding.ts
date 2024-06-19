import { useMutation } from '@tanstack/react-query';
import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';

const signUp = async (userData: any) => {
  const { data } = await apiClient.post(
    API_ENDPOINTS.ONBOARDING.SIGN_UP,
    userData,
  );
  return data;
};

const login = async (credentials: any) => {
  const { data } = await apiClient.post(
    API_ENDPOINTS.ONBOARDING.LOGIN,
    credentials,
  );
  return data;
};

const requestPhoneVerification = async (phoneNumber: string) => {
  const { data } = await apiClient.post(API_ENDPOINTS.ONBOARDING.PHONE, {
    phoneNumber,
  });
  return data;
};

const verifyPhone = async (verificationData: any) => {
  const { data } = await apiClient.post(
    API_ENDPOINTS.ONBOARDING.PHONE_VERIFICATION,
    verificationData,
  );
  return data;
};

export const useSignUp = () => {
  return useMutation({ mutationFn: signUp });
};

export const useLogin = () => {
  return useMutation({ mutationFn: login });
};

export const useRequestPhoneVerification = () => {
  return useMutation({ mutationFn: requestPhoneVerification });
};

export const useVerifyPhone = () => {
  return useMutation({ mutationFn: verifyPhone });
};

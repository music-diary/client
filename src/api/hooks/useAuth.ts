import { useMutation } from '@tanstack/react-query';
import { extractToken } from '@/utils/commonUtils';
import { useAppStore } from '@/store/useAppStore';
import { type VerifyPhoneSchema, type SignUpSchema } from '@/models/schemas';
import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';

const AUTH = API_ENDPOINTS.AUTH;

const requestPhoneVerification = async (phoneNumber: string) => {
  const { data } = await apiClient.post(AUTH.PHONE, {
    phoneNumber,
  });
  return data;
};

const verifyPhone = async (verificationData: VerifyPhoneSchema) => {
  const { data } = await apiClient.post(
    AUTH.PHONE_VERIFICATION,
    verificationData,
  );
  return data;
};

const signUp = async (userData: SignUpSchema) => {
  try {
    const { headers, data } = await apiClient.post(AUTH.SIGN_UP, userData);

    const authorizationHeader = headers.authorization as string | undefined;
    const token = extractToken(authorizationHeader);

    if (token) {
      useAppStore.getState().login(token);
    } else {
      console.error('Invalid Authorization header format');
    }

    return data;
  } catch (error) {
    console.error('SignUp error:', error);
    throw error;
  }
};

export const useRequestPhoneVerification = () => {
  return useMutation({ mutationFn: requestPhoneVerification });
};

export const useVerifyPhone = () => {
  return useMutation({ mutationFn: verifyPhone });
};

export const useSignUp = () => {
  return useMutation({ mutationFn: signUp });
};

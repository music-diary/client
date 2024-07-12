import { useMutation } from '@tanstack/react-query';
import { type SignUpSchema, type VerifyPhoneSchema } from '@/models/schemas';
import { handleLogin } from '@/utils/auth-utils';
import { handleError } from '@/utils/common-utils';
import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';

const AUTH = API_ENDPOINTS.AUTH;

export const login = async () => {
  try {
    const { headers, data } = await apiClient.post(AUTH.LOGIN, {
      id: 'f38eb524-c87a-4653-ac47-7cfbebf5e43b',
    });

    await handleLogin(headers);

    return data;
  } catch (error) {
    handleError(error, 'Login error');
  }
};

const requestPhoneVerification = async (phoneNumber: string) => {
  try {
    const { data } = await apiClient.post(AUTH.PHONE, {
      phoneNumber,
    });
    return data;
  } catch (error) {
    handleError(error, 'Request Phone Verification error');
  }
};

const verifyPhone = async (verificationData: VerifyPhoneSchema) => {
  try {
    const { headers, data } = await apiClient.post(
      AUTH.PHONE_VERIFICATION,
      verificationData,
    );

    if (data.userId) {
      await handleLogin(headers);
    }

    return data;
  } catch (error) {
    handleError(error, 'Verify Phone error');
  }
};

const signUp = async (userData: SignUpSchema) => {
  try {
    const { headers, data } = await apiClient.post(AUTH.SIGN_UP, userData);
    await handleLogin(headers);
    return data;
  } catch (error) {
    handleError(error, 'SignUp error');
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

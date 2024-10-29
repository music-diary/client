import { useMutation } from '@tanstack/react-query';
import { type SignUpSchema, type VerifyPhoneSchema } from '@/models/schemas';
import { handleLogin } from '@/utils/auth-utils';
import { handleError } from '@/utils/common-utils';
import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';

const AUTH = API_ENDPOINTS.AUTH;

export const tempLogin = async () => {
  try {
    const { headers, data } = await apiClient.post(AUTH.LOGIN, {
      id: '1ea6b340-a8a7-480c-b81a-b9a20a9e53f9',
    });

    await handleLogin(headers);

    return data;
  } catch (error) {
    handleError(error, 'Login error');
  }
};

export const googleLogin = async (idToken: string) => {
  try {
    const { headers, data } = await apiClient.post(AUTH.GOOGLE, {
      idToken,
    });

    if (data?.data?.id) {
      await handleLogin(headers);
    }

    return data.data;
  } catch (error) {
    handleError(error, 'Google Login error');
  }
};

export const appleLogin = async (idToken: string) => {
  try {
    const { headers, data } = await apiClient.post(AUTH.APPLE, {
      idToken,
    });

    if (data?.data?.id) {
      await handleLogin(headers);
    }

    return data.data;
  } catch (error) {
    handleError(error, 'Apple Login error');
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

    if (data?.user?.id) {
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

const oAuthSignUp = async (userData: SignUpSchema) => {
  try {
    const { headers, data } = await apiClient.post(
      AUTH.OAUTH_SIGN_UP,
      userData,
    );

    await handleLogin(headers);
    return data;
  } catch (error) {
    handleError(error, 'OAuth Sign Up error');
  }
};

export const useTempLogin = () => {
  return useMutation({ mutationFn: tempLogin });
};

export const useGoogleLogin = () => {
  return useMutation({ mutationFn: googleLogin });
};

export const useAppleLogin = () => {
  return useMutation({ mutationFn: appleLogin });
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

export const useOAuthSignUp = () => {
  return useMutation({ mutationFn: oAuthSignUp });
};

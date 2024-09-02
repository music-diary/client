import { useAppStore } from '@/store/useAppStore';

/**
 * Authorization 헤더에서 Bearer 토큰을 추출하는 함수
 * @param authorizationHeader - Authorization 헤더 값
 * @returns 토큰 값 또는 null (유효하지 않은 경우)
 */
const extractToken = (
  authorizationHeader: string | undefined,
): string | null => {
  if (!authorizationHeader || typeof authorizationHeader !== 'string') {
    return null;
  }

  const parts = authorizationHeader.trim().split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1];
};

/**
 * 헤더에서 토큰을 추출하고 저장하는 함수
 * @param headers - API 응답의 헤더 객체
 */
export const handleLogin = async (headers: Record<string, any>) => {
  const authorizationHeader = headers.authorization as string | undefined;
  const token = extractToken(authorizationHeader);

  if (token) {
    useAppStore.getState().login(token);
  } else {
    console.error('Invalid Authorization header format');
  }
};

/**
 * useAppStore에서 현재 저장된 토큰을 가져오는 함수
 * @returns 현재 저장된 토큰 값 또는 null
 */
export const getToken = (): string | null => {
  const token = useAppStore.getState().token;
  return token;
};

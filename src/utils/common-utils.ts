import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Authorization 헤더에서 Bearer 토큰을 추출하는 함수
 * @param authorizationHeader - Authorization 헤더 값
 * @returns 토큰 값 또는 null (유효하지 않은 경우)
 */
export const extractToken = (
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
 * AsyncStorage에서 저장된 토큰을 가져오는 함수
 * @returns 저장된 토큰 값 또는 null (오류 발생 시)
 */
export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    return token;
  } catch (error) {
    console.error('Error getting token from AsyncStorage:', error);
    return null;
  }
};

/**
 * 객체가 빈 객체인지 확인하는 함수
 * @param {object} obj - 확인할 객체
 * @returns {boolean} - 객체가 빈 객체이면 true, 그렇지 않으면 false
 */
export const isEmptyObject = (obj: object): boolean => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

import axios from 'axios';

/**
 * 객체가 빈 객체인지 확인하는 함수
 * @param {object} obj - 확인할 객체
 * @returns {boolean} - 객체가 빈 객체이면 true, 그렇지 않으면 false
 */
export const isEmptyObject = (obj: object): boolean => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

/**
 * 에러를 핸들링하는 함수
 * @param {unknown} error - 발생한 에러
 * @param {string} message - 추가할 메시지
 */
export const handleError = (error: unknown, message: string): void => {
  if (axios.isAxiosError(error)) {
    console.error(`${message}:`, error.response?.data || error.message);
  } else {
    console.error(`${message}:`, error);
  }
  throw error;
};

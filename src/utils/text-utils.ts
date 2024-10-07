// 글자수 ... 처리
export function trimTitle(title: string, maxLength: number) {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + '...';
  }
  return title;
}

// 이메일 유효성 검사
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

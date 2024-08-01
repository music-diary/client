export const extractVideoId = (url: string): string => {
  const regex = /[?&]v=([^&]+)/;
  const matches = url.match(regex);
  return matches ? matches[1] : '';
};

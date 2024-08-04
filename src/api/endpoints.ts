export const API_ENDPOINTS = {
  DIARY: '/diary',
  ARCHIVE: '/archive',
  AUTH: {
    SIGN_UP: '/auth/sign-up',
    PHONE: '/auth/phone',
    PHONE_VERIFICATION: '/auth/phone/verification',
    LOGIN: '/auth/login',
  },
  USERS: {
    SELF: '/users/self',
    ID: '/users/:id',
    ALL: '/users',
    INFO: '/users/me',
    UPDATE: '/users/:id',
    STATISTICS: {
      MONTH: '/users/statistics?type=month&month=:value',
      YEAR: '/users/statistics?type=year&year=:value',
    },
  },
  GENRES: '/genres',
  DIARIES: {
    EMOTIONS: '/diaries/emotions',
    TOPICS: '/diaries/topics',
    TEMPLATES: '/diaries/templates',
    ID: '/diaries/:id',
    CREATE: '/diaries',
    MUSIC: 'diaries/:id/musics/ai',
  },
};

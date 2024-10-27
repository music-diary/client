export const API_ENDPOINTS = {
  DIARY: '/diary',
  ARCHIVE: '/archive',
  AUTH: {
    SIGN_UP: '/auth/sign-up',
    PHONE: '/auth/phone',
    PHONE_VERIFICATION: '/auth/phone/verification',
    LOGIN: '/auth/login',
    GOOGLE: '/auth/login/oauth/google',
    APPLE: '/auth/login/oauth/apple',
    OAUTH_SIGN_UP: '/auth/login/sign-up',
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
    CONTACT: '/users/contact',
    WITHDRAWAL_LIST: '/users/withdrawal',
    WITHDRAWAL: '/users/:id/withdrawal',
  },
  GENRES: '/genres',
  DIARIES: {
    EMOTIONS: '/diaries/emotions',
    TOPICS: '/diaries/topics',
    TEMPLATES: '/diaries/templates',
    ID: '/diaries/:id',
    CREATE: '/diaries',
    MUSIC: 'diaries/:id/musics/ai',
    ME: '/diaries/me?status=:status',
  },
  ARCHIVES: {
    MUSIC_ARCHIVE:
      '/musics/me/archive?start-at=:startAt&end-at=:endAt&group=:group',
    DIARY_ARCHIVE: '/diaries/me/archive?start-at=:start&end-at=:end',
    SUMMARY: `/musics/me/archive/summary`,
    DIARY_MONTHLY_ARCHIVE:
      '/diaries/me/archive?start-at=:startAt&end-at=:endAt&group=:group',
  },
};

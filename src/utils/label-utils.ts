import { type IEmotion, type IGenre } from '@/models/interfaces';

// rootIdName -> label로 (ex> 'happy' -> '행복해요!', 'bad' -> 별로였어요 )
export const translateLabel = (
  rootIdName: string,
  moods: IEmotion[],
): string => {
  const mood = moods.find((m: any) => m.name === rootIdName);
  return mood ? mood.label : rootIdName;
};

// genre -> label로 (ex> 'hiphop' -> '힙합', 'pop' -> '팝')
export const getGenreLabel = (genre: string, genres: IGenre[]): string => {
  const foundGenre = genres.find((g) => g.name === genre);
  return foundGenre?.label ?? genre;
};

export const translateLabelStatistic = (rootIdName: string): string => {
  switch (rootIdName) {
    case 'good':
      return '긍정 감정';
    case 'normal':
      return '중립 감정';
    case 'bad':
      return '부정 감정';
    default:
      return '긍정 감정';
  }
};

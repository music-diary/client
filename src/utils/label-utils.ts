
// rootIdName -> label로 (ex> 'happy' -> '행복해요!', 'bad' -> 별로였어요 )
export const translateLabel = (rootIdName: string, moods: any): string => {
  const mood = moods.find((m: any) => m.name === rootIdName);
  return mood ? mood.label : rootIdName;
};

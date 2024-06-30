// 통계페이지
export interface DiaryNumberData {
  month: number;
  diaryCount: number;
}
export interface DiaryTopicData {
  Topic: string[];
}
export interface MusicCount {
  music: string;
  count: number;
}
export interface MusicPreferenceData {
  musicCount: MusicCount[];
}
export interface FillingData {
  filling: string;
  count: number;
}
export interface MyFillingData {
  fillingData: FillingData[];
}
export interface MonthlyData {
  month: number;
  count: number;
}
export interface LineGraphDataProps {
  data: MonthlyData[];
}
export interface DiaryYearNumberData {
  average: number;
  monthlyData: MonthlyData[];
}
export interface MonthlyStatistic {
  month: string;
  DiaryNumberData: DiaryNumberData;
  DiaryTopicData: DiaryTopicData;
  MusicPreferenceData: MusicPreferenceData;
  MyFillingData: MyFillingData;
}
export interface YearlyStatistic {
  year: string;
  DiaryYearNumberData: DiaryYearNumberData;
  DiaryTopicData: DiaryTopicData;
  MusicPreferenceData: MusicPreferenceData;
  MyFillingData: MyFillingData;
}

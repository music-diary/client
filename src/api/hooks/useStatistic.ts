import { useQuery } from '@tanstack/react-query';
import apiClient from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';

// 월간 통계 데이터 가져오기
const getMonthlyStatistics = async (month: string) => {
  const url = API_ENDPOINTS.USERS.STATISTICS.MONTH.replace(':value', month);
  const { data } = await apiClient.get(url);
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  return data.data;
};

// 연간 통계 데이터 가져오기
const getYearlyStatistics = async (year: string) => {
  const url = API_ENDPOINTS.USERS.STATISTICS.YEAR.replace(':value', year);
  const { data } = await apiClient.get(url);
  return data.data;
};

export const useGetMonthlyStatistics = (month: string) => {
  return useQuery({
    queryKey: ['monthlyStatistics', month],
    queryFn: async () => await getMonthlyStatistics(month),
  });
};

export const useGetYearlyStatistics = (year: string) => {
  return useQuery({
    queryKey: ['yearlyStatistics', year],
    queryFn: async () => await getYearlyStatistics(year),
  });
};

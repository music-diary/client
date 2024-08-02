import { useMemo, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS } from '@/constants';
import DropDownToggle from '@/components/mypage/DropDownToggle';
import MyFilling from '@/components/mypage/MyFilling';
import MusicPreference from '@/components/mypage/MusicPreference';
import DiaryTopic from '@/components/mypage/DiaryTopic';
import DiaryYearlyGraph from '@/components/mypage/DiaryYearlyGraph';
import yearlyStatistics from '@/data/static_yearly_template.json';
import { useUserCreatedInfo } from '@/api/hooks/useUsers';
import { generateYearArray } from '@/utils/date-utils';
import NoDiaryStatistic from '@/components/mypage/NoDiaryStatistic';
import YearlyNoDataTemplate from '@/components/mypage/YearlyNoDataTemplate';
import { useGetYearlyStatistics } from '@/api/hooks/useStatistic';
import MoreInfo from './MoreInfo';

const YearlyStatisticPage = () => {
  const createdDate = useUserCreatedInfo();

  const yearsArray = useMemo(() => {
    if (!createdDate) return [];
    return generateYearArray(createdDate);
  }, [createdDate]);

  const [selectedData, setSelectedData] = useState(yearsArray[0]);

  const {
    data: yearlyStatistics,
    isLoading,
    isError,
  } = useGetYearlyStatistics(selectedData);

  if (isLoading && yearlyStatistics === undefined)
    return <Text>Loading...</Text>;
  if (isError) return <Text>Error occurred while fetching data.</Text>;

  const handleSelect = (value: string) => {
    setSelectedData(value);
  };

  // 일기가 없는 경우 (추후 수정해야함)
  if (yearlyStatistics.diaries.length === 0) {
    return (
      <View>
        <View style={styles.dropdown}>
          <DropDownToggle
            data={yearsArray}
            selectedValue={selectedData}
            onSelect={handleSelect}
          />
        </View>
        <NoDiaryStatistic />
        <YearlyNoDataTemplate />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.dropdown}>
        <DropDownToggle
          data={yearsArray}
          selectedValue={selectedData}
          onSelect={handleSelect}
        />
      </View>
      <View style={styles.bodyContainer}>
        <DiaryYearlyGraph monthlyData={yearlyStatistics.diaries[0].months} />
        <MusicPreference genreCounts={yearlyStatistics.genreCounts} isYearly />
        <View style={styles.twoColumnContainer}>
          <MyFilling emotionData={yearlyStatistics.emotions} />
          <DiaryTopic topics={yearlyStatistics.topics} />
        </View>
        <MoreInfo />
      </View>
    </View>
  );
};

export default YearlyStatisticPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingBottom: 50,
  },
  dropdown: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  bodyContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 16,
  },
  twoColumnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

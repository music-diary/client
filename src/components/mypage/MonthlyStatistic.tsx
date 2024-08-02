import React, { useMemo, useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { COLORS } from '@/constants';
import DropDownToggle from '@/components/mypage/DropDownToggle';
import DiaryNumber from '@/components/mypage/DiaryNumber';
import MyFilling from '@/components/mypage/MyFilling';
import MusicPreference from '@/components/mypage/MusicPreference';
import DiaryTopic from '@/components/mypage/DiaryTopic';
import MoreInfo from '@/components/mypage/MoreInfo';
import { useUserCreatedInfo } from '@/api/hooks/useUsers';
import { generateMonthArray } from '@/utils/date-utils';
import NoDiaryStatistic from '@/components/mypage/NoDiaryStatistic';
import MonthlyNoDataTemplate from '@/components/mypage/MonthlyNoDataTemplate';
import { useGetMonthlyStatistics } from '@/api/hooks/useStatistic';

const MonthlyStatistic = () => {
  const createdDate = useUserCreatedInfo();

  const monthsArray = useMemo(() => {
    if (!createdDate) return [];
    return generateMonthArray(createdDate);
  }, [createdDate]);

  const [selectedData, setSelectedData] = useState(monthsArray[0]);
  const {
    data: monthlyStatistics,
    isLoading,
    isError,
  } = useGetMonthlyStatistics(selectedData);

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error occurred while fetching data.</Text>;

  const handleSelect = (value: string) => {
    setSelectedData(value);
  };

  // 일기가 없는 경우 (추후 수정해야함)
  if (monthlyStatistics.diaryCount === 0) {
    return (
      <View>
        <View style={styles.dropdown}>
          <DropDownToggle
            data={monthsArray}
            selectedValue={selectedData}
            onSelect={handleSelect}
          />
        </View>
        <NoDiaryStatistic />
        <MonthlyNoDataTemplate />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.dropdown}>
        <DropDownToggle
          data={monthsArray}
          selectedValue={selectedData}
          onSelect={handleSelect}
        />
      </View>
      <View style={styles.bodyContainer}>
        <FlatList
          data={[
            <DiaryNumber
              key="diary1"
              month={monthlyStatistics.date}
              diaryCount={monthlyStatistics.diaryCount}
            />,
            <MyFilling
              key="myFilling"
              emotionData={monthlyStatistics.emotions}
            />,
            <MusicPreference
              key="musicPreference"
              genreCounts={monthlyStatistics.genreCounts}
            />,

            <DiaryTopic key="diaryTopic" topics={monthlyStatistics.topics} />,
            <MoreInfo key="moreInfo" />,
          ]}
          renderItem={({ item }) => <View style={styles.item}>{item}</View>}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

export default MonthlyStatistic;

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
    flex: 1,
  },
  listContainer: {
    alignItems: 'center',
  },
  item: {
    margin: 8,
  },
});

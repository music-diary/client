import React, { useMemo, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { COLORS } from '@/constants';
import DropDownToggle from '@/components/mypage/DropDownToggle';
import DiaryNumber from '@/components/mypage/DiaryNumber';
import MyFilling from '@/components/mypage/MyFilling';
import MusicPreference from '@/components/mypage/MusicPreference';
import DiaryTopic from '@/components/mypage/DiaryTopic';
import MoreInfo from '@/components/mypage/MoreInfo';
import monthlyData from '@/data/dummy_statistic_monthly.json';
import { useUserCreatedInfo } from '@/api/hooks/useUsers';
import templateData from '@/data/static_monthly_template.json';
import NoDiaryStatistic from './NoDiaryStatistic';

const generateMonthArray = (createdDate: string): string[] => {
  const months = [];
  let currentDate = new Date();
  const startDate = new Date(createdDate);

  // Set to the first day of the current month for accurate calculations
  currentDate.setDate(1);
  startDate.setDate(1);

  while (currentDate >= startDate) {
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    months.push(`${year}-${month < 10 ? '0' : ''}${month}`);
    currentDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1)); // currentDate를 여기서 변경
  }

  // '2024-09' 추가
  months.push('2024년 09월');

  return months;
};

const MonthlyStatistic = () => {
  const [selectedValue, setSelectedValue] = useState(monthlyData[0].month);
  const [selectedData, setSelectedData] = useState(monthlyData[0]);

  const createdDate = useUserCreatedInfo();

  const monthsArray = useMemo(() => {
    if (!createdDate) return [];
    return generateMonthArray(createdDate);
  }, [createdDate]);

  console.log(monthsArray);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    const newData = monthlyData.find((data) => data.month === value);
    if (newData) {
      setSelectedData(newData);
    }
  };

  // 일기를 쓰지 않은 경우
  if (selectedData.DiaryNumberData.diaryCount === 0) {
    return (
      <View>
        <View style={styles.dropdown}>
          <DropDownToggle
            data={monthsArray}
            selectedValue={selectedValue}
            onSelect={handleSelect}
          />
        </View>
        <NoDiaryStatistic />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.dropdown}>
        <DropDownToggle
          data={monthlyData.map((data) => data.month)}
          selectedValue={selectedValue}
          onSelect={handleSelect}
        />
      </View>
      <View style={styles.bodyContainer}>
        <FlatList
          data={[
            <DiaryNumber
              key="diary1"
              month={templateData.date}
              diaryCount={templateData.diaryCount}
            />,
            <MyFilling key="myFilling" emotionData={templateData.emotion} />,
            <MusicPreference
              key="musicPreference"
              musicCount={selectedData.MusicPreferenceData.musicCount}
            />,

            <DiaryTopic key="diaryTopic" topics={templateData.topics} />,
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

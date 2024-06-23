// MontlyStatistic.tsx
import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Colors from '@/constants/Colors';
import DropDownToggle from '@/components/mypage/DropDownToggle';
import DiaryNumber from '@/components/mypage/DiaryNumber';
import MyFilling from '@/components/mypage/MyFilling';
import MusicPreference from '@/components/mypage/MusicPreference';
import DiaryTopic from '@/components/mypage/DiaryTopic';
import MoreInfo from '@/components/mypage/MoreInfo';
import { type MonthlyStatistic } from '@/interfaces';
import monthlyData from '@/data/dummy_statistic_data.json';

const MontlyStatistic: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState(monthlyData[0].month);
  const [selectedData, setSelectedData] = useState<MonthlyStatistic>(
    monthlyData[0],
  );

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    const newData = monthlyData.find((data) => data.month === value);
    if (newData) {
      setSelectedData(newData);
    }
  };

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
              month={selectedData.DiaryNumberData.month}
              diaryCount={selectedData.DiaryNumberData.diaryCount}
            />,
            <MyFilling
              key="filling1"
              fillingData={selectedData.MyFillingData.fillingData}
            />,
            <MusicPreference
              key="musicPreference"
              musicCount={selectedData.MusicPreferenceData.musicCount}
            />,
            <DiaryTopic
              key="diaryTopic"
              Topic={selectedData.DiaryTopicData.Topic}
            />,
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

export default MontlyStatistic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
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

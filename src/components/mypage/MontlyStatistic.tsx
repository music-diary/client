import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Colors from '@/constants/Colors';
import DropDownToggle from '@/components/mypage/DropDownToggle';
import DiaryNumber from '@/components/mypage/DiaryNumber';
import MyFilling from '@/components/mypage/MyFilling';
import MusicPreference from '@/components/mypage/MusicPreference';
import DiaryTopic from '@/components/mypage/DiaryTopic';
import MoreInfo from '@/components/mypage/MoreInfo';

const MontlyStatistic = () => {
  const [selectedValue, setSelectedValue] = useState('2024년 5월');
  const Monthdata = [
    '2024년 5월',
    '2024년 4월',
    '2024년 3월',
    '2024년 2월',
    '2025년 5월',
    '2025년 4월',
    '2025년 3월',
    '2025년 2월',
    '2023년 5월',
    '2023년 4월',
    '2023년 3월',
    '2023년 2월',
  ];
  const DiaryNumberData = {
    month: 5,
    diaryCount: 15,
  };

  const DiaryTopicData = {
    Topic: ['인간관계', '연애', '자존감'],
  };
  const MusicPreferenceData = {
    musicCount: [
      { music: 'pop', count: 10 },
      { music: 'rock', count: 3 },
      { music: 'rnb', count: 4 },
    ],
  };

  const MyFillingData = {
    fillingData: [
      { filling: '좋았어요', count: 14 },
      { filling: '괜찮아요', count: 3 },
      { filling: '슬펐어요', count: 4 },
    ],
  };

  const components = [
    <DiaryNumber
      key="diary1"
      month={DiaryNumberData.month}
      diaryCount={DiaryNumberData.diaryCount}
    />,
    <MyFilling key="filling1" fillingData={MyFillingData.fillingData} />,
    <MusicPreference
      key="musicPreference"
      musicCount={MusicPreferenceData.musicCount}
    />,
    <DiaryTopic key="diaryTopic" Topic={DiaryTopicData.Topic} />,
    <MoreInfo key="moreInfo" />,
  ];

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  const renderItem = ({ item }: { item: React.ReactNode }) => (
    <View style={styles.item}>{item}</View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.dropdown}>
        <DropDownToggle
          data={Monthdata}
          selectedValue={selectedValue}
          onSelect={handleSelect}
        />
      </View>
      <View style={styles.bodyContainer}>
        <FlatList
          data={components}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
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

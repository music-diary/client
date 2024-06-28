import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '@/constants/Colors';
import DropDownToggle from '@/components/mypage/DropDownToggle';
import MyFilling from '@/components/mypage/MyFilling';
import MusicPreference from '@/components/mypage/MusicPreference';
import DiaryTopic from '@/components/mypage/DiaryTopic';
import yearlyData from '@/data/dummy_statistic_yearly.json';
import DiaryYearlyGraph from '@/components/mypage/DiaryYearlyGraph';
import { type YearlyStatistic } from '@/models/interfaces';

const YearlyStatisticPage = () => {
  const [selectedValue, setSelectedValue] = useState(yearlyData[0].year);
  const [selectedData, setSelectedData] = useState<YearlyStatistic>(
    yearlyData[0],
  );

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    const newData = yearlyData.find((data) => data.year === value);
    if (newData) {
      setSelectedData(newData);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropdown}>
        <DropDownToggle
          data={yearlyData.map((data) => data.year)}
          selectedValue={selectedValue}
          onSelect={handleSelect}
        />
      </View>
      <View style={styles.bodyContainer}>
        <DiaryYearlyGraph
          average={selectedData.DiaryYearNumberData.average}
          monthlydata={selectedData.DiaryYearNumberData.monthlydata}
        />
        <MusicPreference
          musicCount={selectedData.MusicPreferenceData.musicCount}
          isYearly
        />
        <View style={styles.twoColumnContainer}>
          <MyFilling fillingData={selectedData.MyFillingData.fillingData} />
          <DiaryTopic Topic={selectedData.DiaryTopicData.Topic} />
        </View>
      </View>
    </View>
  );
};

export default YearlyStatisticPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
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

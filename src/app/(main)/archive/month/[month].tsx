import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { Colors, Fonts } from '@/constants';
import dummy_archive_month from '@/data/dummy_archive_month.json';
import DailyMainArchive from '@/components/archive/DailyMainArchive';
import dummy_archive_recommend from '@/data/dummy_archive_recommend.json';
import RecommendMusic from '@/components/archive/RecommendMusic';
import RouteSwitcher from '@/components/archive/RouteSwitcher';

interface DiaryData {
  id: string;
  date: string;
  albumCoverUrl: string;
  songTitle: string;
  artist: string;
  diaryTitle: string;
  emotions: string[];
  feeling: string;
}

interface RecommendData {
  id: string;
  albumCoverUrl: string;
  songTitle: string;
  artist: string;
  feeling: string;
}

const MonthScreen = () => {
  const { month } = useLocalSearchParams<{ month: string }>();
  const [entryData, setEntryData] = useState<DiaryData[]>([]);
  const [recommendData, setRecommendData] = useState<RecommendData[]>([]);

  useEffect(() => {
    setEntryData(dummy_archive_month);
    setRecommendData(dummy_archive_recommend);
  }, []);

  return (
    <>
      <View style={styles.header}>
        <RouteSwitcher />
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>{month}</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ paddingTop: 11 }}
        >
          <View style={styles.scrollContent}>
            {entryData.map((entry) => (
              <DailyMainArchive key={entry.id} {...entry} />
            ))}
          </View>
        </ScrollView>
        <View style={styles.recommendContainer}>
          <Text style={styles.headerText}>Miya님이 3월에 추천받은 음악들</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.scrollContent}>
              {recommendData.map((entry) => (
                <RecommendMusic key={entry.id} {...entry} />
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
};

export default MonthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    paddingLeft: 16,
    paddingTop: 20,
  },
  header: {
    height: 50,
  },
  headerText: {
    color: Colors.WHITE,
    ...Fonts.T1,
  },
  scrollContent: {
    flexDirection: 'row',
    gap: 10,
  },
  recommendContainer: {
    paddingTop: 30,
    paddingBottom: 150,
  },
});

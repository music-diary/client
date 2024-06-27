import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import dummy_archive_month from '@/data/dummy_archive_month.json';
import DailyMainArchive from '@/components/archive/DailyMainArchive';
import dummy_archive_recommend from '@/data/dummy_archive_recommend.json';
import RecommendMusic from '@/components/archive/RecommendMusic';
import RouteSwitcher from '@/components/archive/RouteSwitcher';
import { getCurrentYearMonth } from '@/utils/dateUtils';

interface DiaryData {
  id: string;
  date: string;
  albumCoverUrl: string;
  songTitle: string;
  artist: string;
  diaryTitle: string;
  emotions: string[];
}

interface RecommendData {
  id: string;
  albumCoverUrl: string;
  songTitle: string;
  artist: string;
  emotion: string;
}

const MonthScreen = () => {
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
        <Text style={styles.headerText}>{getCurrentYearMonth(new Date())}</Text>
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
    backgroundColor: Colors.black,
    paddingLeft: 16,
    paddingTop: 20,
  },
  header: {
    height: 50,
  },
  headerText: {
    color: Colors.white,
    fontFamily: 'pret-b',
    fontSize: 18,
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

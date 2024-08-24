import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { COLORS } from '@/constants';
import dummy_archive_month from '@/data/dummy_archive_month.json';
import DailyMainArchive from '@/components/archive/DailyMainArchive';
import RecommendMusic from '@/components/archive/RecommendMusic';
import RouteSwitcher from '@/components/archive/RouteSwitcher';
import { formatToYearMonth, getCurrentMonthRange } from '@/utils/date-utils';
import { useDiaryMonthlyArchive } from '@/api/hooks/useArchive';
import LoadingScreen from '@/components/common/LoadingScreen';
import { getMoodFromEmotions } from '@/utils/emotion-utils';
import { type DiaryMonthArchiveSchema } from '@/models/schemas';

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

const extractMusicsWithFeeling = (diaries: DiaryMonthArchiveSchema[]) => {
  return diaries.flatMap((diary) =>
    diary.musics.map((music) => ({
      songTitle: music.title,
      artist: music.artist,
      albumCoverUrl: music.albumUrl,
      emotionName: getMoodFromEmotions(diary.emotions),
    })),
  );
};

const ArchiveScreen = () => {
  const { startAt, endAt } = getCurrentMonthRange();

  const {
    data: archiveData,
    error,
    isLoading,
  } = useDiaryMonthlyArchive(startAt, endAt, 'month');

  const [entryData, setEntryData] = useState<DiaryData[]>([]);

  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    setEntryData(dummy_archive_month);
  }, []);

  const recommendMusics = archiveData
    ? extractMusicsWithFeeling(archiveData)
    : [];

  if (isLoading || !archiveData) {
    return <LoadingScreen />;
  }

  if (error) {
    console.warn('Error while fetching archive data:', error);
  }

  return (
    <>
      <View style={styles.header}>
        <RouteSwitcher />
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>{formatToYearMonth(new Date())}</Text>
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
          <Text style={styles.headerText}>
            Miya님이 {currentMonth}월에 추천받은 음악들
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.scrollContent}>
              {recommendMusics.map((entry, index) => (
                <RecommendMusic key={index} {...entry} />
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
};

export default ArchiveScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingLeft: 16,
    paddingTop: 20,
  },
  header: {
    height: 50,
  },
  headerText: {
    color: COLORS.WHITE,
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

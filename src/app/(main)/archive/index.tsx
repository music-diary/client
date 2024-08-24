import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { COLORS } from '@/constants';
import DailyMainArchive from '@/components/archive/DailyMainArchive';
import RecommendMusic from '@/components/archive/RecommendMusic';
import RouteSwitcher from '@/components/archive/RouteSwitcher';
import {
  formatMonthDayDate,
  formatToYearMonth,
  getCurrentMonthRange,
} from '@/utils/date-utils';
import { useDiaryMonthlyArchive } from '@/api/hooks/useArchive';
import LoadingScreen from '@/components/common/LoadingScreen';
import { getLevel1Emotions, getMoodFromEmotions } from '@/utils/emotion-utils';
import { type DiaryMonthArchiveSchema } from '@/models/schemas';
import NoArchiveData from '@/components/archive/NoArchiveData';
import { useUserName } from '@/api/hooks/useUsers';

const extractDiaries = (diaries: DiaryMonthArchiveSchema[]) => {
  return diaries
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .map((diary) => {
      const selectedMusic = diary.musics.find(
        (music) => music.selected === true,
      );
      const emotionLabels = getLevel1Emotions(
        diary.emotions.map((e) => e.emotions),
      ).map((emotion) => emotion.label);
      return {
        id: diary.id,
        date: formatMonthDayDate(diary.updatedAt),
        albumCoverUrl: selectedMusic?.albumUrl ?? '',
        songTitle: selectedMusic?.title ?? '',
        artist: selectedMusic?.artist ?? '',
        diaryTitle: diary.title,
        emotions: emotionLabels,
        feeling: getMoodFromEmotions(diary.emotions || []),
      };
    });
};

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
  const { startAt, endAt } = getCurrentMonthRange(new Date());
  const userName = useUserName();

  const {
    data: archiveData,
    error,
    isLoading,
  } = useDiaryMonthlyArchive(startAt, endAt, 'month');

  const currentMonth = new Date().getMonth() + 1;

  const dailyArchiveData = archiveData ? extractDiaries(archiveData) : [];

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
      {archiveData && archiveData.length === 0 ? (
        <View style={styles.noDataContainer}>
          <NoArchiveData />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <Text style={styles.headerText}>{formatToYearMonth(new Date())}</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ paddingTop: 11 }}
          >
            <View style={styles.scrollContent}>
              {dailyArchiveData.map((entry) => (
                <DailyMainArchive key={entry.id} {...entry} />
              ))}
            </View>
          </ScrollView>
          <View style={styles.recommendContainer}>
            <Text style={styles.headerText}>
              {userName}님이 {currentMonth}월에 추천받은 음악들
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.scrollContent}>
                {recommendMusics.map((entry, index) => (
                  <RecommendMusic key={index} {...entry} />
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      )}
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
  noDataContainer: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
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

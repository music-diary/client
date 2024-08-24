import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { COLORS } from '@/constants';
import DailyMainArchive from '@/components/archive/DailyMainArchive';
import RecommendMusic from '@/components/archive/RecommendMusic';
import RouteSwitcher from '@/components/archive/RouteSwitcher';
import {
  formatMonthDayDate,
  getMonthRangeFromParams,
} from '@/utils/date-utils'; // 날짜 관련 유틸리티를 수정합니다.
import { useDiaryMonthlyArchive } from '@/api/hooks/useArchive';
import LoadingScreen from '@/components/common/LoadingScreen';
import { getLevel1Emotions, getMoodFromEmotions } from '@/utils/emotion-utils';
import { type DiaryMonthArchiveSchema } from '@/models/schemas';

// 일기 데이터를 가공하여 반환하는 함수
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

// 감정과 함께 음악 추천 데이터를 반환하는 함수
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

// 메인 컴포넌트
const ArchiveScreen = () => {
  // 라우터에서 월 정보를 가져옴
  const { month } = useLocalSearchParams<{ month: string }>();
  

  // 전달받은 month를 날짜 범위로 변환 (2024년 07월 -> {startAt: '2024-07-01', endAt: '2024-07-31'})
  const { startAt, endAt } = getMonthRangeFromParams(month);

  // 다이어리 월별 아카이브 데이터를 가져옴
  const {
    data: archiveData,
    error,
    isLoading,
  } = useDiaryMonthlyArchive(startAt, endAt, 'month');

  // 일기 데이터 가공
  const dailyArchiveData = archiveData ? extractDiaries(archiveData) : [];

  // 음악 추천 데이터 가공
  const recommendMusics = archiveData
    ? extractMusicsWithFeeling(archiveData)
    : [];

  // 로딩 상태 처리
  if (isLoading || !archiveData) {
    return <LoadingScreen />;
  }

  // 에러 처리
  if (error) {
    console.warn('Error while fetching archive data:', error);
  }

  return (
    <>
      <View style={styles.header}>
        <RouteSwitcher />
      </View>
      <ScrollView style={styles.container}>
        {/* 현재 년월 표시 */}
        <Text style={styles.headerText}>{month}</Text>

        {/* 일별 아카이브를 수평 스크롤로 표시 */}
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

        {/* 추천 음악들 표시 */}
        <View style={styles.recommendContainer}>
          <Text style={styles.headerText}>
            Miya님이 {month}에 추천받은 음악들
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

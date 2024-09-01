import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProfileSvg } from 'assets/images/home';
import WeekCalendar from '@/components/home/WeekCalender';
import MonthlyMusicList from '@/components/home/MonthlyMusicList';
import CharacterAnimation from '@/components/home/CharacterAnimation';
import { COLORS, FONTS } from '@/constants';
import TopDescription from '@/components/home/TopDescription';
import NewUserDescription from '@/components/home/NewUserDescription';
import { useMusicArchive } from '@/api/hooks/useArchive';
import { emotionColor, emotionHomeText } from '@/constants/data/emotion-colors';
import { getCurrentMonthRange } from '@/utils/date-utils';
import { getMoodFromEmotions } from '@/utils/emotion-utils';
import { useUserName } from '@/api/hooks/useUsers';
import LoadingScreen from '@/components/common/LoadingScreen';

const HomeScreen = () => {
  const { startAt, endAt } = getCurrentMonthRange(new Date());
  const {
    data: archiveData,
    error,
    isLoading,
  } = useMusicArchive(startAt, endAt, 'month');

  const userName = useUserName();

  if (isLoading || !archiveData) {
    return <LoadingScreen />;
  }

  if (error) {
    console.warn('Error while fetching archive data:', error);
  }

  const handlePersonClick = () => {
    router.push('/(main)/mypage');
  };

  const diaryCount = archiveData.count;

  const emotionName = archiveData?.emotion
    ? getMoodFromEmotions([{ emotions: archiveData?.emotion }])
    : null;

  // emotionName이 존재할 때만 color와 text 계산
  const color = emotionName ? emotionColor[emotionName] : COLORS.GREEN;
  const text = emotionName ? emotionHomeText[emotionName] : '';

  return (
    <>
      <SafeAreaView style={styles.topSafeArea} />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {/* 상단 부분 */}
          <View style={styles.top}>
            <View style={styles.topBar}>
              <Text style={styles.logoText}>Logo</Text>
              <TouchableOpacity onPress={handlePersonClick}>
                <ProfileSvg />
              </TouchableOpacity>
            </View>
            <TopDescription count={diaryCount} name={userName} />
          </View>

          {/* 바디 부분 */}
          <View style={styles.body}>
            <>
              <CharacterAnimation />
              <Text style={styles.bodyMent}>
                {userName}님의{'\n'}일주일간 기록이에요
              </Text>
              <View style={{ marginTop: 16 }}>
                <WeekCalendar />
              </View>
              <View style={{ marginTop: 40 }}>
                {diaryCount > 0 ? (
                  <Text style={styles.bodyMent}>
                    이번달 {userName}님은{'\n'}
                    <Text style={{ color }}>{text}</Text> 감정의 노래를 가장
                    많이 들었어요
                  </Text>
                ) : (
                  <Text style={styles.bodyMent}>
                    이번달 {userName}님은{'\n'}
                    아직 일기를 작성하지 않았어요
                  </Text>
                )}
              </View>
              {diaryCount > 0 ? (
                <MonthlyMusicList
                  musics={archiveData.musics}
                  topEmotion={emotionName}
                />
              ) : (
                <NewUserDescription description="일기쓰고 노래를 추천받아 볼래요" />
              )}
            </>
          </View>

          {/* 하단 부분 */}
          <View style={{ height: 63 }} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  topSafeArea: {
    backgroundColor: COLORS.PURPLE,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  top: {
    paddingHorizontal: 16,
    backgroundColor: COLORS.PURPLE,
    paddingBottom: 50,
    marginTop: -200,
    paddingTop: 200,
  },
  topBar: {
    height: 44,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    color: COLORS.WHITE,
    ...FONTS.H1,
  },
  body: {
    backgroundColor: COLORS.BLACK,
    marginTop: -50,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingLeft: 16,
    paddingTop: 28,
    paddingBottom: 23,
  },
  bodyMent: {
    color: COLORS.WHITE,
    fontFamily: 'pret-b',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default HomeScreen;

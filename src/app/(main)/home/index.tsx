import React from 'react';
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

const HomeScreen = () => {
  // 월간 작성 개수 -> dummy data
  const diaryCount = 3;
  // 이름 -> dummy data
  const name = 'Miya';

  const { data, error, isLoading } = useMusicArchive(
    '2024-07-01',
    '2024-07-31',
    'month',
  );

  // person 클릭 시 마이페이지로 이동
  const handlePersonClick = () => {
    router.push('/(main)/mypage');
  };

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
            <TopDescription count={diaryCount} name={name} />
          </View>

          {/* 바디 부분 */}
          <View style={styles.body}>
            <CharacterAnimation />
            <Text style={styles.bodyMent}>
              Miya님의{'\n'}일주일간 기록이에요
            </Text>
            <View style={{ marginTop: 16 }}>
              <WeekCalendar />
            </View>
            <View style={{ marginTop: 40 }}>
              {diaryCount > 0 ? (
                <Text style={styles.bodyMent}>
                  이번달 Miya님은{'\n'}
                  <Text style={{ color: COLORS.GREEN }}>긍정적인</Text> 감정의
                  노래를 가장 많이 들었어요
                </Text>
              ) : (
                <Text style={styles.bodyMent}>
                  이번달 Miya님은{'\n'}
                  아직 일기를 작성하지 않았어요
                </Text>
              )}
            </View>
            {diaryCount > 0 && data ? (
              <MonthlyMusicList musics={data.musics} />
            ) : (
              <NewUserDescription description="아직 작성한 일기가 없어요" />
            )}
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
    color: '#FAFAFA',
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

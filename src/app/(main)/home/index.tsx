import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import WeekCalendar from '@/components/home/WeekCalender';
import MontlyMusicList from '@/components/home/MontlyMusicList';
import MontlyLetterList from '@/components/home/MontlyLetterList';
import CharacterAnimation from '@/components/home/CharacterAnimation';
import Fonts from '@/constants/Fonts';
import Colors from '@/constants/Colors';
import TopDescription from '@/components/home/TopDescription';
import NewUserDescription from '@/components/home/NewUserDescription';

const HomeScreen = () => {
  // 월간 작성 개수 -> dummy data
  const diaryCount = 3;
  // 이름 -> dummy data
  const name = 'Miya';
  // 편지 개수
  const letterCount = 0;

  // person클릭 시 마이페이지로 이동
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
                <Fontisto name="person" size={20} color="white" />
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
                  <Text style={{ color: Colors.green }}>긍정적인</Text> 감정의
                  노래를 가장 많이 들었어요
                </Text>
              ) : (
                <Text style={styles.bodyMent}>
                  이번달 Miya님은{'\n'}
                  아직 일기를 작성하지 않았어요
                </Text>
              )}
            </View>
            {diaryCount > 0 ? (
              <MontlyMusicList />
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
    backgroundColor: Colors.purple,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  top: {
    paddingHorizontal: 16,
    backgroundColor: Colors.purple,
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
    ...Fonts.h1,
  },

  character: {
    position: 'absolute',
    top: -100,
    right: 16,
  },
  body: {
    backgroundColor: Colors.black,
    marginTop: -50,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingLeft: 16,
    paddingTop: 28,
    paddingBottom: 23,
  },
  bodyMent: {
    color: Colors.white,
    fontFamily: 'pret-b',
    fontSize: 16,
    lineHeight: 24,
  },
  showAll: {
    position: 'absolute',
    right: 16,
    top: 28,
  },
});

export default HomeScreen;

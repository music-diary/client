import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import WeekCalendar from '@/components/home/WeekCalender';
import MontlyMusicList from '@/components/home/MontlyMusicList';
import MontlyLetterList from '@/components/home/MontlyLetterList';
import CharacterAnimation from '@/components/home/CharacterAnimation';
import Fonts from '@/constants/Fonts';
import Colors from '@/constants/Colors';
import TopDescription from '@/components/home/TopDescription';



const HomeScreen = () => {

  // 월간 작성 개수 -> dummy data
  const submissionCount = 0;


  return (
    <>
      <SafeAreaView style={styles.topSafeArea} />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {/* 상단 부분 */}
          <View style={styles.top}>
            <View style={styles.topBar}>
              <Text style={styles.logoText}>Logo</Text>
              <Fontisto name="bell" size={20} color="white" />
            </View>
            <TopDescription />
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
              <Text style={styles.bodyMent}>
                이번달 Miya님은{'\n'}
                <Text style={{ color: Colors.green }}>긍정적인</Text> 감정의
                노래를 가장 많이 들었어요
              </Text>
              <TouchableOpacity style={styles.showAll}>
                <Text style={styles.showAllText}>전체보기</Text>
              </TouchableOpacity>
            </View>
            <MontlyMusicList />
            <View style={{ marginTop: 40 }}>
              <Text style={styles.bodyMent}>
                이번달 Miya님께{'\n'}9통의 음악편지가 도착했어요
              </Text>
              <TouchableOpacity style={styles.showAll}>
                <Text style={styles.showAllText}>전체보기</Text>
              </TouchableOpacity>

              <MontlyLetterList />
            </View>
          </View>
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
    lineHeight: 24,
    color: Colors.white,
    ...Fonts.b1_sb,
  },
  showAll: {
    position: 'absolute',
    right: 16,
    top: 28,
  },
  showAllText: {
    color: Colors.white,
    textDecorationLine: 'underline',
    ...Fonts.btn,
  },
});

export default HomeScreen;

import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { ProfileSvg } from 'assets/images/home';
import CharacterAnimation from '@/components/home/CharacterAnimation';
import { COLORS, FONTS } from '@/constants';
import NewUserDescription from '@/components/home/NewUserDescription';
import { emotionColor, emotionHomeText } from '@/constants/data/emotion-colors';
import { getMoodFromEmotions } from '@/utils/emotion-utils';
import { colorWithOpacity } from '@/utils/color-utils';
import TopDescriptionTemplate from '@/components/template/TopDescriptionTemplate';
import WeekCalendarTemplate from '@/components/template/WeekCalenderTemplate';
import MonthlyMusicListTemplate from '@/components/template/MonthlyMusicListTemplate';
import dummyData from '@/data/tutorial_album_template.json';
import { type MusicRecommendationSchema } from '@/models/schemas';

const Tutorial = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const archiveData = dummyData as unknown as MusicRecommendationSchema;
  console.log('🚀 ~ file: index.tsx:46 ~ Tutorial ~ archiveData:', archiveData);

  const userName = 'Muda';

  const handlePersonClick = () => {
    router.push('/(main)/mypage');
  };

  const handleScreenPress = () => {
    router.push('/(main)/tutorial/second-tutorial');
    setIsModalVisible(false);
  };

  const diaryCount = archiveData.count;
  console.log('🚀 ~ file: index.tsx:47 ~ HomeScreen ~ diaryCount:', diaryCount);

  const emotionName = archiveData?.emotion
    ? getMoodFromEmotions([{ emotions: archiveData?.emotion }])
    : null;

  const color = emotionName ? emotionColor[emotionName] : COLORS.GREEN;
  const text = emotionName ? emotionHomeText[emotionName] : '';

  return (
    <>
      <Modal visible={isModalVisible} transparent={true} animationType="none">
        <Pressable style={styles.overlay} onPress={handleScreenPress} />
        <View style={styles.characterAnimationContainer}>
          <CharacterAnimation />
        </View>
      </Modal>

      <SafeAreaView style={styles.topSafeArea} />
      <TouchableWithoutFeedback onPress={handleScreenPress}>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.top}>
              <View style={styles.topBar}>
                <Text style={styles.logoText}>Logo</Text>
                <TouchableOpacity onPress={handlePersonClick}>
                  <ProfileSvg />
                </TouchableOpacity>
              </View>
              <TopDescriptionTemplate count={diaryCount} name={userName} />
            </View>

            <View style={styles.body}>
              <>
                <Text style={styles.bodyMent}>
                  {userName}님의{'\n'}일주일간 기록이에요
                </Text>
                <View style={{ marginTop: 16 }}>
                  <WeekCalendarTemplate />
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
                  <MonthlyMusicListTemplate
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
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  topSafeArea: {
    backgroundColor: COLORS.PURPLE,
  },
  overlay: {
    flex: 1,
    backgroundColor: colorWithOpacity(COLORS.BLACK, 0.7),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
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
  characterAnimationContainer: {
    zIndex: 1000, // CharacterAnimation이 overlay 위로 올라오도록 설정
    position: 'absolute', // 고정된 위치에 두어 화면에 띄움
    top: 300,
    left: 0,
    right: 0,
    alignItems: 'center',
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

export default Tutorial;

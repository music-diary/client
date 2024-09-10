import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { COLORS } from '@/constants';
import { ProfileSvg } from 'assets/images/home';
import NewUserDescription from '@/components/home/NewUserDescription';
import { emotionColor, emotionHomeText } from '@/constants/data/emotion-colors';
import TopDescriptionTemplate from '@/components/template/TopDescriptionTemplate';
import WeekCalendarTemplate from '@/components/template/WeekCalenderTemplate';
import MonthlyMusicListTemplate from '@/components/template/MonthlyMusicListTemplate';
import { type MusicRecommendationSchema } from '@/models/schemas';
import { getMoodFromEmotions } from '@/utils/emotion-utils';
import { LogoHeaderSvg, MainCharacterSvg } from 'assets/images/common';
import { tutorialAlbumTemplate } from '@/constants/template-data';

const TutorialContentTemplate = () => {
  const dummyData = tutorialAlbumTemplate;
  const archiveData = dummyData as unknown as MusicRecommendationSchema;
  const userName = 'Muda';
  const diaryCount = archiveData.count;

  const emotionName = archiveData?.emotion
    ? getMoodFromEmotions([{ emotions: archiveData?.emotion }])
    : null;

  const color = emotionName ? emotionColor[emotionName] : COLORS.GREEN;
  const text = emotionName ? emotionHomeText[emotionName] : '';

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.characterAnimationContainer}>
          <MainCharacterSvg />
        </View>
        <ScrollView>
          <View style={styles.top}>
            <View style={styles.topBar}>
              <LogoHeaderSvg />
              <TouchableOpacity>
                <ProfileSvg />
              </TouchableOpacity>
            </View>
            <TopDescriptionTemplate count={diaryCount} name={userName} />
          </View>
          <View style={styles.body}>
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
                  <Text style={{ color }}>{text}</Text> 감정의 노래를 가장 많이
                  들었어요
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
          </View>

          {/* 하단 부분 */}
          <View style={{ height: 63 }} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  characterAnimationContainer: {
    zIndex: 1,
    position: 'absolute',
    top: 140,
    right: 8,
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

export default TutorialContentTemplate;

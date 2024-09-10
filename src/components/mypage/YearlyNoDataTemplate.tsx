import { StyleSheet, View, Text } from 'react-native';
import { COLORS, FONTS } from '@/constants';
import MyFilling from '@/components/mypage/MyFilling';
import MusicPreference from '@/components/mypage/MusicPreference';
import DiaryTopic from '@/components/mypage/DiaryTopic';
import DiaryYearlyGraph from '@/components/mypage/DiaryYearlyGraph';
import { staticYearlyTemplate } from '@/constants/template-data';
import { colorWithOpacity } from '@/utils/color-utils';

const YearlyNoDataTemplate = () => {
  const templateData = staticYearlyTemplate;
  return (
    <>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Sample</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.overlay} />
        <View style={styles.bodyContainer}>
          <DiaryYearlyGraph monthlyData={templateData.diaries[0].months} />
          <MusicPreference
            genreCounts={templateData.genreCounts}
            isYearly
            diaryCount={templateData.diaries[0].count}
          />
          <View style={styles.twoColumnContainer}>
            <MyFilling emotionData={templateData.emotions} />
            <DiaryTopic
              topics={templateData.topics}
              diaryCount={templateData.diaries[0].count}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default YearlyNoDataTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingBottom: 50,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: colorWithOpacity(COLORS.BLACK, 0.7),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  button: {
    flex: 1,
    width: 46,
    height: 16,
    justifyContent: 'center',
    backgroundColor: colorWithOpacity(COLORS.PURPLE, 0.3),
    marginLeft: 16,
    borderRadius: 7.5,
  },
  buttonText: {
    textAlign: 'center',
    color: COLORS.PURPLE,
    ...FONTS.LB,
  },
  bodyContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 16,
  },
  twoColumnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

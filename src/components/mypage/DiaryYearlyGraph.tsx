import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '@/constants';
import { ConfettiSvg } from 'assets/images/mypage';
import { colorWithOpacity } from '@/utils/color-utils';
import LineGraph from '@/components/mypage/LineGraph';
import { type DiaryYearNumberData } from '@/models/interfaces';

const containerWidth = Dimensions.get('window').width - 32;

const DiaryYearlyGraph = ({ average, monthlyData }: DiaryYearNumberData) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <ConfettiSvg />
        <Text style={styles.titleText}>작성한 음악일기</Text>
      </View>
      <Text style={styles.bodyText}>
        올해 정말 <Text style={styles.highlight}>꾸준하게</Text> 음악일기를
        찾아주셨네요!
      </Text>
      <View style={styles.boxContainer}>
        <Text style={styles.boxText}>
          월 평균 <Text style={styles.boxHighlight}>{average}회</Text> 작성
        </Text>
      </View>
      <LineGraph data={monthlyData} />
    </View>
  );
};

export default DiaryYearlyGraph;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.GREY3,
    height: 330,
    width: containerWidth,
    borderRadius: 12,
    paddingTop: 20,
    paddingHorizontal: 10,
    gap: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colorWithOpacity(COLORS.WHITE, 0.1),
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  titleText: {
    color: COLORS.PURPLE_BOX,
    ...FONTS.BTN,
  },
  bodyText: {
    color: colorWithOpacity(COLORS.WHITE, 0.5),
    ...FONTS.B2,
    textAlign: 'center',
  },
  highlight: {
    color: 'white',
  },
  boxContainer: {
    backgroundColor: COLORS.WHITE,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  boxText: {
    color: COLORS.BLACK,
    ...FONTS.B2_SB,
  },
  boxHighlight: {
    color: COLORS.PURPLE,
  },
});

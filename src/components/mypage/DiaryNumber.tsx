import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ConfettiSvg } from 'assets/images/mypage';
import { COLORS, FONTS } from '@/constants';
import { colorWithOpacity } from '@/utils/color-utils';
import CircularGraph from '@/components/mypage/CircularGraph';

const containerWidth = Dimensions.get('window').width / 2 - 24;

interface DiaryNumberProps {
  month: number;
  diaryCount: number;
}

const DiaryNumber = ({ month, diaryCount }: DiaryNumberProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <ConfettiSvg />
        <Text style={styles.titleText}>작성한 음악일기</Text>
      </View>
      <Text style={styles.bodyText}>
        이번 달은 <Text style={styles.highlight}>{diaryCount}개</Text>의{'\n'}
        음악일기를 썼어요.
      </Text>
      <View style={styles.graphContainer}>
        <CircularGraph month={month} diaryCount={diaryCount} />
      </View>
    </View>
  );
};

export default DiaryNumber;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.GREY3,
    height: 250,
    width: containerWidth,
    borderRadius: 12,
    paddingTop: 20,
    paddingHorizontal: 10,
    gap: 16,
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
  graphContainer: {
    alignItems: 'center',
  },
});

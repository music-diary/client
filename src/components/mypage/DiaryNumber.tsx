import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ConfettiSvg } from 'assets/images/mypage';
import { COLORS, FONTS } from '@/constants';
import { colorWithOpacity } from '@/utils/color-utils';
import CircularGraph from '@/components/mypage/CircularGraph';
import LoadingIndicator from '@/components/common/LoadingIndicator';

const containerWidth = Dimensions.get('window').width / 2 - 24;

const extractMonth = (dateString: string): number => {
  if (!dateString) {
    return 0;
  }
  const parts = dateString.split('-');

  if (parts.length !== 2) {
    throw new Error('Invalid date format. Expected YYYY-MM');
  }
  const month = parseInt(parts[1], 10);
  if (isNaN(month) || month < 1 || month > 12) {
    throw new Error('Invalid month value');
  }
  return month;
};

interface DiaryNumberProps {
  month: string;
  diaryCount: number;
}

const DiaryNumber = ({ month, diaryCount }: DiaryNumberProps) => {
  const monthNumber = extractMonth(month);

  // 에러케이스 -> 로딩 케이스
  if (!month || diaryCount === -1) {
    return (
      <View style={styles.container}>
        <LoadingIndicator />
      </View>
    );
  }

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
        <CircularGraph month={monthNumber} diaryCount={diaryCount} />
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
    color: COLORS.PURPLE_LIGHT,
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

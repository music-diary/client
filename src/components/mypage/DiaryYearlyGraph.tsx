import React, { useMemo } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '@/constants';
import { ConfettiSvg } from 'assets/images/mypage';
import { colorWithOpacity } from '@/utils/color-utils';
import LineGraph from '@/components/mypage/LineGraph';
import LoadingIndicator from '../common/LoadingIndicator';

const containerWidth = Dimensions.get('window').width - 32;

interface DiaryYearlyGraphProps {
  monthlyData: Array<{ month: string; count: number }>;
}

const DiaryYearlyGraph = ({ monthlyData }: DiaryYearlyGraphProps) => {
  // 에러케이스 + 로딩케이스
  if (monthlyData.length === 0) {
    return (
      <View style={styles.container}>
        <LoadingIndicator />
      </View>
    );
  }

  const average = useMemo(() => {
    const total = monthlyData.reduce((sum, { count }) => sum + count, 0);
    return Math.ceil(total / monthlyData.length);
  }, [monthlyData]);

  const transformedData = monthlyData.map(({ month, count }) => ({
    month: new Date(month).getMonth() + 1,
    count,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <ConfettiSvg />
        <Text style={styles.titleText}>작성한 음악일기</Text>
      </View>
      <Text style={styles.bodyText}>
        올해 정말 <Text style={styles.highlight}>꾸준하게</Text> 뮤다를
        찾아주셨네요!
      </Text>
      <View style={styles.boxContainer}>
        <Text style={styles.boxText}>
          월 평균 <Text style={styles.boxHighlight}>{average}회</Text> 작성
        </Text>
      </View>
      <LineGraph data={transformedData} />
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

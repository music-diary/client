import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '@/constants';
import { SmileySvg } from 'assets/images/mypage';
import EmotionIcon from '@/components/mypage/EmotionIcon';
import { colorWithOpacity } from '@/utils/color-utils';
import { useMoods } from '@/api/hooks/useDiaries';
import { emotionColor } from '@/constants/data';
import { translateLabel } from '@/utils/label-utils';

const containerWidth = Dimensions.get('window').width / 2 - 24;

interface EmotionData {
  rootId: string;
  rootIdName: string;
  count: number;
  topEmotions: string[];
}

interface MyFillingDataProps {
  emotionData: EmotionData[];
}

const calculatePercentages = (data: EmotionData[]) => {
  const total = data.reduce((acc, item) => acc + item.count, 0);
  return data
    .map((item) => ({
      rootId: item.rootId,
      rootIdName: item.rootIdName,
      percentage: total ? (item.count / total) * 100 : 0,
      topEmotions: item.topEmotions,
    }))
    .sort((a, b) => b.percentage - a.percentage);
};

const MyFilling = ({ emotionData = [] }: MyFillingDataProps) => {
  const { data: moods } = useMoods();
  console.log('🚀 ~ file: MyFilling.tsx:47 ~ MyFilling ~ moods:', moods);

  if (emotionData.length === 0 || !moods) {
    return (
      <View style={styles.container}>
        <Text
          style={[FONTS.B2, { color: colorWithOpacity(COLORS.WHITE, 0.5) }]}
        >
          No data available
        </Text>
      </View>
    );
  }

  const percentages = calculatePercentages(emotionData);
  const mostFrequent = percentages[0];

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <SmileySvg />
        <Text style={styles.buttonText}>내 감정</Text>
      </View>
      <Text style={styles.bodyText}>
        <Text
          style={[
            styles.highlight,
            { color: emotionColor[mostFrequent.rootIdName] },
          ]}
        >
          {translateLabel(mostFrequent.rootIdName, moods)}
          <Text style={{ color: colorWithOpacity(COLORS.WHITE, 0.5) }}>
            {' '}
            중
          </Text>
          {'\n'}
          {mostFrequent.topEmotions.join(', ')}
        </Text>
        감정을 많이 느꼇어요.
      </Text>
      <View style={styles.iconContainer}>
        <EmotionIcon
          percentage={mostFrequent.percentage}
          color={emotionColor[mostFrequent.rootIdName]}
          emotion={translateLabel(mostFrequent.rootIdName, moods)}
        />
      </View>
    </View>
  );
};

export default MyFilling;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.GREY3,
    height: 250,
    width: containerWidth,
    borderRadius: 12,
    paddingTop: 20,
    paddingHorizontal: 10,
    gap: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colorWithOpacity(COLORS.WHITE, 0.1),
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  buttonText: {
    color: COLORS.PURPLE_BOX,
    ...FONTS.BTN,
  },
  bodyText: {
    marginTop: 4,
    color: colorWithOpacity(COLORS.WHITE, 0.5),
    textAlign: 'center',
    ...FONTS.B2,
  },
  highlight: {
    fontWeight: 'bold',
    ...FONTS.B2,
  },

  iconContainer: {
    paddingTop: 8,
  },
});

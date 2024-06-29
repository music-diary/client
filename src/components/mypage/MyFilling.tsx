import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import { SmileySvg } from 'assets/images/mypage';
import Fonts from '@/constants/Fonts';
import EmotionIcon from '@/components/mypage/EmotionIcon';
import { colorWithOpacity } from '@/utils/color-utils';

const containerWidth = Dimensions.get('window').width / 2 - 24;

interface FillingData {
  filling: string;
  count: number;
}

interface MyFillingDataProps {
  fillingData: FillingData[];
}

const calculatePercentages = (
  data: FillingData[],
): Array<{ filling: string; percentage: number }> => {
  const total = data.reduce((acc, item) => acc + item.count, 0);
  return data
    .map((item) => ({
      filling: item.filling,
      percentage: (item.count / total) * 100,
    }))
    .sort((a, b) => b.percentage - a.percentage);
};

const fillingColors: Record<string, string> = {
  좋았어요: Colors.green,
  괜찮아요: Colors.purple,
  슬펐어요: Colors.blue,
};

const MyFilling = ({ fillingData }: MyFillingDataProps) => {
  if (fillingData.length === 0) {
    return null; // No data
  }

  const percentages = calculatePercentages(fillingData);
  const mostFrequent = percentages[0];
  const otherFillings = percentages.slice(1);

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
            { color: fillingColors[mostFrequent.filling] },
          ]}
        >
          {mostFrequent.filling}
          {'\n'}
        </Text>
        감정을 많이 느꼇어요.
      </Text>
      <View style={styles.iconContainer}>
        <EmotionIcon
          percentage={mostFrequent.percentage}
          color={fillingColors[mostFrequent.filling]}
          emotion={mostFrequent.filling}
        />
      </View>
      <View style={styles.bottomContainer}>
        {otherFillings.map((fillingData, index) => (
          <View key={index} style={styles.dot}>
            <View
              style={[
                styles.circleContainer,
                { backgroundColor: fillingColors[fillingData.filling] },
              ]}
            />
            <Text
              style={styles.btnText}
            >{` ${fillingData.percentage.toFixed(0)}%`}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default MyFilling;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey3,
    height: 250,
    width: containerWidth,
    borderRadius: 12,
    paddingTop: 20,
    paddingHorizontal: 10,
    gap: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colorWithOpacity(Colors.white, 0.1),
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  buttonText: {
    color: Colors.purple_box,
    ...Fonts.btn,
  },
  bodyText: {
    marginTop: 4,
    color: colorWithOpacity(Colors.white, 0.5),
    textAlign: 'center',
    ...Fonts.b2,
  },
  highlight: {
    fontWeight: 'bold',
    ...Fonts.b2,
  },
  bottomContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  dot: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    paddingTop: 8,
  },
  circleContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  btnText: {
    color: colorWithOpacity(Colors.white, 0.5),
    ...Fonts.btn,
  },
});

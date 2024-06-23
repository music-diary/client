import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colorWithOpacity } from '@/utils/colorUtils';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

interface CircularGraphProps {
  month: number;
  diaryCount: number;
}

const CircularGraph = ({ month, diaryCount }: CircularGraphProps) => {
  const radius = 50;
  const strokeWidth = 6;
  const center = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;

  // Get the number of days in the month
  const daysInMonth = new Date(2024, month, 0).getDate();

  // Calculate the percentage
  const percentage = Math.min((diaryCount / daysInMonth) * 100, 100);
  const progressStrokeDashoffset =
    circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg height={center * 2} width={center * 2}>
        <Circle
          stroke="#ABAAAE"
          fill="none"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={Colors.purple}
          fill="none"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progressStrokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${center}, ${center}`}
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.numberText}>{diaryCount}개</Text>
        <Text style={styles.percentText}>{Math.round(percentage)}%</Text>
      </View>
    </View>
  );
};

export default CircularGraph;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
  },
  textContainer: {
    position: 'absolute',
    bottom: 33,
    alignItems: 'center',
  },
  numberText: {
    color: Colors.white,
    ...Fonts.h1,
  },
  percentText: {
    marginTop: 5,
    color: colorWithOpacity(Colors.white, 0.5),
    ...Fonts.btn,
  },
});

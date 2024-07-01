import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import { COLORS, FONTS } from '@/constants';

interface PreferenceGraphProps {
  data: Array<{ label: string; count: number; color: string }>;
  total: number;
}

const CircularGraph = ({ data, total }: PreferenceGraphProps) => {
  const radius = 50;
  const strokeWidth = 10;
  const center = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;

  return (
    <View style={styles.container}>
      <Svg height={center * 2} width={center * 2}>
        {data.map((item, index) => {
          const percentage = item.count / total;
          const strokeDasharray = `${circumference * percentage} ${circumference}`;
          const strokeDashoffset =
            -circumference *
            data
              .slice(0, index)
              .reduce((acc, curr) => acc + curr.count / total, 0);

          return (
            <Circle
              key={item.label}
              stroke={item.color}
              fill="none"
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              rotation="-90"
              origin={`${center}, ${center}`}
            />
          );
        })}
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.btnText}>작성 일기</Text>
        <Text style={styles.totalText}>{`${total}개`}</Text>
      </View>
    </View>
  );
};

export default CircularGraph;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
  },
  textContainer: {
    position: 'absolute',
    bottom: 38,
    alignItems: 'center',
  },
  btnText: {
    color: COLORS.GREY1,
    ...FONTS.BTN,
  },
  totalText: {
    marginTop: 5,
    color: COLORS.WHITE,
    ...FONTS.B1_SB,
  },
});

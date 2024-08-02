import React from 'react';
import { Svg, Path, Rect, Defs, ClipPath } from 'react-native-svg';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS, FONTS } from '@/constants';

interface HappyIconProps {
  percentage: number;
  color: string;
  emotion: string;
}

const EmotionIcon = ({ percentage, color, emotion }: HappyIconProps) => {
  const iconSize = 44;
  const clipHeight = iconSize - (iconSize * percentage) / 100;
  console.log(emotion);
  const pathD =
    // 좋았어요, 슬펐어요, 괜찮아요에 따라 Path의 d값을 다르게 설정
    emotion === '좋았어요!'
      ? 'M35.5002 7.00024C35.5002 7.7415 35.385 8.45585 35.1715 9.12635C35.6016 9.04373 36.0457 9.00047 36.4999 9.00047C40.3659 9.00047 43.4999 12.1345 43.4999 16.0005C43.4999 18.5468 42.1403 20.7756 40.1074 22.0005C42.1404 23.2254 43.5 25.4542 43.5 28.0006C43.5 31.8666 40.366 35.0006 36.5 35.0006C36.0459 35.0006 35.6019 34.9574 35.1719 34.8748C35.3852 35.545 35.5003 36.259 35.5003 36.9999C35.5003 40.8659 32.3663 43.9999 28.5003 43.9999C25.554 43.9999 23.0329 42.1796 22.0001 39.6023C20.9673 42.1796 18.4461 43.9999 15.4998 43.9999C11.6338 43.9999 8.49982 40.8659 8.49982 36.9999C8.49982 36.259 8.61492 35.545 8.82821 34.8748C8.39822 34.9574 7.95423 35.0006 7.50014 35.0006C3.63415 35.0006 0.50014 31.8666 0.50014 28.0006C0.50014 25.4543 1.85974 23.2255 3.89259 22.0006C1.85966 20.7757 0.5 18.5469 0.5 16.0005C0.5 12.1345 3.63401 9.00047 7.5 9.00047C7.95455 9.00047 8.39898 9.04379 8.82939 9.12654C8.61585 8.45598 8.50062 7.74157 8.50062 7.00024C8.50062 3.13425 11.6346 0.000244141 15.5006 0.000244141C18.4465 0.000244141 20.9673 1.81997 22.0004 4.39665C23.0335 1.81997 25.5543 0.000244141 28.5002 0.000244141C32.3662 0.000244141 35.5002 3.13425 35.5002 7.00024ZM21.178 11.8894C19.4467 11.5874 17.9679 10.5666 17.1249 9.7238L18.0926 8.75582C18.7994 9.46237 20.0358 10.3007 21.4132 10.541C22.7344 10.7715 24.2387 10.4666 25.6394 8.79956L26.6873 9.68006C24.9637 11.7314 22.9656 12.2012 21.178 11.8894Z'
      : emotion === '그저그래요'
        ? 'M35.2252 4.79712L22 0.5L8.77486 4.79712L0.601257 16.0471V29.9529L8.77486 41.2029L22 45.5L35.2252 41.2029L43.3988 29.9529V16.0471L35.2252 4.79712ZM18.3373 12.5346H25.4884V11.1393H18.3373V12.5346Z'
        : emotion === '별로였어요'
          ? 'M42.7429 31.7588L36.4917 25.5077L44.0001 17.9993L26.0008 0L18.4925 7.50838L12.9812 1.99713L1.07653 13.9018L6.58778 19.4131L0 26.0008L17.9993 44.0001L24.5871 37.4123L30.8382 43.6635L42.7429 31.7588ZM21.3097 11.6449C22.9347 11.9283 24.3226 12.8864 25.1138 13.6775L24.2056 14.586C23.5422 13.9228 22.3818 13.136 21.0889 12.9104C19.8488 12.6941 18.4369 12.9803 17.1223 14.5449L16.1387 13.7185C17.7565 11.7931 19.6319 11.3522 21.3097 11.6449Z'
          : '';

  return (
    <View style={styles.iconContainer}>
      <Svg width="100" height="100" viewBox={`0 0 ${iconSize} ${iconSize}`}>
        <Defs>
          <ClipPath id="clip">
            <Rect x="0" y={clipHeight} width={iconSize} height={iconSize} />
          </ClipPath>
        </Defs>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d={pathD}
          fill={COLORS.CONTENTS_LIGHT}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          clipPath="url(#clip)"
          d={pathD}
          fill={color}
        />
        <Rect
          x="0"
          y={clipHeight - 0.2}
          width={iconSize}
          height="0.5"
          fill="none"
          stroke="grey"
          strokeWidth={0.5}
          strokeDasharray="1.5"
        />
      </Svg>
      <Text style={styles.percentageText}>{Math.round(percentage)}%</Text>
    </View>
  );
};

export default EmotionIcon;

const styles = StyleSheet.create({
  iconContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  percentageText: {
    position: 'absolute',
    top: 40,
    color: COLORS.GREY3,
    ...FONTS.H1,
  },
});

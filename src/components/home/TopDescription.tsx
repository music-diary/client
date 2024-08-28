import React, { useEffect, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { COLORS, FONTS } from '@/constants';
import { formatKST } from '@/utils/date-utils';

// 클릭 시 일기쓰러 가기로 이동
const handleDiaryPress = () => {
  router.push('/(main)/diary');
};

const lessThanTwo = ({ name }: { name: string }) => (
  <View style={styles.topDescription}>
    <Text style={styles.topMent}>
      {name}님,{'\n'}오늘 하루를{' '}
      <Text style={styles.highlightText}>
        노래와{'\n'}함께 기록{''}
      </Text>
      해보세요!
    </Text>
    <TouchableOpacity style={styles.topButton} onPress={handleDiaryPress}>
      <Text style={styles.topButtonText}>일기쓰러 가기</Text>
    </TouchableOpacity>
  </View>
);

const moreThanTwo = ({ count, name }: { count: number; name: string }) => {
  const date = new Date();
  const koreaTime = formatKST(date);
  const month = parseInt(koreaTime.split('-')[1], 10);

  return (
    <View style={styles.topDescription}>
      <Text style={styles.topMent}>
        {name}님은 {month}월 한달{'\n'}
        <Text style={styles.highlightText}>
          {count}개의 하루{''}
        </Text>
        를{'\n'}노래와 함께 했어요
      </Text>
      <TouchableOpacity style={styles.topButton} onPress={handleDiaryPress}>
        <Text style={styles.topButtonText}>일기쓰러 가기</Text>
      </TouchableOpacity>
    </View>
  );
};

const TopDescription = ({ count, name }: { count: number; name: string }) => {
  const [showLessThanTwo, setShowLessThanTwo] = useState(count < 2);
  const fadeAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    if (count >= 2) {
      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setShowLessThanTwo(true);

          setTimeout(() => {
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }).start();
          }, 100);
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [count, fadeAnim]);

  if (count <= 2) {
    return (
      <Animated.View style={[styles.topDescription, { opacity: fadeAnim }]}>
        {showLessThanTwo ? lessThanTwo({ name }) : moreThanTwo({ count, name })}
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.topDescription, { opacity: fadeAnim }]}>
      {showLessThanTwo ? moreThanTwo({ count, name }) : lessThanTwo({ name })}
    </Animated.View>
  );
};

export default TopDescription;

const styles = StyleSheet.create({
  topDescription: {
    paddingVertical: 20,
    alignItems: 'flex-start',
  },
  topMent: {
    color: COLORS.WHITE,
    fontFamily: 'pret-b',
    fontSize: 20,
    lineHeight: 28,
  },
  highlightText: {
    color: COLORS.GREEN,
  },
  topButton: {
    backgroundColor: COLORS.WHITE,
    marginTop: 13,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 23,
  },
  topButtonText: {
    color: COLORS.PURPLE,
    ...FONTS.B2_SB,
  },
});

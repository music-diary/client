import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { COLORS, FONTS } from '@/constants';

const NoArchiveData = () => {
  const onPress = () => {
    router.navigate({ pathname: '/diary', params: { stateInit: 'true' } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.middleText}>
        아직 분석할 음악 일기가 없어요.{'\n'}오늘을 기록하러 가볼까요?
      </Text>
      <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
        <Text style={styles.btnText}>일기쓰러 가기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoArchiveData;

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleText: {
    color: 'white',
    textAlign: 'center',
    ...FONTS.B2,
  },
  btnContainer: {
    marginTop: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 23,
    backgroundColor: COLORS.PURPLE,
  },
  btnText: {
    color: 'white',
    ...FONTS.B2_SB,
  },
});

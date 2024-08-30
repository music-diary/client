import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { COLORS, FONTS } from '@/constants';

const NoDiaryStatistic = ({ dateString }: { dateString: string }) => {
  const onPress = () => {
    router.navigate({ pathname: '/diary', params: { stateInit: 'true' } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.middleText}>
        {dateString}엔 음악일기를 작성하지 않았어요.
        {'\n'}일기 작성 이후 통계를 볼 수 있어요.
      </Text>
      <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
        <Text style={styles.btnText}>일기쓰러 가기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoDiaryStatistic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
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

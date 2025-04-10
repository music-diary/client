import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { COLORS, FONTS } from '@/constants';
import { colorWithOpacity } from '@/utils/color-utils';
import useDiaryStore from '@/store/useDiaryStore';

const containerWidth = Dimensions.get('window').width - 32;

const MoreInfo = () => {
  const { hasDiaryForToday } = useDiaryStore();
  const onPress = () => {
    if (hasDiaryForToday) {
      router.navigate({ pathname: '/(main)/home/diary-limit' });
    } else {
      router.navigate({ pathname: '/diary', params: { stateInit: 'true' } });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.b2Text}>더 정확한 분석을 위해</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.b2sbText}>일기쓰러 가기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MoreInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.GREY3,
    height: 60,
    width: containerWidth,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: colorWithOpacity(COLORS.WHITE, 0.1),
  },
  b2Text: {
    color: COLORS.WHITE,
    ...FONTS.B2,
  },
  b2sbText: {
    color: COLORS.WHITE,
    ...FONTS.B2_SB,
  },
  button: {
    backgroundColor: COLORS.PURPLE,
    borderRadius: 22,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});

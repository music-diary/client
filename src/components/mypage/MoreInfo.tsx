import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

const containerWidth = Dimensions.get('window').width - 32;

const MoreInfo = () => {
  const onPress = () => {
    router.navigate('(main)/diary');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.b2Text}>더 정확한 분석을 위해</Text>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.b2sbText}>일기쓰러 가기</Text>
      </Pressable>
    </View>
  );
};

export default MoreInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey3,
    height: 60,
    width: containerWidth,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
  },
  b2Text: {
    color: Colors.white,
    ...Fonts.b2,
  },
  b2sbText: {
    color: Colors.white,
    ...Fonts.b2_sb,
  },
  button: {
    backgroundColor: Colors.purple,
    borderRadius: 22,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});

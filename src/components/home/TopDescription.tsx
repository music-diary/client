import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

const TopDescription = () => {
  return (
    <View style={styles.topDescription}>
      <Text style={styles.topMent}>
        Miya님,{'\n'}오늘 하루를{' '}
        <Text style={styles.highlightText}>
          노래와{'\n'}함께 기록{''}
        </Text>
        해보세요!
      </Text>
      <TouchableOpacity style={styles.topButton}>
        <Text style={styles.topButtonText}>일기쓰러 가기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopDescription;

const styles = StyleSheet.create({
  topDescription: {
    paddingVertical: 30,
    alignItems: 'flex-start',
  },
  topMent: {
    lineHeight: 28,
    color: Colors.white,
    ...Fonts.h1,
  },
  highlightText: {
    color: Colors.green,
  },
  topButton: {
    backgroundColor: Colors.white,
    marginTop: 13,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 23,
  },
  topButtonText: {
    color: Colors.purple,
    ...Fonts.b2_sb,
  },
});

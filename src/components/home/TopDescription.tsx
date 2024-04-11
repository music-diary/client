import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

const formatKST = (date: Date) => {
  const offset = 1000 * 60 * 60 * 9; // UTC+9
  const koreaDate = new Date(date.getTime() + offset);
  return koreaDate.toISOString().split('T')[0];
};

const lessThanTwo = ({ name }: { name: string }) => {
  return (
    <View style={styles.topDescription}>
      <Text style={styles.topMent}>
        {name}님,{'\n'}오늘 하루를{' '}
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
      <TouchableOpacity style={styles.topButton}>
        <Text style={styles.topButtonText}>일기쓰러 가기</Text>
      </TouchableOpacity>
    </View>
  );
};

const TopDescription = ({ count, name }: { count: number; name: string }) => {
  if (count < 2) {
    return lessThanTwo({ name });
  }
  return moreThanTwo({ count, name });
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

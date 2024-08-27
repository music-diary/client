import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS } from '@/constants';

const TopDescriptionTemplate = ({
  count,
  name,
}: {
  count: number;
  name: string;
}) => {
  return (
    <View style={styles.topDescription}>
      <Text style={styles.topMent}>
        {name}님은 8월 한달{'\n'}
        <Text style={styles.highlightText}>{count}개의 하루</Text>를{'\n'}노래와
        함께 했어요
      </Text>
      <TouchableOpacity style={styles.topButton}>
        <Text style={styles.topButtonText}>일기쓰러 가기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopDescriptionTemplate;

const styles = StyleSheet.create({
  topDescription: {
    paddingVertical: 40,
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

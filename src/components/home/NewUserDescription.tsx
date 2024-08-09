import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { COLORS, FONTS } from '@/constants';

const NewUserDescription = ({ description }: { description: string }) => {
  // 클릭 시 일기쓰러 가기로 이동
  const handleDiaryPress = () => {
    router.push('/(main)/diary');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleDiaryPress}>
      <Text style={styles.descriptionText}>{description}</Text>
      <MaterialIcons name="arrow-outward" size={20} color={COLORS.WHITE} />
    </TouchableOpacity>
  );
};

export default NewUserDescription;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BG_LIGHT,
    borderRadius: 10,
    marginTop: 16,
    marginRight: 16,
    paddingVertical: 22,
  },
  descriptionText: {
    color: COLORS.WHITE,
    paddingRight: 5,
    ...FONTS.B2,
  },
});

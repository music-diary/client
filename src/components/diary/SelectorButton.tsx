import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS } from '@/constants';
import { type Mood } from '@/models/types';
import { emotionColor } from '@/constants/data';

interface SelectorButtonProps {
  moodName: Mood;
  type: string;
  onPress?: () => void;
  isSelected?: boolean;
}

const SelectorButton = ({
  moodName,
  type,
  onPress,
  isSelected,
}: SelectorButtonProps) => {
  const buttonStyle = {
    backgroundColor: isSelected
      ? emotionColor[moodName as keyof typeof emotionColor]
      : 'transparent',
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={[styles.opacityView, buttonStyle]} />
      <Text
        style={[
          styles.type,
          isSelected && moodName === 'good' && { color: COLORS.BLACK },
        ]}
      >
        {type}
      </Text>
    </TouchableOpacity>
  );
};

export default SelectorButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 38,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
  },
  type: {
    justifyContent: 'center',
    alignItems: 'center',
    color: COLORS.WHITE,
    ...FONTS.B2_SB,
  },
  opacityView: {
    borderRadius: 38,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

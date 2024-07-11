import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS } from '@/constants';

interface TopicButtonProps {
  label: string;
  emoji: string;
  onPress?: () => void;
  isSelected?: boolean;
  disabled?: boolean;
}

const TopicButton = ({
  label,
  emoji,
  onPress,
  isSelected,
  disabled,
}: TopicButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled}
    >
      <View
        style={[
          styles.opacityView,
          isSelected ? { backgroundColor: COLORS.WHITE } : null,
        ]}
      />
      <View style={styles.emoji}>
        <Text>{emoji}</Text>
      </View>
      <Text style={[styles.label, isSelected ? { color: COLORS.BLACK } : null]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TopicButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 38,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emoji: {
    width: 20,
    height: 20,
    justifyContent: 'center',
  },
  label: {
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

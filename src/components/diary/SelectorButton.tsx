import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { type Mood } from '@/models/types';

interface SelectorButtonProps {
  mood: Mood;
  type: string;
  onPress?: () => void;
  isSelected?: boolean;
}

const SelectorButton = ({
  mood,
  type,
  onPress,
  isSelected,
}: SelectorButtonProps) => {
  const colorMap = {
    happy: Colors.green,
    soso: Colors.purple,
    bad: Colors.blue,
  };

  const buttonStyle = {
    backgroundColor: isSelected
      ? colorMap[mood as keyof typeof colorMap]
      : 'transparent',
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={[styles.opacityView, buttonStyle]} />
      <Text
        style={[
          styles.type,
          isSelected && mood === 'happy' && { color: Colors.black },
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
    borderColor: Colors.white,
  },
  type: {
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.white,
    ...Fonts.b2_sb,
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

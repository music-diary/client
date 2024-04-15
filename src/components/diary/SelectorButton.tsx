import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

interface SelectorButtonProps {
  type: string;
  onPress: () => void;
  isSelected?: boolean;
  color?: { backgroundColor: string; opacity?: number };
}

const SelectorButton = ({
  type,
  onPress,
  isSelected,
  color,
}: SelectorButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button]}>
      <View
        style={[styles.opacityView, isSelected && color ? { ...color } : null]}
      />
      <Text
        style={[
          styles.type,
          isSelected &&
          !color?.opacity &&
          color?.backgroundColor === Colors.green
            ? { color: Colors.black }
            : null,
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

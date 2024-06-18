import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

interface TopicButtonProps {
  type: string;
  emoji: string;
  onPress?: () => void;
  isSelected?: boolean;
}

const TopicButton = ({
  type,
  emoji,
  onPress,
  isSelected,
}: TopicButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View
        style={[
          styles.opacityView,
          isSelected ? { backgroundColor: Colors.white } : null,
        ]}
      />
      <View style={styles.emoji}>
        <Text>{emoji}</Text>
      </View>
      <Text style={[styles.type, isSelected ? { color: Colors.black } : null]}>
        {type}
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
    borderColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emoji: {
    width: 20,
    height: 20,
    justifyContent: 'center',
  },
  type: {
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

import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '@/constants';

interface BodyNavigatorProps {
  content: string;
  onPress?: () => void;
}

const BodyNavigator = ({ content, onPress }: BodyNavigatorProps) => {
  return (
    <TouchableOpacity style={styles.bodyRoute} onPress={onPress}>
      <Text style={styles.textB2}>{content}</Text>
      <MaterialIcons name="arrow-forward-ios" size={14} color={Colors.WHITE} />
    </TouchableOpacity>
  );
};

export default BodyNavigator;

const styles = StyleSheet.create({
  bodyRoute: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textB2: {
    color: Colors.WHITE,
    ...Fonts.B1,
  },
});

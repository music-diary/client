import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

interface BodyNavigatorProps {
  content: string;
  onPress?: () => void; 
}

const BodyNavigator = ({ content, onPress }: BodyNavigatorProps) => {
  return (
    <TouchableOpacity style={styles.bodyRoute} onPress={onPress}>
      <Text style={styles.textb2}>{content}</Text>
      <MaterialIcons name="arrow-forward-ios" size={14} color={Colors.white} />
    </TouchableOpacity>
  );
};

export default BodyNavigator;

const styles = StyleSheet.create({
  bodyRoute: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textb2: {
    color: Colors.white,
    ...Fonts.b2,
  },
});

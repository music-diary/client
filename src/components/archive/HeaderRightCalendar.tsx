import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';

const HeaderRightCalendar = () => {
  const onPress = () => {
    router.push('/(main)/archive/calendar'); // Do something
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name="calendar" size={18} color={Colors.white} />
    </TouchableOpacity>
  );
};

export default HeaderRightCalendar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(250, 250, 250, 0.15)',
    height: 35,
    width: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
});

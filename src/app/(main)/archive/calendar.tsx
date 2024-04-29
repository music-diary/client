import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';

const calendar = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: 'white' }}>캘린더 추후 추가 예정</Text>
    </View>
  );
};

export default calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});

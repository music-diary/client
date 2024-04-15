import { StyleSheet, Text, View } from 'react-native';
import Fonts from '@/constants/Fonts';
import Colors from '@/constants/Colors';

const HeaderTitle = () => {
  return (
    <View>
      <Text style={styles.title}>일기쓰기</Text>
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  title: {
    color: Colors.white,
    ...Fonts.h1,
  },
});

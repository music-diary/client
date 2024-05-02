import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

const HeaderTitle = ({ title }: { title: string }) => {
  return (
    <View>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  titleText: {
    color: Colors.white,
    ...Fonts.h1,
  },
});

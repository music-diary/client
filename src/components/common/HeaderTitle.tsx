import { StyleSheet, Text, View } from 'react-native';
import Fonts from '@/constants/Fonts';
import Colors from '@/constants/Colors';

const HeaderTitle = ({ title }: { title: string }) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  title: {
    color: Colors.WHITE,
    ...Fonts.H1,
  },
});

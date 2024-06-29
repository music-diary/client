import { StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts } from '@/constants';

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

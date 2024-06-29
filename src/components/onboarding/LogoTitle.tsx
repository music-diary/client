import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';

const LogoTitle = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Name.</Text>
    </View>
  );
};

export default LogoTitle;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    color: Colors.WHITE,
    fontFamily: 'pret-b',
    fontSize: 24,
  },
});

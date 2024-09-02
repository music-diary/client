import { StyleSheet, View } from 'react-native';
import { LogoHeaderSvg } from 'assets/images/common';

const LogoTitle = () => {
  return (
    <View style={styles.container}>
      <LogoHeaderSvg />
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
});

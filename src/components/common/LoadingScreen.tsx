import { SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '@/constants';

const LoadingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="small" color={COLORS.WHITE} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
  },
});

export default LoadingScreen;

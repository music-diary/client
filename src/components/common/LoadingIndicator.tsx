import { SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '@/constants';

const LoadingIndicator = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="small" color={COLORS.WHITE} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 28,
    backgroundColor: COLORS.BLACK,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIndicator;

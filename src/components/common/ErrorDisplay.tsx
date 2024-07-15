import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay = ({ message }: ErrorDisplayProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.errorText}>{message}</Text>
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
  errorText: {
    color: COLORS.RED,
    ...FONTS.B1,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ErrorDisplay;

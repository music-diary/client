import { useRouter } from 'expo-router';
import { TouchableOpacity, StyleSheet } from 'react-native';
import BackIcon from 'assets/images/commonIcon/Back.svg';

function CustomBackButton() {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
      <BackIcon />
    </TouchableOpacity>
  );
}

export default CustomBackButton;

const styles = StyleSheet.create({
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
  },
});

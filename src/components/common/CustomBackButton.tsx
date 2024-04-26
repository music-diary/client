import { useRouter } from 'expo-router';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function CustomBackButton() {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
      <MaterialIcons name="arrow-back-ios" size={20} color="white" />
    </TouchableOpacity>
  );
}

export default CustomBackButton;

const styles = StyleSheet.create({
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

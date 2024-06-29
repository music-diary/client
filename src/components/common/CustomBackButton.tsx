import { useRouter } from 'expo-router';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { BackSvg } from 'assets/images/common';

interface CustomBackButtonProps {
  onPress?: () => void;
}

function CustomBackButton({ onPress }: CustomBackButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity style={styles.backButton} onPress={handlePress}>
      <BackSvg />
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

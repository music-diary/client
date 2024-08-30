import { usePathname, useRouter } from 'expo-router';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { BackSvg } from 'assets/images/common';

interface CustomBackButtonProps {
  onPress?: () => void;
}

function CustomBackButton({ onPress }: CustomBackButtonProps) {
  const router = useRouter();
  const path = usePathname();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      if (path === '/diary/write') {
        // 뒤로가기 버튼 누름(기존 감정 선택 정보를 초기화 하지 않기 위해서)
        router.navigate('/diary');
      } else {
        router.back();
      }
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

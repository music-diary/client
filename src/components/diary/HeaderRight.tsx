import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useModalStore } from '@/store/useModalStore';

interface HeaderRightProps {
  onPressClose?: () => void;
  onPressAction?: () => void;
}

const HeaderRight = ({ onPressClose, onPressAction }: HeaderRightProps) => {
  const { openModal } = useModalStore();
  const pathname = usePathname();

  const handleXButton = () => {
    if (onPressClose) {
      onPressClose(); // 외부에서 받은 핸들러 실행
      return;
    }

    const cancelRoutes = ['/diary', '/diary/write', '/diary/music'];

    if (cancelRoutes.includes(pathname)) {
      openModal('write-cancel');
    } else if (pathname === '/diary/template') {
      router.back();
    } else if (pathname === '/diary/card') {
      openModal('card-cancel');
    }
  };

  return (
    <View style={styles.container}>
      {pathname === '/diary/card' && onPressAction && (
        <MaterialCommunityIcons
          name="arrow-collapse-down"
          size={20}
          color="white"
          onPress={onPressAction}
        />
      )}
      <AntDesign size={22} name="close" color="white" onPress={handleXButton} />
    </View>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
});

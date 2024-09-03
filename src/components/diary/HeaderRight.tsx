import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useModalStore } from '@/store/useModalStore';

interface HeaderRightProps {
  onPress?: () => void;
}

const HeaderRight = ({ onPress }: HeaderRightProps) => {
  const { openModal } = useModalStore();
  const pathname = usePathname();

  // const handleDraft = () => router.push('/diary/draft');

  /**
   * TODO: diary/card 부분 확인 후 수정예정
   */
  const handleXButton = () => {
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
      {pathname === '/diary/card' && onPress && (
        <MaterialCommunityIcons
          name="arrow-collapse-down"
          size={20}
          color="white"
          onPress={onPress}
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

import { AntDesign } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useModalStore } from '@/store/useModalStore';
import { StoringSvg } from 'assets/images/diary';

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
    } else {
      router.replace('/(main)');
    }
  };

  /**
   * TODO:
   *
   * 주석 및 임시저장 삭제해야함
   */
  return (
    <View style={styles.container}>
      {/* {pathname.includes('/diary') && (
        <TouchableOpacity onPress={handleDraft}>
          <StoringSvg />
        </TouchableOpacity>
      )} */}
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

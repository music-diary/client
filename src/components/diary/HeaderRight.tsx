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

  const handleXButton = () => {
    if (pathname === '/diary/write') {
      openModal('write-cancel');
      return;
    }
    if (pathname === '/diary/music') {
      openModal('music-cancel');
      return;
    }

    return router.push('/(main)');
  };

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

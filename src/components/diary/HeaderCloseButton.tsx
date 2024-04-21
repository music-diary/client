import { AntDesign } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { useModalStore } from '@/store/useModalStore';

interface HeaderCloseButtonProps {
  onPress?: () => void;
}

const HeaderCloseButton = ({ onPress }: HeaderCloseButtonProps) => {
  const { openModal } = useModalStore();
  const pathname = usePathname();
  const handleXButton = () => {
    if (pathname === '/diary/write') {
      openModal('write-cancel');
      return;
    }
    return router.push('/(main)');
  };

  return (
    <AntDesign size={24} name="close" color="white" onPress={handleXButton} />
  );
};

export default HeaderCloseButton;

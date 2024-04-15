import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

const HeaderCloseButton = () => {
  return (
    <AntDesign
      size={24}
      name="close"
      color="white"
      onPress={() => router.push('/(main)')}
    />
  );
};

export default HeaderCloseButton;

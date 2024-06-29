import { type ElementType, useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSplashStore } from '@/store/useSplashStore';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import useToastStore from '@/store/useToastStore';
import CustomToast from './CustomToast';

interface CustomSplashProps {
  name: string;
  description: string;
  toastMessage?: string;
  svg: ElementType;
  onClose: () => void;
}

const CustomSplash = ({
  name,
  description,
  toastMessage,
  svg: SvgComponent,
  onClose,
}: CustomSplashProps) => {
  const { showToast } = useToastStore();
  const [isVisible, setIsVisible] = useState(false);
  const { activeSplash } = useSplashStore();

  useEffect(() => {
    if (activeSplash === name) {
      setIsVisible(true);
      if (toastMessage) {
        showToast(toastMessage, 1500);
      }
    }
  }, [activeSplash]);

  const handlePress = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="fade">
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.splashContainer}>
          <SvgComponent style={styles.image} />
          <Text style={styles.text}>{description}</Text>
        </View>
      </TouchableWithoutFeedback>
      <CustomToast />
    </Modal>
  );
};

export default CustomSplash;

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BLACK,
    gap: 50,
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    textAlign: 'center',
    color: Colors.WHITE,
    ...Fonts.T1,
  },
});

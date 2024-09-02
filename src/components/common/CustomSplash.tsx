import { type ElementType, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import { useSplashStore } from '@/store/useSplashStore';
import { COLORS, FONTS } from '@/constants';
import useToastStore from '@/store/useToastStore';
import CustomToast from './CustomToast';

interface CustomSplashProps {
  name: string;
  description: string;
  toastMessage?: string;
  svg: ElementType;
  onClose: () => void;
  progressBar?: boolean;
}

const CustomSplash = ({
  name,
  description,
  toastMessage,
  svg: SvgComponent,
  onClose,
  progressBar = false,
}: CustomSplashProps) => {
  const { showToast } = useToastStore();
  const [isVisible, setIsVisible] = useState(false);
  const { activeSplash } = useSplashStore();
  const animation = useRef(new Animated.Value(0)).current; // 애니메이션 값
  const [progress, setProgress] = useState(0); // 프로그레스 값을 위한 상태

  useEffect(() => {
    if (progressBar) {
      const listener = animation.addListener(({ value }) => {
        setProgress(value); // 프로그레스 값을 상태로 업데이트
      });

      // 애니메이션 시작
      Animated.timing(animation, {
        toValue: 1, // 최종 값 (1은 100%)
        duration: 4000, // 4초 동안 애니메이션
        useNativeDriver: false, // Progress.Bar는 네이티브 드라이버를 사용하지 않음
      }).start();

      return () => {
        animation.removeListener(listener); // 컴포넌트가 언마운트될 때 리스너 제거
      };
    }
  }, [animation, progressBar]);

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
          {progressBar && (
            <Progress.Bar
              progress={progress}
              width={200}
              height={6}
              color={COLORS.PURPLE}
              unfilledColor={COLORS.GREY1}
              borderWidth={0}
            />
          )}
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
    backgroundColor: COLORS.BLACK,
    gap: 32,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    color: COLORS.WHITE,
    ...FONTS.T1,
  },
});

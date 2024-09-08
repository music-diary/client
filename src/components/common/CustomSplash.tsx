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
import { useGetUserInfo } from '@/api/hooks/useUsers';
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
  const { data: userInfo } = useGetUserInfo();

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
    }
  }, [activeSplash]);

  useEffect(() => {
    if (isVisible) {
      if (toastMessage) {
        setTimeout(() => {
          showToast(toastMessage);
          setTimeout(handlePress, 1500);
        }, 500);
      }
    }
  }, [isVisible]);

  const handlePress = () => {
    if (!progressBar) {
      setIsVisible(false);
      onClose();
    }
  };

  return (
    <Modal visible={isVisible} animationType="fade">
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.splashContainer}>
          <SvgComponent style={styles.image} />
          <Text style={styles.text}>{description}</Text>
          {progressBar && (
            <View style={styles.bottomView}>
              <Progress.Bar
                progress={progress}
                width={200}
                height={6}
                color={COLORS.PURPLE}
                unfilledColor={COLORS.GREY1}
                borderWidth={0}
              />
              <Text style={styles.progressDesc}>
                {userInfo?.name}님을 위한 음악을 고르고 있어요
              </Text>
            </View>
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
  bottomView: {
    gap: 12,
    alignItems: 'center',
  },
  progressDesc: {
    color: COLORS.PURPLE,
    ...FONTS.B2,
  },
});

import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants';
import { colorWithOpacity } from '@/utils/color-utils';
import TutorialContentTemplate from '@/components/template/TutorialContentTemplate';
import {
  TutorialFirstSvg,
  TutorialSecondSvg,
  TutorialThirdSvg,
  TutorialFourthSvg,
  TutorialFifthSvg,
} from 'assets/images/tutorial';
import { useAppStore } from '@/store/useAppStore';

const Tutorial = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const router = useRouter();
  const setFirstLaunch = useAppStore((state) => state.setFirstLaunch);

  const handleScreenPress = () => {
    if (currentStep === 5) {
      setFirstLaunch(false);
      router.replace('(onboarding)');
      setIsModalVisible(false);
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentStep((prevStep) => (prevStep < 5 ? prevStep + 1 : 1));
        Animated.timing(fadeAnim, {
          toValue: 1, // 다시 완전히 보임
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  // 각 단계별로 보여줄 SVG 선택
  const renderSvg = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.firstSvgContainer}>
            <TutorialFirstSvg />
          </View>
        );
      case 2:
        return (
          <View style={styles.secondSvgContainer}>
            <TutorialSecondSvg />
          </View>
        );
      case 3:
        return (
          <View style={styles.thirdSvgContainer}>
            <TutorialThirdSvg />
          </View>
        );
      case 4:
        return (
          <View style={styles.fourthSvgContainer}>
            <TutorialFourthSvg />
          </View>
        );
      case 5:
        return (
          <View style={styles.fifthSvgContainer}>
            <TutorialFifthSvg />
          </View>
        );
      default:
        return (
          <View style={styles.firstSvgContainer}>
            <TutorialFirstSvg />
          </View>
        );
    }
  };

  return (
    <>
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <Pressable style={styles.overlay} onPress={handleScreenPress} />
        <SafeAreaView style={styles.tutorialContainer} pointerEvents="none">
          <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
            {renderSvg()}
          </Animated.View>
        </SafeAreaView>
      </Modal>
      <SafeAreaView style={styles.topSafeArea} />
      <TouchableWithoutFeedback onPress={handleScreenPress}>
        <TutorialContentTemplate />
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  topSafeArea: {
    backgroundColor: COLORS.PURPLE,
  },
  overlay: {
    flex: 1,
    backgroundColor: colorWithOpacity(COLORS.BLACK, 0.7),
    zIndex: 1,
  },
  tutorialContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1000,
    pointerEvents: 'none',
  },
  firstSvgContainer: {
    position: 'absolute',
    right: 8,
    top: 90,
  },
  secondSvgContainer: {
    position: 'absolute',
    right: 8,
    top: 57,
  },
  thirdSvgContainer: {
    position: 'absolute',
    left: 28,
    top: 499.5,
  },
  fourthSvgContainer: {
    position: 'absolute',
    left: 16,
    top: 562,
  },
  fifthSvgContainer: {
    position: 'absolute',
    left: '50%',
    bottom: 5,
    transform: [{ translateX: -98 }],
  },
});

export default Tutorial;

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

const Tutorial = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const router = useRouter();

  const handleScreenPress = () => {
    if (currentStep === 5) {
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
        <View style={styles.tutorialContainer} pointerEvents="none">
          <Animated.View style={{ opacity: fadeAnim }}>
            {renderSvg()}
          </Animated.View>
        </View>
      </Modal>
      <SafeAreaView style={styles.topSafeArea} />
      {/* 아래 화면의 Content */}
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    pointerEvents: 'none',
  },
  firstSvgContainer: {
    position: 'absolute',
    right: 8,
    top: 140,
  },
  secondSvgContainer: {
    position: 'absolute',
    right: 8,
    top: 107,
  },
  thirdSvgContainer: {
    position: 'absolute',
    right: 79,
    top: 550,
  },
  fourthSvgContainer: {
    position: 'absolute',
    left: 16,
    top: 611,
  },
  fifthSvgContainer: {
    position: 'absolute',
    left: 89,
    top: 638,
  },
});

export default Tutorial;

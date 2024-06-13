import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text } from 'react-native';
import useToastStore from '@/store/useToastStore';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { colorWithOpacity } from '@/utils/colorUtils';

const { width, height } = Dimensions.get('window');

const CustomToast = () => {
  const { message, visible, hideToast, duration } = useToastStore();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(hideToast);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.toast,
          {
            opacity: fadeAnim,
            transform: [
              {
                scale: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.text}>{message}</Text>
      </Animated.View>
    </Animated.View>
  );
};

export default CustomToast;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: colorWithOpacity(Colors.black, 0.7), // dim background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  toast: {
    backgroundColor: Colors.grey3,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 32,
    zIndex: 1001,
    alignItems: 'center',
    ...Fonts.b2_sb,
  },
  text: {
    color: '#FFF',
    fontSize: 16,
  },
});

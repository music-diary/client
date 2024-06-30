import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text } from 'react-native';
import useToastStore from '@/store/useToastStore';
import { Colors, Fonts } from '@/constants';

const { width, height } = Dimensions.get('window');

const CustomToast = () => {
  const { message, visible, hideToast, duration } = useToastStore();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 800,
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
    width,
    height,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 100,
  },
  toast: {
    backgroundColor: Colors.GREY3,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 32,
    alignItems: 'flex-end',
    ...Fonts.B2_SB,
  },
  text: {
    color: Colors.WHITE,
    ...Fonts.B2_SB,
  },
});

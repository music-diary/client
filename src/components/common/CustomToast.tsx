import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text } from 'react-native';
import useToastStore from '@/store/useToastStore';
import { COLORS, FONTS } from '@/constants';
import { colorWithOpacity } from '@/utils/color-utils';

const { width, height } = Dimensions.get('window');

const CustomToast = ({ position = 'bottom' }: { position?: string }) => {
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
          justifyContent: position === 'center' ? 'center' : 'flex-end',
          paddingBottom: position === 'center' ? 200 : 100,
          backgroundColor:
            position === 'center'
              ? colorWithOpacity(COLORS.BLACK, 0.7)
              : 'transparent',
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
  },
  toast: {
    backgroundColor: COLORS.GREY3,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 32,
    alignItems: 'flex-end',
    ...FONTS.B2_SB,
  },
  text: {
    color: COLORS.WHITE,
    ...FONTS.B2_SB,
  },
});

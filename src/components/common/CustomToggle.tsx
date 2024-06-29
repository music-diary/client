import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, Easing, TouchableHighlight } from 'react-native';
import { Colors } from '@/constants';

interface CustomToggleProps {
  isToggled?: boolean; // 초기 토글 상태
  onToggleChange?: (state: boolean) => void; // 토글 상태 변경 이벤트
}

const CustomToggle = ({
  isToggled = false,
  onToggleChange,
}: CustomToggleProps) => {
  const [isOn, setIsOn] = useState(isToggled);
  const translateX = useState(new Animated.Value(isOn ? 9 : -9))[0];

  useEffect(() => {
    setIsOn(isToggled);
    Animated.timing(translateX, {
      toValue: isToggled ? 9 : -9,
      duration: 200,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [isToggled]);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onToggleChange) {
      onToggleChange(newState);
    }

    Animated.timing(translateX, {
      toValue: newState ? 10 : -10,
      duration: 200,
      easing: Easing.inOut(Easing.linear),
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableHighlight
      style={[
        styles.toggleButton,
        { backgroundColor: isOn ? Colors.PURPLE : '#969696' },
      ]}
      onPress={handleToggle}
      underlayColor={isOn ? Colors.PURPLE : '#969696'}
    >
      <Animated.View
        style={[
          styles.thumb,
          {
            transform: [{ translateX }],
            backgroundColor: isOn ? Colors.WHITE : Colors.PURPLE,
          },
        ]}
      />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    width: 42,
    height: 24,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default CustomToggle;

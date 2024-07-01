import React, { useEffect } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, FONTS } from '@/constants';

interface CustomCheckToggleProps {
  index: number; // index
  isSelected: boolean; // 선택 여부
  onToggleChange: (index: number) => void; // 토글 이벤트 핸들러
  description?: string; // 토글 설명
}

const CustomCheckToggle = ({
  index,
  isSelected = false,
  onToggleChange,
  description,
}: CustomCheckToggleProps) => {
  const animation = new Animated.Value(isSelected ? 1 : 0);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isSelected ? 1 : 0,
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [isSelected]);

  const toggleSwitch = () => {
    if (onToggleChange) {
      onToggleChange(index);
    }
  };

  const toggleContainerStyle = {
    ...styles.toggleContainer,
    backgroundColor: isSelected ? COLORS.PURPLE : COLORS.BLACK,
    borderColor: isSelected ? COLORS.PURPLE : COLORS.WHITE,
  };

  const toggleCircleBackgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.BLACK, COLORS.WHITE],
  });

  return (
    <TouchableOpacity style={styles.container} onPress={toggleSwitch}>
      <View style={toggleContainerStyle}>
        <Animated.View
          style={[
            styles.toggleCircle,
            { backgroundColor: toggleCircleBackgroundColor },
          ]}
        />
      </View>
      {description && <Text style={styles.text}>{description}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleContainer: {
    width: 20,
    height: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  toggleCircle: {
    width: 10,
    height: 10,
    borderRadius: 15,
  },
  text: {
    marginLeft: 6,
    color: COLORS.WHITE,
    ...FONTS.B1_SB,
  },
});

export default CustomCheckToggle;

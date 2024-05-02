import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

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
    backgroundColor: isSelected ? Colors.purple : Colors.black, 
    borderColor: isSelected ? Colors.purple : Colors.white,
  };

  const toggleCircleBackgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.black, Colors.white], 
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={toggleContainerStyle} onPress={toggleSwitch}>
        <Animated.View
          style={[
            styles.toggleCircle,
            { backgroundColor: toggleCircleBackgroundColor },
          ]}
        />
      </TouchableOpacity>
      {description && <Text style={styles.text}>{description}</Text>}
    </View>
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
    color: Colors.white,
    ...Fonts.b1_sb,
  },
});

export default CustomCheckToggle;

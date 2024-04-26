import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

interface CustomButtonProps {
  isActive: boolean; // 활성화 여부
  onPress?: () => void; // 클릭 이벤트 핸들러
  label: string; // 버튼에 표시할 텍스트
}

const CustomBottomButton = ({
  isActive,
  onPress,
  label,
}: CustomButtonProps) => {
  const buttonStyle = {
    backgroundColor: isActive ? Colors.purple : Colors.bg_light,
    ...styles.okbutton,
  };
  const buttonTextStyle = {
    color: isActive ? Colors.white : Colors.contents_light,
    ...styles.btnText,
  };
  return (
    <TouchableOpacity
      onPress={isActive ? onPress : undefined}
      disabled={!isActive}
    >
      <View style={buttonStyle}>
        <Text style={buttonTextStyle}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  okbutton: {
    height: 84,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    marginTop: -24,
    ...Fonts.b1_sb,
  },
});

export default CustomBottomButton;

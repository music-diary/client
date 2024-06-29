import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

interface CustomButtonProps {
  isActive: boolean;
  onPress?: () => void;
  label: string;
}

const BottomSafeAreaButton = ({
  isActive,
  onPress,
  label,
}: CustomButtonProps) => {
  return (
    <SafeAreaView
      edges={['bottom']}
      style={{ backgroundColor: isActive ? Colors.PURPLE : Colors.BG_LIGHT }}
    >
      <TouchableOpacity
        onPress={isActive ? onPress : undefined}
        disabled={!isActive}
        style={styles.okButton}
      >
        <View accessible accessibilityRole="button">
          <Text
            style={[
              styles.btnText,
              { color: isActive ? Colors.WHITE : Colors.CONTENTS_LIGHT },
            ]}
          >
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  okButton: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  btnText: {
    ...Fonts.B1_SB,
  },
});

export default BottomSafeAreaButton;

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '@/constants';

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
      style={{ backgroundColor: isActive ? COLORS.PURPLE : COLORS.BG_LIGHT }}
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
              { color: isActive ? COLORS.WHITE : COLORS.CONTENTS_LIGHT },
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
    ...FONTS.B1_SB,
  },
});

export default BottomSafeAreaButton;

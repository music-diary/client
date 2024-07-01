import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '@/constants';

const TempBlack = () => {
  return <ActivityIndicator style={styles.container} color={COLORS.PURPLE} />;
};

export default TempBlack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
    zIndex: 10,
  },
});

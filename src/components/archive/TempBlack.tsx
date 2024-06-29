import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

const TempBlack = () => {
  return <ActivityIndicator style={styles.container} color="#793FB5" />;
};

export default TempBlack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BLACK,
    zIndex: 10,
  },
});

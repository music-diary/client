import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '@/constants';
import { colorWithOpacity } from '@/utils/color-utils';

const DataNotFound = () => {
  return (
    <View style={styles.container}>
      <Text style={[FONTS.B2, { color: colorWithOpacity(COLORS.WHITE, 0.5) }]}>
        No data available
      </Text>
    </View>
  );
};

export default DataNotFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

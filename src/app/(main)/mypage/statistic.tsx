import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const statistic = () => {
  return (
    <View style={styles.container}>
      <Text>statistic</Text>
    </View>
  );
};

export default statistic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

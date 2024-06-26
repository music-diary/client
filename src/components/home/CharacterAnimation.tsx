import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import MainCharacter from 'assets/images/homeIcon/MainCharacter.svg';

const FloatingCharacter = () => {
  const moveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, {
          toValue: -30,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: -1,
      },
    ).start();
  }, [moveAnim]);

  return (
    <Animated.View
      style={[
        styles.character,
        {
          transform: [{ translateY: moveAnim }],
        },
      ]}
    >
      <View style={styles.character}>
        <MainCharacter />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  character: {
    position: 'absolute',
    top: -40,
    right: 16,
  },
});

export default FloatingCharacter;

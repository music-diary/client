import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Image } from 'react-native';

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
      <Image
        source={require('assets/images/main_character.png')}
        style={styles.character}
      />
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

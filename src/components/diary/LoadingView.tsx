import { StyleSheet, Text, View, Image } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

const LoadingView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Image source={require('assets/images/complete-logo.png')} />
        <Text style={styles.welcomeText}>
          세비님을 위한 음악을 고르고 있어요
        </Text>
      </View>
    </View>
  );
};

export default LoadingView;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: Colors.black,
    flex: 1,
    alignItems: 'center',
    paddingTop: 120,
  },
  welcomeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 60,
  },
  welcomeText: {
    color: Colors.white,
    ...Fonts.h1,
  },
});

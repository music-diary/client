import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

const CompleteScreen = () => {
  const handleNext = () => {
    router.push({ pathname: '/(main)' });
  };
  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Image source={require('assets/images/complete-logo.png')} />
        <Text style={styles.welcomeText}>음계일기에 오신 것을 환영해요!</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.startButton,
          {
            height: Platform.OS === 'android' ? 78 : 100,
          },
        ]}
        onPress={handleNext}
      >
        <Text style={styles.startText}>음계일기 시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CompleteScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: Colors.black,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 90,
  },
  welcomeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 60,
  },
  welcomeText: {
    color: Colors.white,
    ...Fonts.h1,
  },
  startButton: {
    alignItems: 'center',
    backgroundColor: Colors.purple,
    width: '100%',
    paddingTop: 28,
  },
  startText: {
    color: Colors.white,
    ...Fonts.t1,
  },
});

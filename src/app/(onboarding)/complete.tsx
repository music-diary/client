import { router } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Fonts from '@/constants/Fonts';
import Colors from '@/constants/Colors';

const CompleteScreen = () => {
  const handleNext = () => {
    router.push({ pathname: '/(main)' });
  };
  return (
    <>
      <SafeAreaView edges={['top']} style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Image source={require('assets/images/complete-logo.png')} />
          <Text style={styles.welcomeText}>음계일기에 오신 것을 환영해요!</Text>
        </View>
        <TouchableOpacity style={styles.startButton} onPress={handleNext}>
          <Text style={styles.startText}>음계일기 시작하기</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView edges={['bottom']} style={styles.bottomSafeArea} />
    </>
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: Colors.purple,
  },
  startText: {
    color: Colors.white,
    ...Fonts.t1,
  },
  bottomSafeArea: {
    backgroundColor: Colors.purple,
  },
});

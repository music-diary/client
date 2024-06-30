import { router } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import { Colors, Fonts } from '@/constants';

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
      </SafeAreaView>
      <CustomBottomButton isActive={true} onPress={handleNext} label="다음" />
    </>
  );
};

export default CompleteScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: Colors.BLACK,
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
    color: Colors.WHITE,
    ...Fonts.H1,
  },
});

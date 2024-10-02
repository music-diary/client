import { router } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import { COLORS, FONTS } from '@/constants';

const DiaryLimitScreen = () => {
  const handleHome = () => {
    router.navigate({ pathname: '/(main)' });
  };
  return (
    <>
      <SafeAreaView edges={['top']} style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Image source={require('assets/images/complete-logo.png')} />
          <View style={styles.textView}>
            <Text style={styles.welcomeText}>
              뮤다는 하루에 한번만 쓸 수 있어요
            </Text>
            <Text style={styles.welcomeText}>내일 다시 만나요!</Text>
          </View>
        </View>
      </SafeAreaView>
      <CustomBottomButton
        isActive={true}
        onPress={handleHome}
        label="홈으로 돌아가기"
      />
    </>
  );
};

export default DiaryLimitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 60,
  },
  textView: { alignItems: 'center', gap: 10 },
  welcomeText: {
    color: COLORS.WHITE,
    ...FONTS.H1,
  },
});

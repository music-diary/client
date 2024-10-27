import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { COLORS, FONTS } from '@/constants';
import { AppleLogoSvg, GoogleLogoSvg, MainIconSvg } from 'assets/images/common';

const SignInScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerView}>
        <MainIconSvg />
        <Text style={styles.description}>내 하루의 OST, 뮤다</Text>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={[styles.signInButton, { backgroundColor: COLORS.WHITE }]}
        >
          <GoogleLogoSvg />
          <Text style={[styles.buttonDescription, { color: COLORS.GREY2 }]}>
            Google로 로그인하기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.signInButton, { backgroundColor: COLORS.BLACK }]}
        >
          <AppleLogoSvg />
          <Text style={[styles.buttonDescription, { color: COLORS.WHITE }]}>
            Apple로 로그인하기
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PURPLE,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    marginTop: 16,
    color: COLORS.WHITE,
    ...FONTS.T1,
  },
  buttonView: {
    gap: 14,
    paddingBottom: 60,
    alignItems: 'center',
  },
  signInButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8.88,
    width: Dimensions.get('screen').width - 48,
    paddingVertical: 16,
  },
  buttonDescription: {
    ...FONTS.T1,
    marginLeft: 8,
  },
});

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import * as AppleAuthentication from 'expo-apple-authentication';
import { COLORS, FONTS } from '@/constants';
import { AppleLogoSvg, GoogleLogoSvg, MainIconSvg } from 'assets/images/common';
import { useAppleLogin, useGoogleLogin } from '@/api/hooks/useAuth';

const SignInScreen = () => {
  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      iosClientId:
        '484104164369-6g5m6omo00mlg4cr047uh62ttpbo284m.apps.googleusercontent.com',
    });
  };

  useEffect(() => {
    configureGoogleSignIn();
  });

  const { mutate: googleLogin } = useGoogleLogin();
  const { mutate: appleLogin } = useAppleLogin();

  const googleSignIn = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();
      if (userInfo && userInfo.type === 'success' && userInfo.data.idToken) {
        googleLogin(userInfo.data.idToken, {
          onSuccess: (data) => {
            if (data?.id) return;
            router.push({
              pathname: '/(tutorial)',
              params: { oauthUserId: userInfo.data.user.id },
            });
          },
          onError: (error) => {
            console.warn('구글 로그인 에러 :', error);
          },
        });
      } else {
        console.warn('ID Token을 가져오지 못했습니다.');
      }
    } catch (error) {
      console.warn('Google Sign-In 에러:', error);
    }
  };

  const appleSignIn = async () => {
    try {
      const userInfo = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (userInfo?.identityToken) {
        appleLogin(userInfo.identityToken, {
          onSuccess: (data) => {
            if (data?.id) return;
            router.push({
              pathname: '/(tutorial)',
              params: { oauthUserId: userInfo.user },
            });
          },
          onError: (error) => {
            console.warn('애플 로그인 에러 :', error);
          },
        });
      } else {
        console.warn('ID Token을 가져오지 못했습니다.');
      }
    } catch (error) {
      console.warn('Apple Sign-In 에러:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerView}>
        <MainIconSvg />
        <Text style={styles.description}>내 하루의 OST, 뮤다</Text>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() => {
            googleSignIn();
          }}
          style={[styles.signInButton, { backgroundColor: COLORS.WHITE }]}
        >
          <GoogleLogoSvg />
          <Text style={[styles.buttonDescription, { color: COLORS.GREY2 }]}>
            Google로 로그인하기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            appleSignIn();
          }}
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

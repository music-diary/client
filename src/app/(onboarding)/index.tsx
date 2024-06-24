import { useState } from 'react';
import { router } from 'expo-router';
import {
  InputAccessoryView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRequestPhoneVerification } from '@/api/hooks/useAuth';
import Header from '@/components/onboarding/Header';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

const SignUpScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { mutate: requestPhoneVerification } = useRequestPhoneVerification();

  const validatePhoneNumber = (number: string) => {
    const phoneNumberPattern = /^\d{10,11}$/;
    return phoneNumberPattern.test(number);
  };

  const handlePhoneNumberChange = (number: string) => {
    setPhoneNumber(number);
    setIsButtonDisabled(!validatePhoneNumber(number));
  };

  const handleVerifyPhoneNumber = () => {
    const phone = '+82' + phoneNumber;
    requestPhoneVerification(phone, {
      onSuccess: () => {
        router.push({
          pathname: '/phone-verify',
          params: { phoneNumber: phone },
        });
      },
      onError: (error) => {
        console.warn('Phone Verification Request Error:', error);
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="전화번호 가입"
        description="음계일기를 시작하기 위해 전화번호 인증이 필요해요"
      />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'android' ? 78 : 0}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>전화번호</Text>
          <TextInput
            style={styles.inputPhoneNumber}
            autoFocus={true}
            placeholder="-를 제외한 번호를 입력해주세요."
            placeholderTextColor={Colors.contents_light}
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="phone-pad"
            inputAccessoryViewID="phoneNumber"
          />
        </View>
        {Platform.OS === 'ios' ? (
          <InputAccessoryView
            nativeID="phoneNumber"
            backgroundColor={
              isButtonDisabled ? Colors.contents_light : Colors.purple
            }
          >
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={handleVerifyPhoneNumber}
              disabled={isButtonDisabled}
            >
              <Text style={styles.verifyText}>인증번호 받기</Text>
            </TouchableOpacity>
          </InputAccessoryView>
        ) : (
          <TouchableOpacity
            style={[
              styles.verifyButton,
              {
                backgroundColor: isButtonDisabled
                  ? Colors.contents_light
                  : Colors.purple,
              },
            ]}
            onPress={handleVerifyPhoneNumber}
            disabled={isButtonDisabled}
          >
            <Text style={styles.verifyText}>인증번호 받기</Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 60,
    backgroundColor: Colors.black,
    flex: 1,
  },
  keyboardAvoidingContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  inputContainer: {
    display: 'flex',
    gap: 12,
    paddingHorizontal: 16,
  },
  inputLabel: {
    color: Colors.white,
    ...Fonts.b2_sb,
  },
  inputPhoneNumber: {
    color: Colors.white,
    borderBottomColor: '#C7C7C7',
    borderBottomWidth: 1,
    paddingBottom: 8,
    ...Fonts.b2_sb,
  },
  verifyButton: {
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
  },
  verifyText: {
    color: Colors.white,
    ...Fonts.t1,
  },
});

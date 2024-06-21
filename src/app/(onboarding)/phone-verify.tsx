import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
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
import {
  useRequestPhoneVerification,
  useVerifyPhone,
} from '@/api/hooks/useOnboarding';
import Header from '@/components/onboarding/Header';
import TermsModal from '@/components/onboarding/TermsModal';
import VerifyTimer from '@/components/onboarding/VerifyTimer';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { type VerifyStatusType } from '@/interfaces';
import { useDimStore } from '@/store/useDimStore';
import WarningCircleSvg from 'assets/images/warning_circle.svg';

const PhoneVerifyScreen = () => {
  const { phoneNumber } = useLocalSearchParams();
  const { toggleDim } = useDimStore();

  const [retry, setRetry] = useState(false);
  const [verifyNumber, setVerifyNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatusType>('sent');

  const { mutate: verifyPhone } = useVerifyPhone();
  const { mutate: requestPhoneVerification } = useRequestPhoneVerification();

  const validateVerifyNumber = (number: string) => {
    const verifyNumberPattern = /^\d{6}$/;
    return verifyNumberPattern.test(number);
  };

  const handleVerifyNumberChange = (number: string) => {
    setVerifyNumber(number);
    setIsButtonDisabled(!validateVerifyNumber(number));
  };

  const getStatusMessage = () => {
    switch (verifyStatus) {
      case 'sent':
        return '인증번호가 발송되었어요.';
      case 'incorrect':
        return '앗, 인증번호가 일치하지 않아요.';
      case 'resent':
        return '인증번호가 다시 발송되었어요.';
    }
  };

  const handleVerify = () => {
    const verificationData = {
      phoneNumber: phoneNumber as string,
      code: verifyNumber,
    };
    verifyPhone(verificationData, {
      onSuccess: (data) => {
        console.log('Phone Verification Success:', data);
        toggleDim();
        setModalVisible(true);
      },
      onError: (error) => {
        console.warn('Phone Verification Error:', error);
        setVerifyStatus('incorrect');
      },
    });
  };

  const handleRetryVerify = () => {
    setRetry(true);
    requestPhoneVerification(phoneNumber as string, {
      onSuccess: (data) => {
        console.log('Phone Verification Requested:', data);
        setVerifyStatus('resent');
        setRetry(true);
      },
      onError: (error) => {
        console.warn('Phone Verification Request Error:', error);
      },
    });
  };

  const handleNext = (isAgreedMarketing: boolean) => {
    toggleDim();
    setModalVisible(false);
    router.push({
      pathname: '/user-info',
      params: { phoneNumber, isAgreedMarketing: isAgreedMarketing.toString() },
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
        <View style={styles.verifyContainer}>
          <Text style={styles.inputLabel}>인증번호</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputSubContainer}>
              <TextInput
                style={styles.inputVerifyNumber}
                autoFocus={true}
                placeholder="인증번호 6자리를 입력해주세요."
                placeholderTextColor={Colors.contents_light}
                value={verifyNumber}
                onChangeText={handleVerifyNumberChange}
                keyboardType="phone-pad"
                inputAccessoryViewID="verifyNumber"
              />
              <VerifyTimer retry={retry} setRetry={setRetry} />
            </View>
            <TouchableOpacity
              style={styles.verifyResendButton}
              onPress={handleRetryVerify}
            >
              <Text style={styles.verifyResendText}>재요청</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.verifyStatusView}>
            {verifyStatus === 'incorrect' && <WarningCircleSvg />}
            <Text style={styles.validityInfoText}>{getStatusMessage()}</Text>
          </View>
          <TouchableOpacity style={styles.validityQnAButton}>
            <Text style={styles.validityQnAText}>인증번호가 오지 않나요?</Text>
          </TouchableOpacity>
        </View>
        {Platform.OS === 'ios' ? (
          <InputAccessoryView
            nativeID="verifyNumber"
            backgroundColor={
              isButtonDisabled ? Colors.contents_light : Colors.purple
            }
          >
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={handleVerify}
              disabled={isButtonDisabled}
            >
              <Text style={styles.verifyText}>인증하기</Text>
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
                height: Platform.OS === 'android' ? 78 : null,
              },
            ]}
            onPress={handleVerify}
            disabled={isButtonDisabled}
          >
            <Text style={styles.verifyText}>인증하기</Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>

      <TermsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onPress={handleNext}
      />
    </SafeAreaView>
  );
};

export default PhoneVerifyScreen;

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
  verifyContainer: {
    display: 'flex',
    paddingHorizontal: 16,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    gap: 10,
  },
  inputSubContainer: {
    flex: 1,
    marginTop: 12,
    flexDirection: 'row',
    borderBottomColor: '#C7C7C7',
    borderBottomWidth: 1,
    paddingBottom: 8,
    alignItems: 'center',
  },
  inputLabel: {
    color: Colors.white,
    ...Fonts.b2_sb,
  },
  inputVerifyNumber: {
    flex: 1,
    color: Colors.white,
    alignSelf: 'flex-start',
    ...Fonts.b2_sb,
  },
  verifyResendButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.contents_light,
    borderRadius: 2,
    height: 21,
    paddingHorizontal: 10,
    marginTop: 8,
  },
  verifyResendText: {
    color: Colors.white,
    ...Fonts.lb,
  },
  verifyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  verifyText: {
    color: Colors.white,
    ...Fonts.t1,
  },
  verifyStatusView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    gap: 4,
  },
  validityInfoText: {
    color: Colors.pink,
    ...Fonts.btn,
  },
  validityQnAButton: {
    alignSelf: 'flex-start',
    borderBottomColor: Colors.contents_light,
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
  validityQnAText: {
    color: Colors.contents_light,
    fontFamily: 'pret-sb',
    fontSize: 12,
    display: 'flex',
  },
});

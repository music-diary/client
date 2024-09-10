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
} from '@/api/hooks/useAuth';
import Header from '@/components/onboarding/Header';
import TermsModal from '@/components/onboarding/TermsModal';
import VerifyTimer from '@/components/onboarding/VerifyTimer';
import { COLORS, FONTS } from '@/constants';
import { useDimStore } from '@/store/useDimStore';
import { WarningCircleSvg } from 'assets/images/onboarding';
import { type VerifyStatus } from '@/models/types';
import { colorWithOpacity } from '@/utils/color-utils';

const PhoneVerifyScreen = () => {
  const { phoneNumber } = useLocalSearchParams();
  const { toggleDim } = useDimStore();

  const [retry, setRetry] = useState(false);
  const [verifyNumber, setVerifyNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>('sent');

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
        if (data?.user?.id) return;
        // 여기로 넘어오면 신규 유저.
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
      onSuccess: () => {
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
        description="뮤다를 시작하기 위해 전화번호 인증이 필요해요"
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
                placeholderTextColor={COLORS.GREY1}
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
        <InputAccessoryView
          nativeID="verifyNumber"
          backgroundColor={isButtonDisabled ? COLORS.BG_LIGHT : COLORS.PURPLE}
        >
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={handleVerify}
            disabled={isButtonDisabled}
          >
            <Text
              style={[
                styles.verifyText,
                {
                  color: isButtonDisabled
                    ? COLORS.CONTENTS_LIGHT
                    : COLORS.WHITE,
                },
              ]}
            >
              인증하기
            </Text>
          </TouchableOpacity>
        </InputAccessoryView>
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
    backgroundColor: COLORS.BLACK,
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
    borderBottomColor: COLORS.GREY1,
    borderBottomWidth: 1,
    paddingBottom: 8,
    alignItems: 'center',
  },
  inputLabel: {
    color: COLORS.WHITE,
    ...FONTS.B2_SB,
  },
  inputVerifyNumber: {
    flex: 1,
    color: COLORS.WHITE,
    alignSelf: 'flex-start',
    ...FONTS.B2_LINE2,
  },
  verifyResendButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorWithOpacity(COLORS.GREY1, 0.5),
    borderRadius: 2,
    height: 21,
    paddingHorizontal: 10,
    marginTop: 8,
  },
  verifyResendText: {
    color: COLORS.WHITE,
    ...FONTS.LB,
  },
  verifyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  verifyText: {
    ...FONTS.B1_SB,
  },
  verifyStatusView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    gap: 4,
  },
  validityInfoText: {
    color: COLORS.PINK,
    ...FONTS.LB,
    fontSize: 11,
  },
  validityQnAButton: {
    alignSelf: 'flex-start',
    borderBottomColor: COLORS.GREY1,
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
  validityQnAText: {
    color: COLORS.CONTENTS_LIGHT,
    fontFamily: 'pret-sb',
    fontSize: 12,
    display: 'flex',
  },
});

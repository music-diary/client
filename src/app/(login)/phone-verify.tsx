import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
  InputAccessoryView,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TermsCheckbox from '@/components/login/TermsCheckbox';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

const PhoneVerifyScreen = () => {
  const { phoneNumber } = useLocalSearchParams();
  const [verifyNumber, setVerifyNumber] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // const [allChecked, setAllChecked] = useState(false); // 전체 동의 체크 여부 상태

  const [checkAll, setCheckAll] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);

  // 페이지 진입시 phoneNumber로 인증번호 요청 api 호출
  useEffect(() => {
    // 인증번호 요청 api 호출
    // 에러가 없으면 인증번호 발송
    // 에러가 있으면 에러메시지 표시
    console.log('여기 진입하나? ::: ', phoneNumber);
  }, []);

  const validateVerifyNumber = (number: string) => {
    const verifyNumberPattern = /^\d{6}$/;
    return verifyNumberPattern.test(number);
  };

  const handleVerifyNumberChange = (number: string) => {
    setVerifyNumber(number);
    setIsButtonDisabled(!validateVerifyNumber(number));
  };

  const handleVerify = () => {
    // 인증하기 버튼 클릭시 api 호출
    // 에러가 없으면 서비스이용약관 모달창 띄우기
    setModalVisible(true);
    // 에러가 있으면 에러메시지 표시
  };

  const handleCheckAll = () => {
    setCheckAll(!checkAll);
    setCheck1(!checkAll);
    setCheck2(!checkAll);
    setCheck3(!checkAll);
    setCheck4(!checkAll);
    setCheck5(!checkAll);
  };

  const handleNext = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>전화번호 가입</Text>
        <Text style={styles.infoDescription}>
          음계일기를 시작하기 위해 전화번호 인증이 필요해요.
        </Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.verifyContainer}>
          <Text style={styles.inputLabel}>인증번호</Text>
          <View style={styles.inputContainer}>
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
            <TouchableOpacity
              style={styles.verifyResendButton}
              onPress={() => {}}
            >
              <Text style={styles.verifyResendText}>재전송</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.validityContainer}>
            <Text style={styles.validityInfoText}>
              인증번호가 발송되었어요. 유효시간 3:00
            </Text>
            <TouchableOpacity
              style={styles.validityQnAButton}
              onPress={() => {}}
            >
              <Text style={styles.validityQnAText}>
                인증번호가 오지 않나요?
              </Text>
            </TouchableOpacity>
          </View>
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
              },
            ]}
            onPress={handleVerify}
            disabled={isButtonDisabled}
          >
            <Text style={styles.verifyText}>인증하기</Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>

      <Modal animationType="slide" visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.termsContainer}>
            <View style={styles.termsTitleContainer}>
              <Text style={styles.termsTitleText}>서비스 이용 동의</Text>
              <TermsCheckbox
                value={checkAll}
                setValue={handleCheckAll}
                title="약관 전체동의"
                type="all"
              />
            </View>
            <View style={styles.termsCheckboxContainer}>
              <TermsCheckbox
                value={check1}
                setValue={setCheck1}
                title="(필수) 만 14세 이상입니다."
              />
              <TermsCheckbox
                value={check2}
                setValue={setCheck2}
                title="(필수) 서비스 이용약관"
              />
              <TermsCheckbox
                value={check3}
                setValue={setCheck3}
                title="(필수) 개인정보 수집 및 이용 동의"
              />
              <TermsCheckbox
                value={check4}
                setValue={setCheck4}
                title="(필수) 서비스 개인정보 제3자 제공 동의"
              />
              <TermsCheckbox
                value={check5}
                setValue={setCheck5}
                title="(선택) 마케팅 활용 개인정보 제3자 제공 동의"
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.modalNextButton}
            onPress={handleNext}
            disabled={isButtonDisabled}
          >
            <Text style={styles.verifyText}>모두 동의하고 다음으로</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
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
  infoContainer: {
    display: 'flex',
    gap: 6,
    marginTop: 60,
    paddingHorizontal: 16,
  },
  infoTitle: {
    color: Colors.white,
    ...Fonts.h1,
  },
  infoDescription: {
    color: Colors.white,
    opacity: 0.7,
    ...Fonts.btn,
  },
  keyboardAvoidingContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  verifyContainer: {
    display: 'flex',
    gap: 12,
    paddingHorizontal: 16,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  inputLabel: {
    color: Colors.white,
    ...Fonts.b2_sb,
  },
  inputVerifyNumber: {
    color: Colors.white,
    ...Fonts.b2_sb,
  },
  verifyResendButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: Colors.contents_light,
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
  verifyResendText: {
    color: Colors.contents_light,
    ...Fonts.b2_sb,
  },
  verifyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 78,
  },
  verifyText: {
    color: Colors.white,
    ...Fonts.t1,
  },
  validityContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  validityInfoText: {
    color: '#FF3333',
    ...Fonts.btn,
  },
  validityQnAButton: {
    borderBottomColor: Colors.contents_light,
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
  validityQnAText: {
    color: Colors.contents_light,
    fontFamily: 'pret-sb',
    fontSize: 12,
  },
  modalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingTop: 32,
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    bottom: 50,
  },
  termsContainer: {
    paddingHorizontal: 24,
  },
  termsTitleContainer: {
    display: 'flex',
    gap: 30,
    borderBottomColor: Colors.contents_light,
    borderBottomWidth: 1,
    paddingBottom: 24,
  },
  termsTitleText: {
    ...Fonts.t1,
    color: '#000000',
  },
  modalNextButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 78,
    backgroundColor: Colors.purple,
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  termsCheckboxContainer: {
    display: 'flex',
    gap: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
});

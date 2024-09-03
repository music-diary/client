import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import {
  InputAccessoryView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomAlertModal from '@/components/common/CustomAlertModal';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import CustomCheckToggle from '@/components/common/CustomCheckToggle';
import Header from '@/components/onboarding/Header';
import { COLORS, FONTS } from '@/constants';
import { genders } from '@/constants/data';
import { useModalStore } from '@/store/useModalStore';
import { colorWithOpacity } from '@/utils/color-utils';
import { isValidDate } from '@/utils/date-utils';

const UserInfoScreen = () => {
  const params = useLocalSearchParams();
  const { closeModal } = useModalStore();

  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('FEMALE');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [validationMessage, setValidationMessage] =
    useState('숫자 8자리로 입력해주세요');

  useEffect(() => {
    if (birth.length === 8 && !isValidDate(birth)) {
      setValidationMessage('유효하지 않은 날짜입니다. 다시 입력해주세요.');
    } else if (birth.length < 8) {
      setValidationMessage('숫자 8자리로 입력해주세요.');
    }
  }, [birth]);

  useEffect(() => {
    const isNameValid = name.trim() !== ''; // 이름이 비어있지 않은지 확인
    const isBirthValid = birth.length === 8 && isValidDate(birth); // 생년월일이 8자리이며 유효한 날짜인지 확인

    setIsButtonDisabled(!(isNameValid && isBirthValid));
  }, [name, birth]);

  const handleNameChange = (name: string) => {
    const validNameRegex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{0,6}$/;
    if (validNameRegex.test(name)) {
      setName(name);
    }
  };

  const handleBirthChange = (birth: string) => {
    const validBirthRegex = /^\d{0,8}$/;
    if (validBirthRegex.test(birth)) {
      setBirth(birth);
    }
  };

  const handleNext = () => {
    router.push({
      pathname: '/genre',
      params: { name, birth, gender, ...params },
    });
  };

  return (
    <>
      <SafeAreaView edges={['top']} style={styles.container}>
        <Header
          title="기본 정보를 입력해주세요"
          description="뮤다는 사용자 정보를 기반으로 음악을 추천해 드려요"
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>닉네임</Text>
                <TextInput
                  style={styles.inputText}
                  placeholder="뭐라고 불러드릴까요?"
                  placeholderTextColor={COLORS.GREY1}
                  value={name}
                  onChangeText={handleNameChange}
                  inputAccessoryViewID="user-info"
                />
                <Text style={styles.validateInfo}>
                  이름은 한글, 영어, 숫자로 6자까지만 입력 가능해요
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>생년월일</Text>
                <View style={{ gap: 8 }}>
                  <TextInput
                    style={styles.inputText}
                    placeholder="YYYYMMDD"
                    placeholderTextColor={COLORS.GREY1}
                    value={birth}
                    keyboardType="number-pad"
                    onChangeText={handleBirthChange}
                    inputAccessoryViewID="user-info"
                  />
                  <Text style={styles.validateInfo}>{validationMessage}</Text>
                </View>
              </View>
              <View style={[styles.inputContainer, { gap: 18 }]}>
                <View style={styles.inputHeader}>
                  <Text style={styles.inputLabel}>성별</Text>
                  <Text style={styles.inputDescription}>
                    더욱 다양한 음악 추천에 도움이 돼요
                  </Text>
                </View>
                <View style={styles.genderButtonGroup}>
                  {genders.map((g, index) => (
                    <CustomCheckToggle
                      key={g.value}
                      index={index}
                      isSelected={gender === g.value}
                      onToggleChange={() => setGender(g.value)}
                      description={g.name}
                    />
                  ))}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <InputAccessoryView
        nativeID="user-info"
        backgroundColor={isButtonDisabled ? COLORS.BG_LIGHT : COLORS.PURPLE}
      >
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          disabled={isButtonDisabled}
        >
          <Text
            style={[
              styles.nextText,
              {
                color: isButtonDisabled ? COLORS.CONTENTS_LIGHT : COLORS.WHITE,
              },
            ]}
          >
            다음
          </Text>
        </TouchableOpacity>
      </InputAccessoryView>
      <CustomBottomButton
        isActive={!isButtonDisabled}
        onPress={handleNext}
        label="다음"
      />
      {/**
       * TODO:
       * 모달 닫으면 앱 초기화면으로 이동
       */}
      <CustomAlertModal
        name="sign_up-cancel"
        title="지금 그만두시면 입력한 정보는 저장되지 않고,"
        description="회원가입이 되지 않아요."
        leftButtonText="그만할래요"
        rightButtonText="계속 진행할래요"
        onLeftButtonPress={() =>
          console.log('모달 닫은 후 튜토리얼 화면으로 돌아감')
        }
        onRightButtonPress={closeModal}
        isDelete={false}
      />
    </>
  );
};

export default UserInfoScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 28,
    backgroundColor: COLORS.BLACK,
    flex: 1,
  },
  keyboardAvoidingContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  formContainer: {
    display: 'flex',
    gap: 28,
  },
  inputContainer: {
    display: 'flex',
    gap: 10,
    paddingHorizontal: 16,
  },
  inputHeader: {
    gap: 6,
  },
  inputLabel: {
    color: COLORS.WHITE,
    ...FONTS.B2_SB,
  },
  inputText: {
    color: COLORS.WHITE,
    borderBottomColor: COLORS.GREY1,
    borderBottomWidth: 1.5,
    paddingBottom: 8,
    ...FONTS.B2_LINE2,
  },
  inputDescription: {
    color: colorWithOpacity(COLORS.WHITE, 0.7),
    ...FONTS.BTN,
  },
  validateInfo: {
    color: COLORS.PINK,
    ...FONTS.LB,
    fontSize: 11,
  },
  genderButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  nextButton: {
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
  },
  nextText: {
    ...FONTS.B1_SB,
  },
});

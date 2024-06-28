import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomAlertModal from '@/components/common/CustomAlertModal';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import CustomCheckToggle from '@/components/common/CustomCheckToggle';
import Header from '@/components/onboarding/Header';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { genders } from '@/constants/data';
import { useModalStore } from '@/store/useModalStore';
import { colorWithOpacity } from '@/utils/colorUtils';

const UserInfoScreen = () => {
  const params = useLocalSearchParams();
  const { closeModal } = useModalStore();

  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('OTHER');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const isValid = name.trim() !== '' && birth.trim().length === 8;
    setIsButtonDisabled(!isValid);
  }, [name, birth, gender]);

  const handleBirthChange = (birth: string) => {
    if (/^\d{0,8}$/.test(birth)) {
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
          description="음계일기는 사용자 정보를 기반으로 음악을 추천해 드려요"
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
                  placeholderTextColor={Colors.grey1}
                  value={name}
                  onChangeText={setName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>생년월일</Text>
                <View style={{ gap: 8 }}>
                  <TextInput
                    style={styles.inputText}
                    placeholder="YYYYMMDD"
                    placeholderTextColor={Colors.grey1}
                    value={birth}
                    keyboardType="number-pad"
                    onChangeText={handleBirthChange}
                  />
                  <Text style={styles.birthInfo}>
                    숫자 8자리로 입력해주세요
                  </Text>
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
      <CustomBottomButton
        isActive={!isButtonDisabled}
        onPress={handleNext}
        label="다음"
      />
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
    backgroundColor: Colors.black,
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
    color: Colors.white,
    ...Fonts.b2_sb,
  },
  inputText: {
    color: Colors.white,
    borderBottomColor: Colors.grey1,
    borderBottomWidth: 1.5,
    paddingBottom: 8,
    ...Fonts.b2_line2,
  },
  inputDescription: {
    color: colorWithOpacity(Colors.white, 0.7),
    ...Fonts.btn,
  },
  birthInfo: {
    color: Colors.pink,
    ...Fonts.lb,
  },
  genderButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
});

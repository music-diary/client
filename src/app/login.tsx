import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleNext = () => {
    // 전화번호를 사용하여 로그인 또는 회원가입 프로세스 진행
    // 예: 인증번호를 보내고, 인증번호 확인 페이지로 이동 등
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text style={styles.appName}>App Name</Text>
        <Text style={styles.introText}>
          언어로 표현하는 나의 하루, {'\n'}App Name.
        </Text>
        <Text style={styles.description}>
          회원가입을 시작하기 위해 전화번호를 입력해주세요.
        </Text>
        <TextInput
          autoFocus={true}
          style={styles.input}
          placeholder="010"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>인증문자받기</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  introText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    padding: 10,
    fontSize: 18,
  },
  nextButton: {
    backgroundColor: 'tomato', // 색상은 디자인에 맞게 조정
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'tomato', // 색상은 디자인에 맞게 조정
    padding: 15,
    borderRadius: 30,
  },
});

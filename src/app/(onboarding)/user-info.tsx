import { useState } from 'react';
import { router } from 'expo-router';
import {
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
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

const UserInfoScreen = () => {
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('E');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleNext = () => {
    router.push({ pathname: '/music-info', params: { name, birth, gender } });
  };

  // useEffect(() => {
  //   setIsButtonDisabled(!name || !birth || birth.length !== 8);
  // }, [name, birth]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.indicatorContainer}>
          <View style={styles.indicatorCircle}>
            <Text style={styles.indicatorNumber}>1</Text>
          </View>
          <View style={styles.indicatorLine} />
          <View
            style={[
              styles.indicatorCircle,
              { backgroundColor: Colors.contents_light },
            ]}
          >
            <Text style={styles.indicatorNumber}>2</Text>
          </View>
        </View>
        <Text style={styles.infoTitle}>기본 정보를 입력해주세요</Text>
        <Text style={styles.infoDescription}>
          음계일기는 사용자 정보를 기반으로 음악을 추천해 드려요.
        </Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>이름</Text>
              <TextInput
                style={styles.inputText}
                placeholder="이름을 입력해주세요."
                placeholderTextColor={Colors.contents_light}
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>생년월일</Text>
              <TextInput
                style={styles.inputText}
                placeholder="YYYYMMDD"
                placeholderTextColor={Colors.contents_light}
                value={birth}
                keyboardType="number-pad"
                onChangeText={setBirth}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>성별</Text>
              <View style={styles.genderButtonGroup}>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    gender === 'F' && styles.selectedGenderButton,
                  ]}
                  onPress={() => setGender('F')}
                >
                  <Text
                    style={[
                      styles.genderType,
                      gender === 'F' && styles.selectedGenderType,
                    ]}
                  >
                    여성
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    gender === 'M' && styles.selectedGenderButton,
                  ]}
                  onPress={() => setGender('M')}
                >
                  <Text
                    style={[
                      styles.genderType,
                      gender === 'M' && styles.selectedGenderType,
                    ]}
                  >
                    남성
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    gender === 'E' && styles.selectedGenderButton,
                  ]}
                  onPress={() => setGender('E')}
                >
                  <Text
                    style={[
                      styles.genderType,
                      gender === 'E' && styles.selectedGenderType,
                    ]}
                  >
                    기타
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          style={[
            styles.verifyButton,
            {
              backgroundColor: isButtonDisabled
                ? Colors.contents_light
                : Colors.purple,
              height: Platform.OS === 'android' ? 78 : 112,
            },
          ]}
          onPress={handleNext}
          disabled={isButtonDisabled}
        >
          <Text style={styles.verifyText}>다음</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default UserInfoScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 60,
    backgroundColor: Colors.black,
    flex: 1,
  },
  infoContainer: {
    display: 'flex',
    gap: 40,
    marginTop: 24,
    paddingHorizontal: 16,
  },
  infoTitle: {
    color: Colors.white,
    ...Fonts.t1,
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
  formContainer: {
    display: 'flex',
    gap: 30,
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
  inputText: {
    color: Colors.white,
    borderBottomColor: '#C7C7C7',
    borderBottomWidth: 1,
    paddingBottom: 8,
    ...Fonts.b2_sb,
  },
  verifyButton: {
    alignItems: 'center',
    height: 100,
    paddingTop: 28,
  },
  verifyText: {
    color: Colors.white,
    ...Fonts.t1,
  },
  genderButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
    justifyContent: 'center',
  },
  genderButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.contents_light,
    borderWidth: 1,
    borderRadius: 38,
    paddingHorizontal: 16,
    height: 40,
  },
  selectedGenderButton: {
    backgroundColor: Colors.purple,
    borderWidth: 0,
  },
  genderType: {
    color: Colors.contents_light,
    ...Fonts.b2_sb,
  },
  selectedGenderType: {
    color: Colors.white,
  },
  indicatorContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.purple,
    borderRadius: 50,
    width: 30,
    height: 30,
  },
  indicatorNumber: {
    color: Colors.white,
    ...Fonts.b2_sb,
  },
  indicatorLine: {
    backgroundColor: Colors.contents_light,
    height: 2,
    width: 45,
  },
});

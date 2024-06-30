import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Colors, Fonts } from '@/constants';
import useKeyboardScrollViewScroll from '@/hooks/useKeyboardScrollViewScroll';
import CustomCheckToggle from '@/components/common/CustomCheckToggle';
import CustomBottomButton from '@/components/common/CustomBottomButton';

const InquiryScreen = () => {
  // 키보드 높이 조절 (커스텀 훅 사용)
  const scrollViewRef = useRef<ScrollView>(null);
  useKeyboardScrollViewScroll(scrollViewRef);

  // 토글 선택 (중복 선택을 위해 배열로 초기화)
  const [selectedToggles, setSelectedToggles] = useState<number[]>([]);

  const handleToggleChange = (index: number) => {
    if (selectedToggles.includes(index)) {
      setSelectedToggles(selectedToggles.filter((i) => i !== index));
    } else {
      setSelectedToggles([...selectedToggles, index]);
    }
  };

  // 이메일 값 입력란
  const [email, setEmail] = useState<string>('');
  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  // 상세 내용 입력란
  const [extraReason, setExtraReason] = useState<string>('');
  const maxCharacters = 200; // 글자 수 제한
  const handleExtraReasonChange = (text: string) => {
    if (text.length <= maxCharacters) {
      setExtraReason(text);
    }
  };

  // 하단 완료 버튼
  const [isButtonActive, setButtonActive] = useState(false);

  // 하나라도 체크박스 선택 시 + 이메일 입력 시 하단 문의하기 버튼 활성화
  useEffect(() => {
    if (selectedToggles.length > 0 && email.length > 0) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [selectedToggles, email]);

  const handleButtonPress = () => {
    console.log(
      '🚀 ~ file: inquiry.tsx:63 ~ handleButtonPress ~ handleButtonPress:',
      'Button pressed!',
    );
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: Colors.BLACK }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.container}
        >
          <Text style={styles.headerText}>
            답장받을 이메일과 함께 문의사항을 남겨주시면 {'\n'}
            영업일 기준 7일 이내에 담당자가 답변을 보내드려요.
          </Text>

          <Text style={styles.titleText}>문의사항을 선택해주세요.</Text>
          <View style={styles.toggleContainer}>
            <CustomCheckToggle
              index={0}
              isSelected={selectedToggles.includes(0)}
              onToggleChange={handleToggleChange}
              description="앱에 오류가 있어요"
            />
            <CustomCheckToggle
              index={1}
              isSelected={selectedToggles.includes(1)}
              onToggleChange={handleToggleChange}
              description="음악 추천이 마음에 들지 않아요"
            />
            <CustomCheckToggle
              index={2}
              isSelected={selectedToggles.includes(2)}
              onToggleChange={handleToggleChange}
              description="친구 목록을 복구하고 싶어요"
            />
            <CustomCheckToggle
              index={3}
              isSelected={selectedToggles.includes(3)}
              onToggleChange={handleToggleChange}
              description="일기 데이터를 복구하고 싶어요"
            />
            <CustomCheckToggle
              index={4}
              isSelected={selectedToggles.includes(4)}
              onToggleChange={handleToggleChange}
              description="이런 기능이 추가되면 좋겠어요"
            />
            {/* <CustomCheckToggle
              index={5}
              isSelected={selectedToggles.includes(5)}
              onToggleChange={handleToggleChange}
              description="기타"
            /> */}
          </View>
          <Text style={styles.titleText}>
            답변 받을 이메일 주소를 입력해주세요.
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              placeholder="이메일 주소를 입력해주세요."
              placeholderTextColor={Colors.CONTENTS_LIGHT}
              keyboardType="email-address"
              onChangeText={handleEmailChange}
            />
          </View>
          <Text style={styles.titleText}>상세 내용을 입력해주세요.</Text>

          <View style={styles.inputBoxContainer}>
            {/* Placeholder 스타일링 */}
            {extraReason === '' && (
              <Text style={styles.placeholder}>
                음계일기를 이용하면서 불편했던 점을 알려주시면{'\n'}서비스
                개선에 적극 반영할게요.
              </Text>
            )}
            <TextInput
              style={[styles.extraContainer]}
              textAlign="left"
              maxLength={maxCharacters}
              multiline={true}
              onChangeText={handleExtraReasonChange}
              onFocus={() => {
                scrollViewRef.current?.scrollTo({
                  y: 800, // 화면을 위로 스크롤
                  animated: true,
                });
              }}
              onBlur={() => {
                scrollViewRef.current?.scrollTo({
                  y: 0, // 화면을 원래 위치로 스크롤
                  animated: true,
                });
              }}
            />
          </View>
          <View style={styles.maxlengthContainer}>
            <Text style={styles.lbText}>
              {extraReason.length}/{maxCharacters}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomBottomButton
        isActive={isButtonActive}
        onPress={handleButtonPress} // 버튼 클릭 이벤트 핸들러
        label="문의하기"
      />
    </>
  );
};

export default InquiryScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BLACK,
    paddingHorizontal: 16,

    paddingBottom: 150,
    marginBottom: -50,
    paddingTop: 20,
  },
  headerText: {
    color: Colors.CONTENTS_LIGHT,

    ...Fonts.B2,
  },
  titleText: {
    color: Colors.WHITE,
    marginTop: 27,
    ...Fonts.B1_SB,
  },
  inputContainer: {
    marginTop: 12,
    height: 30,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.CONTENTS_LIGHT,
  },
  inputText: {
    color: Colors.WHITE,
    ...Fonts.B2,
  },
  toggleContainer: {
    gap: 14,
    marginTop: 14,
  },
  inputBoxContainer: {
    position: 'relative',
    marginTop: 10,
  },
  extraContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    height: 165,
    borderWidth: 1,
    borderColor: Colors.CONTENTS_LIGHT,
    borderRadius: 10,
    color: Colors.WHITE,
  },
  placeholder: {
    color: Colors.CONTENTS_LIGHT,
    position: 'absolute',
    top: 16,
    left: 16,
  },
  maxlengthContainer: {
    flexDirection: 'row-reverse',
    marginTop: -20,
    marginRight: 10,
  },
  lbText: {
    color: Colors.CONTENTS_LIGHT,
    ...Fonts.LB,
  },
});

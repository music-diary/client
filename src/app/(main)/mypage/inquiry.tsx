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
import { COLORS, FONTS } from '@/constants';
import useKeyboardScrollViewScroll from '@/hooks/useKeyboardScrollViewScroll';
import CustomCheckToggle from '@/components/common/CustomCheckToggle';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import { useGetContactTypes, useSendInquiry } from '@/api/hooks/useUsers';
import { type ContactTypeSchema } from '@/models/schemas';
import { validateEmail } from '@/utils/text-utils';
import { WarningCircleSvg } from 'assets/images/onboarding';

const InquiryScreen = () => {
  // 문의 유형 가져오기
  const { data: ContactTypes } = useGetContactTypes();
  // 문의 전송 mutation
  const sendInquiryMutation = useSendInquiry();

  // 키보드 높이 조절 (커스텀 훅 사용)
  const scrollViewRef = useRef<ScrollView>(null);
  useKeyboardScrollViewScroll(scrollViewRef);

  // 상태 훅 선언
  const [selectedToggle, setSelectedToggle] = useState<number | null>(null);
  const [email, setEmail] = useState<string>('');
  const [extraReason, setExtraReason] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const maxCharacters = 200; // 글자 수 제한
  const [isButtonActive, setButtonActive] = useState(false);

  const handleToggleChange = (index: number) => {
    setSelectedToggle(selectedToggle === index ? null : index);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(null);
  };

  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setEmailError('유효한 이메일 주소를 입력해주세요.');
    } else {
      setEmailError(null);
    }
  };

  const handleExtraReasonChange = (text: string) => {
    if (text.length <= maxCharacters) {
      setExtraReason(text);
    }
  };

  useEffect(() => {
    if (selectedToggle !== null && validateEmail(email) && !emailError) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [selectedToggle, email, emailError]);

  const handleButtonPress = () => {
    if (selectedToggle !== null && ContactTypes && !emailError) {
      const payload = {
        senderEmail: email,
        contactTypeId: ContactTypes[selectedToggle].id,
        message: extraReason,
      };
      sendInquiryMutation.mutate(payload);
    }
  };

  if (!ContactTypes) return null;

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: COLORS.BLACK }}
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
            {ContactTypes.map((type: ContactTypeSchema, index: number) => (
              <CustomCheckToggle
                key={type.id}
                index={index}
                isSelected={selectedToggle === index}
                onToggleChange={handleToggleChange}
                description={type.label}
              />
            ))}
          </View>
          <Text style={styles.titleText}>
            답변 받을 이메일 주소를 입력해주세요.
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              placeholder="이메일 주소를 입력해주세요."
              placeholderTextColor={COLORS.CONTENTS_LIGHT}
              keyboardType="email-address"
              onChangeText={handleEmailChange}
              onBlur={handleEmailBlur}
              onFocus={() => setEmailError(null)}
              value={email}
            />
          </View>
          {emailError && (
            <View style={styles.verifyStatusView}>
              <WarningCircleSvg />
              <Text style={styles.validityInfoText}>{emailError}</Text>
            </View>
          )}

          <Text style={styles.titleText}>상세 내용을 입력해주세요.</Text>

          <View style={styles.inputBoxContainer}>
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
                  y: 800,
                  animated: true,
                });
              }}
              onBlur={() => {
                scrollViewRef.current?.scrollTo({
                  y: 0,
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
        onPress={handleButtonPress}
        label="문의하기"
      />
    </>
  );
};

export default InquiryScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: 16,
    paddingBottom: 150,
    marginBottom: -50,
    paddingTop: 20,
  },
  headerText: {
    color: COLORS.CONTENTS_LIGHT,
    ...FONTS.B2,
  },
  titleText: {
    color: COLORS.WHITE,
    marginTop: 27,
    ...FONTS.B1_SB,
  },
  inputContainer: {
    marginTop: 12,
    height: 30,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: COLORS.CONTENTS_LIGHT,
  },
  inputText: {
    color: COLORS.WHITE,
    ...FONTS.B2,
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
    borderColor: COLORS.CONTENTS_LIGHT,
    borderRadius: 10,
    color: COLORS.WHITE,
  },
  placeholder: {
    color: COLORS.CONTENTS_LIGHT,
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
    color: COLORS.CONTENTS_LIGHT,
    ...FONTS.LB,
  },

  verifyStatusView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 4,
  },
  validityInfoText: {
    color: COLORS.PINK,
    ...FONTS.BTN,
  },
});

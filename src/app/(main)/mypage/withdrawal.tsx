import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import CustomCheckToggle from '@/components/common/CustomCheckToggle';
import useKeyboardScrollViewScroll from '@/hooks/useKeyboardScrollViewScroll';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import CustomAlert from '@/components/common/CustomAlert';

const withdrawal = () => {
  // 키보드 높이 조절 (커스텀 훅 사용)
  const scrollViewRef = useRef<ScrollView>(null);
  useKeyboardScrollViewScroll(scrollViewRef);

  // 토글 선택 (중복 선택을 위해 배열로 초기화)
  const [selectedToggles, setSelectedToggles] = useState<number[]>([4]);

  const handleToggleChange = (index: number) => {
    if (selectedToggles.includes(index)) {
      setSelectedToggles(selectedToggles.filter((i) => i !== index));
    } else {
      setSelectedToggles([...selectedToggles, index]);
    }
  };

  // 기타 사유 입력란
  const [extraReason, setExtraReason] = useState<string>('');
  const maxCharacters = 200; // 글자 수 제한
  const handleExtraReasonChange = (text: string) => {
    if (text.length <= maxCharacters) {
      setExtraReason(text);
    }
  };

  // 하단 완료 버튼 + 최종 확인 모달
  const [isButtonActive, setButtonActive] = useState(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  // 하나라도 체크박스 선택 시 하단 탈퇴하기 버튼 활성화
  useEffect(() => {
    const hasSelectedOtherReason =
      selectedToggles.includes(4) && extraReason.length > 0;
    const hasSelectedAnyReason = selectedToggles.length > 0;
    if (
      (hasSelectedAnyReason && !selectedToggles.includes(4)) ||
      hasSelectedOtherReason
    ) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [selectedToggles, extraReason]);

  const handleButtonPress = () => {
    setModalVisible(true);
  };
  const closeModal = () => setModalVisible(false);
  const handleConfirm = () => {
    // 여기에 삭제 작업을 수행하는 코드를 추가하면 됨 (일단 임시로 홈으로 보냄 + 0.5초의 지연)
    setTimeout(() => {
      console.log('삭제 확인');
      router.push('/(main)/home');
      closeModal();
    }, 500);
  };

  const FinalConfirmModal = () => {
    return (
      <CustomAlert
        isVisible={isModalVisible}
        onConfirm={handleConfirm}
        onCancel={closeModal}
        firstLine="정말 음계일기에서 탈퇴하시겠어요?"
        secondLine="작성하신 일기 및 편지, 음악들을 복구할 수 없어요."
        cancleMent="아니오, 취소할래요"
        confirmMent="네, 탈퇴할래요"
      />
    );
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: Colors.black }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.container}
        >
          <Text style={styles.headerText}>
            더 나은 서비스 제공을 위해,{'\n'}탈퇴하시려는 이유를 알려주세요.
          </Text>
          {/* 탈퇴 사유 선택 */}
          <View style={styles.toggleContainer}>
            <CustomCheckToggle
              index={0}
              isSelected={selectedToggles.includes(0)}
              onToggleChange={handleToggleChange}
              description="음악 추천이 마음에 들지 않아요"
            />
            <CustomCheckToggle
              index={1}
              isSelected={selectedToggles.includes(1)}
              onToggleChange={handleToggleChange}
              description="더 이상 일기를 쓰지 않아요"
            />
            <CustomCheckToggle
              index={2}
              isSelected={selectedToggles.includes(2)}
              onToggleChange={handleToggleChange}
              description="앱 사용법을 모르겠어요"
            />
            <CustomCheckToggle
              index={3}
              isSelected={selectedToggles.includes(3)}
              onToggleChange={handleToggleChange}
              description="새로운 계정으로 다시 시작하고 싶어요"
            />
            <CustomCheckToggle
              index={4}
              isSelected={selectedToggles.includes(4)}
              onToggleChange={handleToggleChange}
              description="기타"
            />
            {/* 기타 입력창 */}
            {selectedToggles.includes(4) && (
              <>
                <View style={styles.inputContainer}>
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
                  />
                </View>
                <View style={styles.maxlengthContainer}>
                  <Text style={styles.lbText}>
                    {extraReason.length}/{maxCharacters}
                  </Text>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomBottomButton
        isActive={isButtonActive}
        onPress={handleButtonPress} // 버튼 클릭 이벤트 핸들러
        label="탈퇴하기"
      />
      <FinalConfirmModal />
    </>
  );
};

export default withdrawal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 150,
  },
  headerText: {
    color: Colors.white,
    fontFamily: 'pret-b',
    fontSize: 18,
  },
  toggleContainer: {
    paddingTop: 48,
    gap: 20,
  },
  inputContainer: {
    position: 'relative',
  },
  extraContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    height: 212,
    borderWidth: 1,
    borderColor: Colors.contents_light,
    borderRadius: 10,
    color: Colors.white,
  },
  placeholder: {
    color: Colors.contents_light,
    position: 'absolute',

    top: 16,
    left: 16,
  },
  maxlengthContainer: {
    flexDirection: 'row-reverse',
    marginTop: -10,
  },
  lbText: {
    color: Colors.contents_light,
    ...Fonts.lb,
  },
});

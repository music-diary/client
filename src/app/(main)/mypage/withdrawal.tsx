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
import { COLORS, FONTS } from '@/constants';
import CustomCheckToggle from '@/components/common/CustomCheckToggle';
import useKeyboardScrollViewScroll from '@/hooks/useKeyboardScrollViewScroll';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import CustomAlertModal from '@/components/common/CustomAlertModal';
import { useModalStore } from '@/store/useModalStore';
import {
  useGetWithdrawalList,
  useUserId,
  useWithdrawal,
} from '@/api/hooks/useUsers';
import { useAppStore } from '@/store/useAppStore';
import { type WithdrawalType } from '@/models/interfaces';

const WithdrawalScreen = () => {
  const userId = useUserId();
  const { logout } = useAppStore();
  const { openModal, closeModal } = useModalStore();

  const { data: withdrawalTypes } = useGetWithdrawalList();

  const withdrawMutation = useWithdrawal({
    onSuccess: () => {
      console.log('탈퇴 성공');
      router.push('/onboarding');
      logout();
    },
  });

  // 키보드 높이 조절 (커스텀 훅 사용)
  const scrollViewRef = useRef<ScrollView>(null);
  useKeyboardScrollViewScroll(scrollViewRef);

  // 단일 토글 선택
  const [selectedToggle, setSelectedToggle] = useState<string | null>(null);

  const handleToggleChange = (id: string) => {
    setSelectedToggle(selectedToggle === id ? null : id);
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

  // "기타" 사유의 ID 찾기
  const otherReasonId = withdrawalTypes?.find(
    (type: WithdrawalType) => type.name === 'OTHER',
  )?.id;

  // 하나라도 체크박스 선택 시 하단 탈퇴하기 버튼 활성화
  useEffect(() => {
    const hasSelectedOtherReason =
      otherReasonId &&
      selectedToggle === otherReasonId &&
      extraReason.length > 0;
    const hasSelectedAnyReason = selectedToggle !== null;
    if (
      (hasSelectedAnyReason && selectedToggle !== otherReasonId) ||
      hasSelectedOtherReason
    ) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [selectedToggle, extraReason, otherReasonId]);

  const handleButtonPress = () => {
    openModal('withdrawal-confirm-modal');
  };

  const handleConfirm = () => {
    closeModal();
    if (selectedToggle) {
      const payload = {
        withdrawalReasonsId: selectedToggle,
        content: selectedToggle === otherReasonId ? extraReason : '',
      };
      withdrawMutation.mutate({ id: userId, payload });
    }
  };

  const FinalConfirmModal = () => {
    return (
      <CustomAlertModal
        name="withdrawal-confirm-modal"
        title="정말 뮤다에서 탈퇴하시겠어요?"
        description="작성하신 일기 및 편지, 음악들을 복구할 수 없어요."
        leftButtonText="아니오, 취소할래요"
        rightButtonText="네, 탈퇴할래요"
        onLeftButtonPress={closeModal}
        onRightButtonPress={handleConfirm}
      />
    );
  };

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
            더 나은 서비스 제공을 위해,{'\n'}탈퇴하시려는 이유를 알려주세요.
          </Text>
          {/* 탈퇴 사유 선택 */}
          <View style={styles.toggleContainer}>
            {withdrawalTypes.map((type: WithdrawalType) => (
              <CustomCheckToggle
                key={type.id}
                index={parseInt(type.id)}
                isSelected={selectedToggle === type.id}
                onToggleChange={() => handleToggleChange(type.id)}
                description={type.label}
              />
            ))}
            {/* 기타 입력창 */}
            {otherReasonId && selectedToggle === otherReasonId && (
              <>
                <View style={styles.inputContainer}>
                  {/* Placeholder 스타일링 */}
                  {extraReason === '' && (
                    <Text style={styles.placeholder}>
                      뮤다를 이용하면서 불편했던 점을 알려주시면{'\n'}서비스
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

export default WithdrawalScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 150,
  },
  headerText: {
    color: COLORS.WHITE,
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
    marginTop: -10,
  },
  lbText: {
    color: COLORS.CONTENTS_LIGHT,
    ...FONTS.LB,
  },
});

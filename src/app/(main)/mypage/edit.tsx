import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { COLORS, FONTS } from '@/constants';
import CustomCheckToggle from '@/components/common/CustomCheckToggle';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import { DefaultProfileSvg, ThanksStar } from 'assets/images/mypage';
import CustomBottomSheetModal from '@/components/common/CustomBottomSheetModal';
import { formatToDate } from '@/utils/date-utils';
import { useGetUserInfo, usePatchUser } from '@/api/hooks/useUsers';
import { type Gender } from '@/models/types';
import { type UserPayloadSchema } from '@/models/schemas';
import { WarningCircleSvg } from 'assets/images/onboarding';

const EditScreen = () => {
  const queryClient = useQueryClient();
  const { data: userInfo, isLoading, isError } = useGetUserInfo();
  const patchUserMutation = usePatchUser({
    onSuccess: (data: UserPayloadSchema) => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      router.back();
    },
  });

  // 데이터 로딩 중 표시
  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error occurred while fetching data.</Text>;

  const [nickname, setNickname] = useState(userInfo.name);
  const [isNicknameFocused, setIsNicknameFocused] = useState(false);
  const [nicknameError, setNicknameError] = useState('');
  const [isButtonActive, setButtonActive] = useState(false);

  const onChangeNickname = (inputText: string) => {
    setNickname(inputText);

    const validNameRegex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/;
    if (inputText.length > 6 || inputText.length < 1) {
      setNicknameError('이름은 한글, 영어, 숫자로 6자까지만 입력 가능해요');
      setButtonActive(false);
    } else if (!validNameRegex.test(inputText)) {
      setNicknameError('이름은 한글, 영어, 숫자로 6자까지만 입력 가능해요');
      setButtonActive(false);
    } else {
      setNicknameError('');
      setButtonActive(true);
    }
  };

  // 달력
  const birthday = new Date(userInfo.birthDay);
  const [selectedDate, setSelectedDate] = useState<Date>(birthday);
  const [tempDate, setTempDate] = useState<Date>(birthday);
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setTempDate(date);
    }
  };
  const showDatePicker = () => {
    setShowPicker(true);
  };
  const confirmDateSelection = () => {
    setSelectedDate(tempDate);
    setShowPicker(false);
  };

  // 성별 토글
  const genderOptions: Gender[] = ['FEMALE', 'MALE', 'OTHER'];
  const [selectedToggle, setSelectedToggle] = useState<number>(
    genderOptions.indexOf(userInfo.gender),
  );
  const handleToggleChange = (index: number) => {
    setSelectedToggle(index);
  };

  // 완료 버튼 활성화/비활성화 처리
  useEffect(() => {
    const isNicknameChanged = nickname !== userInfo.name;
    const isDateChanged =
      selectedDate.toLocaleDateString() !== birthday.toLocaleDateString();
    const isToggleChanged = genderOptions[selectedToggle] !== userInfo.gender;

    if (nicknameError || nickname.length > 6) {
      setButtonActive(false);
    } else {
      setButtonActive(isNicknameChanged || isDateChanged || isToggleChanged);
    }
  }, [nickname, selectedDate, selectedToggle, nicknameError]);

  const handleButtonPress = () => {
    if (nicknameError || nickname.length > 6) return;
    const payload: UserPayloadSchema = {
      name: nickname,
      birthDay: selectedDate.toISOString(),
      gender: genderOptions[selectedToggle],
      isGenreSuggested: userInfo.isGenreSuggested,
      isAgreedMarketing: userInfo.isAgreedMarketing,
      IsAgreedDiaryAlarm: userInfo.IsAgreedDiaryAlarm,
      diaryAlarmTime: userInfo.diaryAlarmTime,
      genres: userInfo.genre.map((g) => ({ id: g.id })),
    };
    patchUserMutation.mutate({ id: userInfo.id, payload });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          {/* 프로필 수정 */}
          <View style={styles.profile}>
            <View style={styles.profileImage}>
              <DefaultProfileSvg width={100} height={100} />
            </View>
            {userInfo.role === 'SPONSOR' && (
              <View style={styles.profileImageTop}>
                <ThanksStar />
              </View>
            )}
          </View>
          {/* body */}
          <View style={styles.body}>
            {/* 닉네임 */}
            <View style={styles.titleName}>
              <Text style={styles.btnText}>
                닉네임 <Text style={{ color: COLORS.PINK }}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.inputNickname,
                  isNicknameFocused && styles.inputNicknameFocused,
                ]}
                onChangeText={onChangeNickname}
                value={nickname}
                placeholder="닉네임을 입력하세요"
                placeholderTextColor={COLORS.CONTENTS_LIGHT}
                onFocus={() => setIsNicknameFocused(true)}
                onBlur={() => setIsNicknameFocused(false)}
                maxLength={10} // 입력 가능하도록 최대 길이 설정
              />
              {nicknameError ? (
                <View style={styles.verifyStatusView}>
                  <WarningCircleSvg />
                  <Text style={styles.errorText}>{nicknameError}</Text>
                </View>
              ) : null}
            </View>
            {/* 생년월일 */}
            <View style={styles.titleName}>
              <Text style={styles.btnText}>
                생년월일 <Text style={{ color: COLORS.PINK }}>*</Text>
              </Text>
              <TouchableOpacity
                style={styles.birthdayContainer}
                onPress={showDatePicker}
              >
                <Text style={styles.dateText}>
                  {formatToDate(selectedDate)}
                </Text>
              </TouchableOpacity>
            </View>
            {/* 성별 */}
            <View style={styles.titleName}>
              <Text style={styles.btnText}>
                성별 <Text style={{ color: COLORS.PINK }}>*</Text>
              </Text>
              <View style={styles.checkboxContainer}>
                <CustomCheckToggle
                  index={0}
                  isSelected={selectedToggle === 0}
                  onToggleChange={handleToggleChange}
                  description="여성"
                />
                <CustomCheckToggle
                  index={1}
                  isSelected={selectedToggle === 1}
                  onToggleChange={() => handleToggleChange(1)}
                  description="남성"
                />
                <CustomCheckToggle
                  index={2}
                  isSelected={selectedToggle === 2}
                  onToggleChange={() => handleToggleChange(2)}
                  description="선택하지 않음"
                />
              </View>
            </View>
          </View>
        </ScrollView>
        {/* 완료 버튼 */}
        <CustomBottomButton
          isActive={isButtonActive}
          onPress={handleButtonPress} // 버튼 클릭 이벤트 핸들러
          label="완료"
        />
        {/* 생년월일 변경 모달 구현 */}
        <CustomBottomSheetModal
          title="생년월일"
          visible={showPicker}
          onCancel={() => {
            setShowPicker(false);
          }}
          onSave={() => {
            confirmDateSelection();
          }}
        >
          <View style={styles.birthContainer}>
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="spinner"
              onChange={onChange}
              maximumDate={new Date()}
              minimumDate={new Date(1900, 0, 1)} // 최소 날짜는 1900년 1월
              textColor={COLORS.WHITE}
              locale="ko" // 한국어 설정
            />
          </View>
        </CustomBottomSheetModal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: 16,
  },
  profile: {
    alignItems: 'center',
    paddingVertical: 36,
    width: 100,
    alignSelf: 'center',
  },
  profileImage: {
    width: 101,
    height: 101,
    borderRadius: 51,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
  },
  profileImageTop: {
    position: 'absolute',
    top: 35,
    right: 0,
  },
  body: {
    gap: 30,
  },
  titleName: { gap: 10 },
  btnText: {
    color: COLORS.WHITE,
    ...FONTS.BTN,
  },
  verifyStatusView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  errorText: {
    color: COLORS.PINK,
    ...FONTS.BTN,
  },
  birthdayContainer: {
    borderWidth: 1,
    borderColor: COLORS.GREY1,
    borderRadius: 6,
    padding: 10,
    paddingVertical: 10,
  },
  inputNickname: {
    borderWidth: 1,
    borderColor: COLORS.GREY1,
    borderRadius: 6,
    padding: 10,
    color: COLORS.GREY1,
    ...FONTS.BTN,
    paddingVertical: 10,
  },
  inputNicknameFocused: {
    borderColor: COLORS.WHITE,
    color: COLORS.WHITE,
  },

  checkboxContainer: {
    flexDirection: 'row',
    gap: 15,
    paddingBottom: 30,
  },
  dateText: {
    color: COLORS.GREY1,
    ...FONTS.BTN,
  },
  birthContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
});

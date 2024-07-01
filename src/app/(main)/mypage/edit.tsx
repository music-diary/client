import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import { COLORS, FONTS } from '@/constants';
import CustomCheckToggle from '@/components/common/CustomCheckToggle';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import { PhotoSvg, DefaultProfileSvg } from 'assets/images/mypage';
import CustomBottomSheetModal from '@/components/common/CustomBottomSheetModal';
import { formatToDate } from '@/utils/date-utils';

const EditScreen = () => {
  const myName = 'Miya';
  const [nickname, setNickname] = useState(myName);
  const onChangeNickname = (inputText: string) => {
    setNickname(inputText);
  };

  // 달력
  const birthday = new Date(2000, 1, 21); // 2월은 1로 설정
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
  const [selectedToggle, setSelectedToggle] = useState<number | null>(0);
  const initialToggle = useRef<number | null>(selectedToggle);
  const handleToggleChange = (index: number) => {
    if (selectedToggle !== index) {
      setSelectedToggle(index);
    }
  };

  // 하단 버튼 활성화 조건
  const [isButtonActive, setButtonActive] = useState(true);

  useEffect(() => {
    const isNicknameChanged = nickname !== myName;
    const isDateChanged =
      selectedDate.toLocaleDateString() !== birthday.toLocaleDateString();
    const isToggleChanged = selectedToggle !== initialToggle.current;

    if (isNicknameChanged || isDateChanged || isToggleChanged) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [nickname, selectedDate, selectedToggle]);

  const handleButtonPress = () => {
    console.log('Button pressed!'); // 완료 버튼 누르면 실행 -> 추후 api 연결
    router.back(); // 스택 하나 뒤로 이동
  };
  return (
    <>
      <ScrollView style={styles.container}>
        {/* 프로필 수정 */}
        <View style={styles.profile}>
          <View style={styles.profileImage}>
            <DefaultProfileSvg width={100} height={100} />
            <TouchableOpacity>
              <View style={styles.cameraContainer}>
                <PhotoSvg />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={styles.deleteText}>이미지 삭제</Text>
          </TouchableOpacity>
        </View>
        {/* body */}
        <View style={styles.body}>
          {/* 닉네임 */}
          <View style={styles.titleName}>
            <Text style={styles.btnText}>
              닉네임 <Text style={{ color: COLORS.PINK }}>*</Text>
            </Text>
            <TextInput
              style={styles.inputNickname}
              onChangeText={onChangeNickname}
              value={nickname}
              placeholder="(기존 닉네임)"
              placeholderTextColor={COLORS.CONTENTS_LIGHT}
            />
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
              <Text style={styles.dateText}>{formatToDate(selectedDate)}</Text>
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
    </>
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
  },
  profileImage: {
    width: 101,
    height: 101,
    borderRadius: 51,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
  },
  cameraContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 1,
  },
  deleteText: {
    color: COLORS.CONTENTS_LIGHT,
    ...FONTS.BTN,
    marginTop: 11,
  },
  body: {
    gap: 30,
  },
  titleName: { gap: 10 },
  btnText: {
    color: COLORS.WHITE,
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

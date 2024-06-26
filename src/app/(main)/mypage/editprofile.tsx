import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import CustomCheckToggle from '@/components/common/CustomCheckToggle';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import BottomSheetModal from '@/components/home/BottomSheetModal';
import PhotoIcon from 'assets/images/mypageIcon/Photo.svg';
import DefaultProfileIcon from 'assets/images/mypageIcon/DefaultProfile.svg';

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedMonth = String(month).padStart(2, '0'); // 한 자리 수 월을 두 자리로 변환
  const formattedDay = String(day).padStart(2, '0');
  return `${year}-${formattedMonth}-${formattedDay}`;
};

const editprofile = () => {
  // 닉네임
  const myname = 'Miya';
  const [nickname, setNickname] = useState(myname);
  const onChangeNickname = (inputtext: string) => {
    setNickname(inputtext);
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
    const isNicknameChanged = nickname !== myname;
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
            <DefaultProfileIcon width={100} height={100} />
            <TouchableOpacity>
              <View style={styles.cameraContainer}>
                <PhotoIcon />
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
          <View style={styles.titlename}>
            <Text style={styles.btnText}>
              닉네임 <Text style={{ color: Colors.pink }}>*</Text>
            </Text>
            <TextInput
              style={styles.inputNickname}
              onChangeText={onChangeNickname}
              value={nickname}
              placeholder="(기존 닉네임)"
              placeholderTextColor={Colors.contents_light}
            />
          </View>
          {/* 생년월일 */}
          <View style={styles.titlename}>
            <Text style={styles.btnText}>
              생년월일 <Text style={{ color: Colors.pink }}>*</Text>
            </Text>
            <TouchableOpacity
              style={styles.birthdayContainer}
              onPress={showDatePicker}
            >
              <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
            </TouchableOpacity>
          </View>
          {/* 성별 */}
          <View style={styles.titlename}>
            <Text style={styles.btnText}>
              성별 <Text style={{ color: Colors.pink }}>*</Text>
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
      <BottomSheetModal
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
            textColor={Colors.white}
            locale="ko" // 한국어 설정
          />
        </View>
      </BottomSheetModal>
    </>
  );
};

export default editprofile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
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
    borderColor: Colors.white,
  },
  cameraContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 1,
  },
  deleteText: {
    color: Colors.contents_light,
    ...Fonts.btn,
    marginTop: 11,
  },
  body: {
    gap: 30,
  },
  titlename: { gap: 10 },
  btnText: {
    color: Colors.white,
    ...Fonts.btn,
  },
  birthdayContainer: {
    borderWidth: 1,
    borderColor: Colors.grey1,
    borderRadius: 6,
    padding: 10,
    paddingVertical: 10,
  },
  inputNickname: {
    borderWidth: 1,
    borderColor: Colors.grey1,
    borderRadius: 6,
    padding: 10,
    color: Colors.grey1,
    ...Fonts.btn,
    paddingVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    gap: 15,
    paddingBottom: 30,
  },
  dateText: {
    color: Colors.grey1,
    ...Fonts.btn,
  },
  birthContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
});

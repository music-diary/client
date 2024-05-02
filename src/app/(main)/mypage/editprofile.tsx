import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import CustomCheckToggle from '@/components/common/CustomCheckToggle';
import CustomBottomButton from '@/components/common/CustomBottomButton';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const formatDate = (date: Date): string => {
  const monthIndex = date.getMonth(); // 월 인덱스
  const monthName = monthNames[monthIndex]; // 월 이름
  const day = date.getDate(); // 일
  const year = date.getFullYear(); // 연도
  return `${monthName} ${day}, ${year}`; // "Month Day, Year" 형식으로 반환
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
    setSelectedToggle(selectedToggle === index ? null : index);
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

  // 완료 버튼 누르면 실행 -> 추후 api 연결
  const handleButtonPress = () => {
    if (isButtonActive) {
      console.log('Button pressed!');
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        {/* 프로필 수정 */}
        <View style={styles.profile}>
          <View style={styles.profileImage}>
            <TouchableOpacity>
              <View style={styles.cameraContainer}>
                <Feather name="camera" size={15} color="black" />
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
            {showPicker && (
              <View style={styles.pickerContainer}>
                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display="spinner"
                  onChange={onChange}
                  maximumDate={new Date()}
                  minimumDate={new Date(1900, 0, 1)} // 최소 날짜는 1900년 1월
                  textColor={Colors.white}
                />
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={confirmDateSelection}
                >
                  <Text style={styles.confirmText}>완료</Text>
                </TouchableOpacity>
              </View>
            )}
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
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.white,
  },
  cameraContainer: {
    position: 'absolute',
    bottom: -100,
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
    borderColor: Colors.white,
    borderRadius: 6,
    padding: 10,
    color: Colors.white,
    ...Fonts.b1_sb,
    paddingVertical: 10,
  },
  inputNickname: {
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 6,
    padding: 10,
    color: Colors.white,
    ...Fonts.b1_sb,
    paddingVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    gap: 15,
    paddingBottom: 30,
  },
  okbutton: {
    alignItems: 'center',
    height: 84,
    paddingVertical: 30,
    backgroundColor: Colors.purple,
  },
  dateText: {
    color: Colors.white,
    fontSize: 18,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -30,
    height: 200,
  },
  confirmButton: {
    marginRight: 10,
    backgroundColor: Colors.purple,
    borderRadius: 6,
    padding: 10,
  },
  confirmText: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

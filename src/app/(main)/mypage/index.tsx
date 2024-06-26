import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import BodyNavigator from '@/components/mypage/BodyNavigator';
import CustomToggle from '@/components/common/CustomToggle';
import CustomAlert from '@/components/common/CustomAlert';
import BottomSheetModal from '@/components/home/BottomSheetModal';
import MusicSelection from '@/components/home/MusicSelection';
import { useAppStore } from '@/store/useAppStore';
import ChartPieIcon from 'assets/images/mypageIcon/ChartPie.svg';
import DefaultProfileIcon from 'assets/images/mypageIcon/DefaultProfile.svg';
import { colorWithOpacity } from '@/utils/colorUtils';

// 추후 util 폴더 등으로 깔끔히 관리하기
function formatTime(date: Date): string {
  let hours: number = date.getHours();
  const minutes: number = date.getMinutes();
  const ampm: string = hours >= 12 ? '오후' : '오전';
  hours = hours % 12 || 12;
  const formattedMinutes = String(minutes).padStart(2, '0'); // 분 2자리로 관리 (05분, 07분 ..)
  return `${ampm} ${hours}:${formattedMinutes}`;
}

const MypageScreen = () => {
  const { logout } = useAppStore();

  const router = useRouter();
  // 날짜
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  /* 토글 설정 */

  // 장르 추천 토글
  const [isGenreToggled, setIsGenreToggled] = useState<boolean>(false);
  const handleToggleChange = (state: boolean) => {
    setIsGenreToggled(state);
  };

  // 일기 알림 토글
  const [isDiaryModalVisible, setDiaryModalVisible] = useState<boolean>(false); // 일기 알림 모달 관리
  const [isDiaryToggled, setIsDiaryToggled] = useState<boolean>(true);
  const handleDiaryToggleChange = (state: boolean) => {
    setIsDiaryToggled(state);
    setDiaryModalVisible(state);
  };

  // 기타 알림 토글
  const [marketingToggled, setMarketingToggled] = useState<boolean>(false);
  const handleEtcToggleChange = (state: boolean) => {
    setMarketingToggled(state);
  };

  /* onpress시 라우터 이동 설정 */
  // 통계 페이지로 이동
  const onPressStatistics = () => {
    router.push('/(main)/mypage/statistic');
  };

  // onpress시 editprofile로 이동
  const onPressEditProfile = () => {
    router.push('/(main)/mypage/editprofile');
  };
  // onpress시 inquiry(문의사항)으로 이동
  const onPressInquiry = () => {
    router.push('/(main)/mypage/inquiry');
  };
  // onpress시 withdrawal(회원탈퇴)으로 이동
  const onPressWithdrawal = () => {
    router.push('/(main)/mypage/withdrawal');
  };

  /* 모달 설정 */
  // 내 음악 취향 선택
  const [isMusicFlavorToggled, setIsMusicFlavorToggled] =
    useState<boolean>(false);
  const handleMusicFlavorToggleChange = () => {
    setIsMusicFlavorToggled(!isMusicFlavorToggled);
  };
  // 음악 취향 상태 관리 (현재는 임시로 pop, 랩/힙합 선택된 상태로 설정)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([
    'POP',
    '랩/힙합',
  ]);
  // 임시로 선택된 장르 상태 관리
  const [tempSelectedGenres, settempSelectedGenres] =
    useState<string[]>(selectedGenres);

  const handleSave = () => {
    setSelectedGenres(tempSelectedGenres);
    handleMusicFlavorToggleChange();
  };

  // 일기 알람 시간 설정
  const [diaryTime, setDiaryTime] = useState<Date>(today);
  const [tempDiaryTime, setTempDiaryTime] = useState<Date>(diaryTime);
  const handleDiaryTimeChange = () => {
    setDiaryTime(tempDiaryTime);
    setDiaryModalVisible(false);
  };
  const formattedDiaryTime = formatTime(diaryTime);

  // 로그아웃 모달
  const [isLogoutModalVisible, setLogoutModalVisible] =
    useState<boolean>(false);

  const openLogoutModal = () => setLogoutModalVisible(true);
  const closeLogoutModal = () => setLogoutModalVisible(false);

  const handleConfirm = () => {
    console.log(
      '🚀 ~ file: index.tsx:56 ~ handleConfirm ~ console:',
      '로그 아웃',
    );
    // 여기에 삭제 작업을 수행하는 코드를 추가하면 됨
    logout();
    closeLogoutModal();
  };

  return (
    <ScrollView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <View style={styles.headerleft}>
          <View style={styles.profileImage}>
            <DefaultProfileIcon />
          </View>
          <View style={styles.profileImageTop}>
            <Feather name="star" color={Colors.white} />
          </View>
          <Text style={styles.profileInfo}>
            <Text style={{ color: Colors.purple }}>Miya</Text>님과 함께한 지
            {'\n'}
            <View style={{ paddingVertical: 12 }} />
            <Text style={{ color: Colors.purple }}>60일</Text>이 되었어요
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.profileCorrection}
            onPress={onPressEditProfile}
          >
            <Text style={styles.profileCorrectionText}>프로필 수정</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* 헤더 컨텐츠 */}
      <Text style={styles.dateText}>{`${year}년 ${month}월`}</Text>
      <TouchableOpacity
        style={styles.headerContent}
        onPress={onPressStatistics}
      >
        <ChartPieIcon />
        <Text style={styles.textb2sb}>통계보기</Text>
      </TouchableOpacity>
      {/* 바디1 */}
      <View style={styles.body1}>
        <View style={styles.bodyRoute}>
          <Text style={styles.textb1}>내 음악 취향</Text>

          <TouchableOpacity
            style={styles.musicflaver}
            onPress={handleMusicFlavorToggleChange}
          >
            <Text style={styles.musicflaverText}>팝, 힙합 외 2</Text>
            <MaterialIcons
              name="arrow-forward-ios"
              size={14}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bodyRoute}>
          <Text style={styles.textb1}>다양한 장르 추천받기</Text>
          <CustomToggle
            isToggled={isGenreToggled}
            onToggleChange={handleToggleChange}
          />
        </View>
        {/* 바디2 */}
        <View style={styles.divider} />
        <View style={styles.body2}>
          <Text style={styles.textb1}>서비스 알림</Text>
          <View style={styles.bodyRoute}>
            <Text style={styles.textb1Gray1}>일기 알림</Text>
            <View style={styles.diaryTime}>
              <Pressable onPress={() => handleDiaryToggleChange(true)}>
                <Text style={styles.textb2}>{formattedDiaryTime}</Text>
              </Pressable>
              <CustomToggle
                isToggled={isDiaryToggled}
                onToggleChange={handleDiaryToggleChange}
              />
            </View>
          </View>
          <View style={styles.bodyRoute}>
            <Text style={styles.textb1Gray2}>마케팅 알림</Text>
            <CustomToggle
              isToggled={marketingToggled}
              onToggleChange={handleEtcToggleChange}
            />
          </View>
        </View>
        {/* 바디2-1 */}
        <View style={styles.divider} />
        <View style={styles.body2}>
          <BodyNavigator content="문의 사항" onPress={onPressInquiry} />
        </View>
        {/* 바디2-2 */}
        <View style={styles.divider} />
        <View style={styles.body2}>
          <BodyNavigator content="서비스 소개" onPress={() => {}} />
          <BodyNavigator content="오픈 라이센스" onPress={() => {}} />
          <BodyNavigator content="개인정보처리방침" onPress={() => {}} />
          <BodyNavigator content="이용 약관" onPress={() => {}} />
        </View>
        {/* 바디3 */}
        <View style={styles.divider} />
        <View style={styles.body3}>
          <TouchableOpacity onPress={openLogoutModal}>
            <Text style={styles.textb1}>로그아웃</Text>
            <CustomAlert
              isVisible={isLogoutModalVisible}
              onConfirm={handleConfirm} // 확인 버튼 눌렀을 때 실행할 함수
              onCancel={closeLogoutModal}
              firstLine="로그아웃하시겠어요?"
              cancleMent="아니요, 안할래요"
              confirmMent="네, 할래요"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressWithdrawal}>
            <Text style={styles.secession}>탈퇴하기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ paddingBottom: 120 }} />

      {/* 모달 관리 */}
      {/* 음악 취향 선택 */}
      <BottomSheetModal
        title="내 음악 취향"
        visible={isMusicFlavorToggled}
        onCancel={() => {
          handleMusicFlavorToggleChange();
        }}
        onSave={() => {
          handleSave();
        }}
      >
        <MusicSelection
          selectedGenres={tempSelectedGenres}
          setSelectedGenres={settempSelectedGenres}
        />
      </BottomSheetModal>
      {/* 일기 알람 모달 */}
      <BottomSheetModal
        title="일기 알림"
        visible={isDiaryModalVisible}
        onSave={() => {
          handleDiaryTimeChange();
        }}
      >
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={diaryTime}
            mode="time"
            display="spinner"
            onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
              if (selectedDate) {
                setTempDiaryTime(selectedDate);
              }
            }}
            textColor={Colors.white}
          />
        </View>
      </BottomSheetModal>
    </ScrollView>
  );
};

export default MypageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.black,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingBottom: 24,
  },
  headerleft: {
    backgroundColor: Colors.black,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 61,
    height: 61,
    borderRadius: 31,
    borderWidth: 1,
    borderColor: Colors.white,
    overflow: 'hidden',
  },
  profileImageTop: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.purple,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -6,
    left: 40,
  },
  profileInfo: {
    paddingLeft: 16,
    color: Colors.white,
    // fontfamily 확인 필요
    fontSize: 18,
    fontFamily: 'pret-b',
    // ...Fonts.t1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -24,
  },
  profileCorrection: {
    backgroundColor: Colors.bg_light,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 37,
  },
  profileCorrectionText: {
    color: Colors.white,
    ...Fonts.btn,
  },
  headerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    marginTop: 7,
    gap: 6,
    backgroundColor: Colors.grey3,
    borderRadius: 10,
  },
  dateText: {
    color: colorWithOpacity(Colors.white, 0.5),
    textAlign: 'left',
    ...Fonts.b2_sb,
  },
  body1: {
    paddingTop: 34,
    gap: 12,
  },
  bodyRoute: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textb1: {
    color: Colors.white,
    ...Fonts.b1,
  },
  textb1Gray1: {
    color: Colors.grey1,
    ...Fonts.b1,
    paddingLeft: 14,
  },
  textb1Gray2: {
    color: Colors.grey1,
    ...Fonts.b1,
  },
  textb2sb: {
    color: Colors.white,
    ...Fonts.b2_sb,
  },
  textb2: {
    color: Colors.white,
    ...Fonts.b2,
  },
  musicflaver: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  diaryTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  musicflaverText: {
    color: Colors.purple,
    ...Fonts.b2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.contents_light,
    marginHorizontal: -16,
    marginVertical: 8,
  },
  body2: {
    gap: 12,
  },
  body3: {
    gap: 10,
  },
  secession: {
    color: colorWithOpacity(Colors.purple, 0.5),
    ...Fonts.btn,
    textDecorationLine: 'underline',
  },
  pickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
});

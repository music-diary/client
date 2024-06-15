import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import BodyNavigator from '@/components/mypage/BodyNavigator';
import CustomToggle from '@/components/common/CustomToggle';
import CustomAlert from '@/components/common/CustomAlert';

const MypageScreen = () => {
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
  const [isDiaryToggled, setIsDiaryToggled] = useState<boolean>(true);
  const handleDiaryToggleChange = (state: boolean) => {
    setIsDiaryToggled(state);
  };

  // 기타 알림 토글
  const [isEtcToggled, setIsEtcToggled] = useState<boolean>(false);
  const handleEtcToggleChange = (state: boolean) => {
    setIsEtcToggled(state);
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
    closeLogoutModal();
  };

  return (
    <ScrollView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <View style={styles.headerleft}>
          <View style={styles.profileImage} />
          <View style={styles.profileImageTop} />
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
        <Feather name="pie-chart" size={24} color={Colors.grey1} />
        <Text style={styles.textb2sb}>통계보기</Text>
      </TouchableOpacity>
      {/* 바디1 */}
      <View style={styles.body1}>
        <TouchableOpacity style={styles.bodyRoute}>
          <Text style={styles.textb1}>내 음악 취향</Text>
          <View style={styles.musicflaver}>
            <Text style={styles.musicflaverText}>팝, 힙합 외 2</Text>
            <MaterialIcons
              name="arrow-forward-ios"
              size={14}
              color={Colors.white}
            />
          </View>
        </TouchableOpacity>
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
            <CustomToggle
              isToggled={isDiaryToggled}
              onToggleChange={handleDiaryToggleChange}
            />
          </View>
         
          {/* 기타 알림 */}
          <View style={styles.bodyRoute}>
            <Text style={styles.textb1Gray1}>기타 알림</Text>
            <CustomToggle
              isToggled={isEtcToggled}
              onToggleChange={handleEtcToggleChange}
            />
          </View>
          <Text style={styles.textb1}>마케팅 알림</Text>
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
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.white,
  },
  profileImageTop: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.purple,
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
    gap: 4,
    backgroundColor: Colors.grey3,
    borderRadius: 10,
  },
  dateText: {
    color: Colors.white_alpha[50],
    textAlign: 'left',
    ...Fonts.b2_sb,
  },
  contentText: {
    paddingTop: 8,
    color: Colors.white,
    ...Fonts.btn,
  },
  contentNumber: {
    paddingTop: 10,
    color: Colors.white,
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
  },
  musicflaverText: {
    paddingRight: 5,
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
    color: Colors.purple_alpha[50],
    ...Fonts.btn,
    textDecorationLine: 'underline',
  },

  // DatePicker
  pickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 50,
    borderRadius: 10,
    backgroundColor: Colors.grey3,
  },
  pickerHeader: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  pickerTitle: {
    color: Colors.white,
    ...Fonts.t1,
  },
  btnText: {
    color: Colors.purple,
    ...Fonts.b1_sb,
  },
});

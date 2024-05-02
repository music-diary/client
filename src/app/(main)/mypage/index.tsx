import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import HeaderContentItem from '@/components/mypage/HeaderContentItem';
import BodyNavigator from '@/components/mypage/BodyNavigator';
import CustomToggle from '@/components/common/CustomToggle';
import CustomAlert from '@/components/common/CustomAlert';

const MypageScreen = () => {
  // 장르 추천 토글
  const [isToggled, setIsToggled] = useState(false);
  const router = useRouter();
  const handleToggleChange = (state: boolean) => {
    setIsToggled(state);
  };

  // /* onpress시 routing 모음 /*
  // onpress시 archive로 이동
  const onPressArchive = () => {
    router.push('/(main)/archive');
  };
  // onpress시 letter로 이동
  const onPressLetter = () => {
    router.push('/(main)/letter');
  };
  // onpress시 myfriend로 이동
  const onPressMyfriend = () => {
    router.push('/(main)/mypage/myfriend');
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
      <View style={styles.headerContent}>
        <HeaderContentItem
          iconType="Feather"
          iconName="archive"
          text="음악 일기"
          number="10개"
          onPress={onPressArchive}
        />
        <HeaderContentItem
          iconType="Feather"
          iconName="send"
          text="보낸 편지"
          number="15개"
          onPress={onPressLetter}
        />
        <HeaderContentItem
          iconType="Ionicons"
          iconName="mail-open-outline"
          text="받은 편지"
          number="7개"
          onPress={onPressLetter}
        />
        <HeaderContentItem
          iconType="FontAwesome5"
          iconName="users"
          text="내 친구"
          number="20명"
          onPress={onPressMyfriend}
        />
      </View>
      {/* 바디1 */}
      <View style={styles.body1}>
        <TouchableOpacity style={styles.bodyRoute}>
          <Text style={styles.textb2}>음악 취향</Text>
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
          <Text style={styles.textb2}>새로운 장르 추천받기</Text>
          <CustomToggle
            isToggled={isToggled} // 초기 상태 전달
            onToggleChange={handleToggleChange} // 토글 상태 변경 이벤트 핸들러
          />
        </View>
        {/* 바디2 */}
        <View style={styles.divider} />
        <View style={styles.body2}>
          <BodyNavigator content="서비스 소개" onPress={() => {}} />
          <BodyNavigator content="문의 사항" onPress={onPressInquiry} />
          <BodyNavigator content="오픈 라이센스" onPress={() => {}} />
          <BodyNavigator content="개인정보처리방침" onPress={() => {}} />
          <BodyNavigator content="이용 약관" onPress={() => {}} />
        </View>
        {/* 바디3 */}
        <View style={styles.divider} />
        <View style={styles.body3}>
          <TouchableOpacity onPress={openLogoutModal}>
            <Text style={styles.textb2}>로그아웃</Text>
            <CustomAlert
              isVisible={isLogoutModalVisible}
              onConfirm={handleConfirm} // 확인 버튼 눌렀을 때 실행할 함수
              onCancel={closeLogoutModal}
              firstLine="로그아웃시 어쩌고,, 라이팅 고민"
              cancleMent="아니요, 안할래요"
              confirmMent="네, 할래요"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressWithdrawal}>
            <Text style={styles.secession}>회원탈퇴</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    paddingVertical: 30,
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
  profileInfo: {
    paddingLeft: 10,
    color: Colors.white,
    // fontfamily 확인 필요
    fontSize: 18,
    fontFamily: 'pret-b',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContentItem: {
    backgroundColor: Colors.bg_light,
    height: 88,
    width: 76,
    borderRadius: 6,
    padding: 10,
    alignItems: 'center',
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
    paddingTop: 50,
    gap: 16,
  },
  bodyRoute: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginVertical: 16,
    marginHorizontal: -16,
  },
  body2: {
    gap: 16,
  },
  body3: {
    gap: 10,
  },
  secession: {
    color: Colors.purple,
    ...Fonts.btn,
    textDecorationLine: 'underline',
  },
});

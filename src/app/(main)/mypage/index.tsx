import { useEffect, useState } from 'react';
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
import { COLORS, FONTS } from '@/constants';
import BodyNavigator from '@/components/mypage/BodyNavigator';
import CustomToggle from '@/components/common/CustomToggle';
import MusicSelection from '@/components/home/MusicSelection';
import { useAppStore } from '@/store/useAppStore';
import { ChartPieSvg, DefaultProfileSvg } from 'assets/images/mypage';
import { colorWithOpacity } from '@/utils/color-utils';
import CustomBottomSheetModal from '@/components/common/CustomBottomSheetModal';
import {
  calculateDaysSince,
  convertToTimeString,
  formatToMeridiemTime,
  formatToYearMonth,
  parseTime,
} from '@/utils/date-utils';
import CustomAlertModal from '@/components/common/CustomAlertModal';
import { useModalStore } from '@/store/useModalStore';
import { useGetUserInfo, usePatchUser } from '@/api/hooks/useUsers';
import { type IGenre } from '@/models/interfaces';
import { type UserPayload } from '@/models/schemas';

const MypageScreen = () => {
  const { data: userInfo, isLoading, isError } = useGetUserInfo();
  const patchUserMutation = usePatchUser();

  const { logout } = useAppStore();

  const router = useRouter();

  // 사용자 정보 상태
  const userName = userInfo?.name || '';
  const [isGenreSuggested, setIsGenreSuggested] = useState(
    userInfo?.isGenreSuggested || false,
  );
  const [isAgreedMarketing, setIsAgreedMarketing] = useState(
    userInfo?.isAgreedMarketing || false,
  );
  const [isDiaryToggled, setIsDiaryToggled] = useState(
    userInfo?.IsAgreedDiaryAlarm || false,
  );
  const [diaryTime, setDiaryTime] = useState<Date>(
    userInfo?.diaryAlarmTime
      ? parseTime(userInfo.diaryAlarmTime)
      : parseTime('11:00'),
  );

  const [tempDiaryTime, setTempDiaryTime] = useState<Date>(diaryTime);

  const [selectedGenres, setSelectedGenres] = useState<IGenre[]>(
    userInfo?.genre
      ? userInfo.genre.map((g) => ({ id: g.id, label: g.label, name: g.name }))
      : [],
  );

  const [tempSelectedGenres, setTempSelectedGenres] =
    useState<IGenre[]>(selectedGenres);

  const [isMusicFlavorToggled, setIsMusicFlavorToggled] =
    useState<boolean>(false);
  const [isDiaryModalVisible, setDiaryModalVisible] = useState<boolean>(false);
  const { openModal, closeModal } = useModalStore();

  const handleToggleChange = (state: boolean) => {
    setIsGenreSuggested(state);
  };

  const handleDiaryToggleChange = (state: boolean) => {
    setIsDiaryToggled(state);
    setDiaryModalVisible(state);
  };

  const handleEtcToggleChange = (state: boolean) => {
    setIsAgreedMarketing(state);
  };

  const handleMusicFlavorToggleChange = () => {
    setIsMusicFlavorToggled(!isMusicFlavorToggled);
  };

  const handleSave = () => {
    setSelectedGenres(tempSelectedGenres);
    handleMusicFlavorToggleChange();
    handleUpdateUser(); // 선택된 장르를 저장 후 업데이트
  };

  const handleDiaryTimeChange = () => {
    setDiaryTime(tempDiaryTime);
    setDiaryModalVisible(false);
    handleUpdateUser(); // 선택된 시간 업데이트
  };

  const handleUpdateUser = () => {
    const updatedGenres = tempSelectedGenres.map((genre) => ({
      id: genre.id,
    }));
    const updatedTime = convertToTimeString(tempDiaryTime);
    const payload: UserPayload = {
      name: userName,
      birthDay: userInfo.birthDay,
      gender: userInfo.gender,
      isGenreSuggested,
      isAgreedMarketing,
      IsAgreedDiaryAlarm: isDiaryToggled,
      diaryAlarmTime: updatedTime,
      genres: updatedGenres,
    };
    patchUserMutation.mutate({ id: userInfo.id, payload });
  };

  useEffect(() => {
    handleUpdateUser();
  }, [isGenreSuggested, isAgreedMarketing, isDiaryToggled]);

  const openLogoutModal = () => openModal('logout-confirm-modal');
  const handleConfirm = () => {
    logout();
    closeModal();
  };

  // 라우팅 핸들러
  const onPressStatistics = () => {
    router.push('/(main)/mypage/statistic');
  };

  const onPressEditProfile = () => {
    router.push('/(main)/mypage/edit');
  };

  const onPressInquiry = () => {
    router.push('/(main)/mypage/inquiry');
  };

  const onPressWithdrawal = () => {
    router.push('/(main)/mypage/withdrawal');
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error occurred while fetching data.</Text>;

  const formattedDiaryTime = formatToMeridiemTime(diaryTime);

  const selectedGenreLabels = selectedGenres
    .map((genre) => genre.label)
    .join(', ');

  return (
    <ScrollView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.profileImage}>
            <DefaultProfileSvg />
          </View>
          <View style={styles.profileImageTop}>
            <Feather name="star" color={COLORS.WHITE} />
          </View>
          <Text style={styles.profileInfo}>
            <Text style={{ color: COLORS.PURPLE }}>{userInfo.name}</Text> 님과
            함께한 지{'\n'}
            <View style={{ paddingVertical: 10 }} />
            <Text style={{ color: COLORS.PURPLE }}>
              {calculateDaysSince(userInfo.createdAt)}{' '}
            </Text>
            일이 되었어요
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
      <Text style={styles.dateText}>{formatToYearMonth(new Date())}</Text>
      <TouchableOpacity
        style={styles.headerContent}
        onPress={onPressStatistics}
      >
        <ChartPieSvg />
        <Text style={styles.textB2sb}>통계보기</Text>
      </TouchableOpacity>
      {/* 바디1 */}
      <View style={styles.body1}>
        <View style={styles.bodyRoute}>
          <Text style={styles.textB1}>내 음악 취향</Text>

          <TouchableOpacity
            style={styles.musicFlavor}
            onPress={handleMusicFlavorToggleChange}
          >
            <Text style={styles.musicFlavorText}>{selectedGenreLabels}</Text>
            <MaterialIcons
              name="arrow-forward-ios"
              size={14}
              color={COLORS.WHITE}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bodyRoute}>
          <Text style={styles.textB1}>다양한 장르 추천받기</Text>
          <CustomToggle
            isToggled={isGenreSuggested}
            onToggleChange={handleToggleChange}
          />
        </View>
        {/* 바디2 */}
        <View style={styles.divider} />
        <View style={styles.body2}>
          <Text style={styles.textB1}>서비스 알림</Text>
          <View style={styles.bodyRoute}>
            <Text style={styles.textB1Gray1}>일기 알림</Text>
            <View style={styles.diaryTime}>
              <Pressable onPress={() => handleDiaryToggleChange(true)}>
                <Text style={styles.textB2}>{formattedDiaryTime}</Text>
              </Pressable>
              <CustomToggle
                isToggled={isDiaryToggled}
                onToggleChange={handleDiaryToggleChange}
              />
            </View>
          </View>
          <View style={styles.bodyRoute}>
            <Text style={styles.textB1Gray2}>마케팅 알림</Text>
            <CustomToggle
              isToggled={isAgreedMarketing}
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
            <Text style={styles.textB1}>로그아웃</Text>
            <CustomAlertModal
              name="logout-confirm-modal"
              title="로그아웃하시겠어요?"
              leftButtonText="아니요, 안할래요"
              rightButtonText="네, 할래요"
              onLeftButtonPress={closeModal}
              onRightButtonPress={handleConfirm}
              isDelete={true}
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
      <CustomBottomSheetModal
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
          setSelectedGenres={setTempSelectedGenres}
        />
      </CustomBottomSheetModal>
      {/* 일기 알람 모달 */}
      <CustomBottomSheetModal
        title="일기 알림"
        visible={isDiaryModalVisible}
        onSave={() => {
          handleDiaryTimeChange();
        }}
      >
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={tempDiaryTime}
            mode="time"
            display="spinner"
            onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
              if (selectedDate) {
                setTempDiaryTime(selectedDate);
              }
            }}
            textColor={COLORS.WHITE}
          />
        </View>
      </CustomBottomSheetModal>
    </ScrollView>
  );
};

export default MypageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: COLORS.BLACK,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingBottom: 24,
  },
  headerLeft: {
    backgroundColor: COLORS.BLACK,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 61,
    height: 61,
    borderRadius: 31,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    overflow: 'hidden',
  },
  profileImageTop: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -6,
    left: 40,
  },
  profileInfo: {
    paddingLeft: 16,
    color: COLORS.WHITE,
    ...FONTS.T1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -24,
  },
  profileCorrection: {
    backgroundColor: COLORS.BG_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 37,
  },
  profileCorrectionText: {
    color: COLORS.WHITE,
    ...FONTS.BTN,
  },
  headerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    marginTop: 7,
    gap: 6,
    backgroundColor: COLORS.GREY3,
    borderRadius: 10,
  },
  dateText: {
    color: colorWithOpacity(COLORS.WHITE, 0.5),
    textAlign: 'left',
    ...FONTS.B2_SB,
  },

  bodyRoute: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textB1: {
    color: COLORS.WHITE,
    ...FONTS.B1,
  },
  textB1Gray1: {
    color: COLORS.GREY1,
    ...FONTS.B1,
    paddingLeft: 14,
  },
  textB1Gray2: {
    color: COLORS.GREY1,
    ...FONTS.B1,
  },
  textB2sb: {
    color: COLORS.WHITE,
    ...FONTS.B2_SB,
  },
  textB2: {
    color: COLORS.WHITE,
    ...FONTS.B2,
  },
  musicFlavor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  diaryTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  musicFlavorText: {
    color: COLORS.PURPLE,
    ...FONTS.B2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.CONTENTS_LIGHT,
    marginHorizontal: -16,
    marginVertical: 8,
  },
  body1: {
    paddingTop: 34,
    gap: 12,
  },
  body2: {
    gap: 12,
  },
  body3: {
    gap: 10,
  },
  secession: {
    color: colorWithOpacity(COLORS.PURPLE, 0.5),
    ...FONTS.BTN,
    textDecorationLine: 'underline',
  },
  pickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
});

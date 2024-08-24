import { router, useLocalSearchParams } from 'expo-router';
import { Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS, FONTS } from '@/constants';
import dummy_archive_day from '@/data/dummy_archive_day.json';
import DailyDiaryCard from '@/components/archive/DailyDiaryCard';
import { useModalToggleStore, useModalStore } from '@/store/useModalStore';
import { TrashSvg, UploadSvg } from 'assets/images/archive';
import CustomAlertModal from '@/components/common/CustomAlertModal';

export interface DailyDiaryData {
  id: string;
  date: string;
  albumCoverUrl: string;
  songTitle: string;
  artist: string;
  diaryTitle: string;
  emotions: string[];
  lyrics: string;
  diaryContent: string;
  feeling: string;
}

const ModalOpenView = ({
  onSharePress,
  onDeletePress,
}: {
  onSharePress: () => void;
  onDeletePress: () => void;
}) => {
  return (
    <View style={styles.modal}>
      <TouchableOpacity style={styles.modalContent} onPress={onSharePress}>
        <Text style={styles.b1WhiteText}>공유</Text>
        <UploadSvg fill={COLORS.WHITE} />
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity style={styles.modalContent} onPress={onDeletePress}>
        <Text style={styles.b1RedText}>삭제</Text>
        <TrashSvg fill={COLORS.RED} />
      </TouchableOpacity>
    </View>
  );
};

const DayScreen = () => {
  const { day, id } = useLocalSearchParams<{ day: string; id: string }>();
  const diaryId = id ?? '';
  const dailyDiaryData: DailyDiaryData[] = dummy_archive_day;

  const { toggleModal, isModalOpen } = useModalToggleStore();
  const { activeModal, openModal, closeModal } = useModalStore();

  const handleConfirm = () => {
    console.log('삭제 확인'); // 추후 삭제에 관해서는 비동기 처리 로직 추가 예정
    closeModal();
    router.back();
  };

  // 토글에서 공유 or 삭제버튼을 눌렀을 때
  const onSharePress = async () => {
    toggleModal();
    const content = {
      title: '공유하기',
      message: `음계일기 ${dailyDiaryData[0].date}을 공유합니다.`,
      url: dailyDiaryData[0].albumCoverUrl,
    };
    try {
      const result = await Share.share(content);
      if (result.action === Share.sharedAction) {
        console.log('공유 성공');
      } else if (result.action === Share.dismissedAction) {
        console.log('공유 취소');
      }
    } catch (error) {
      console.error('공유 실패:', error);
    }
  };
  const onSharePressHandler = () => {
    onSharePress().catch((error) => console.error('Error', error));
  };
  const onDeletePress = () => {
    toggleModal();
    openModal('delete-diary-modal');
  };

  return (
    <ScrollView style={styles.container}>
      {/* ...더보기 눌렸을때 */}
      {isModalOpen ? (
        <ModalOpenView
          onSharePress={onSharePressHandler}
          onDeletePress={onDeletePress}
        />
      ) : null}
      {/* 삭제버튼 눌렸을 때 */}
      {activeModal ? (
        <CustomAlertModal
          name="delete-diary-modal"
          title="이 일기를 정말 삭제하시겠어요?"
          description="한 번 삭제하면 일기를 복구할 수 없어요."
          leftButtonText="아니오, 그냥 둘래요"
          rightButtonText="네, 삭제할래요"
          onLeftButtonPress={closeModal}
          onRightButtonPress={handleConfirm}
          isDelete={true}
        />
      ) : null}
      <Text style={styles.b1LightText}>{day}</Text>
      <View style={styles.cardContainer}>
        <DailyDiaryCard diaryId={diaryId} />
      </View>
    </ScrollView>
  );
};

export default DayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: COLORS.BLACK,
  },
  modal: {
    backgroundColor: '#2A2B2B', // 추후 수정 필요할 수도..!
    position: 'absolute',
    top: 0,
    right: 0,
    width: 200,
    paddingHorizontal: 16,
    borderRadius: 16,
    zIndex: 1,
  },
  modalContent: {
    flexDirection: 'row',
    height: 44,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 0.5,
    backgroundColor: COLORS.CONTENTS_LIGHT,
    marginHorizontal: -16,
  },
  b1LightText: {
    paddingTop: 20,
    color: COLORS.CONTENTS_LIGHT,
    ...FONTS.B1,
  },
  b1WhiteText: {
    color: COLORS.WHITE,
    ...FONTS.B1,
  },
  b1RedText: {
    color: COLORS.RED,
    ...FONTS.B1,
  },
  cardContainer: {
    marginTop: 10,
    marginBottom: 130,
  },
});

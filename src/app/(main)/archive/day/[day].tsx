import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { COLORS, FONTS } from '@/constants';
import DailyDiaryCard from '@/components/archive/DailyDiaryCard';
import { useModalStore } from '@/store/useModalStore';
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

const DayScreen = () => {
  const { day, id } = useLocalSearchParams<{ day: string; id: string }>();
  const diaryId = id ?? '';

  const { activeModal, closeModal } = useModalStore();

  const handleConfirm = () => {
    console.log('삭제 확인');
    closeModal();
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
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
  b1LightText: {
    paddingTop: 20,
    color: COLORS.CONTENTS_LIGHT,
    ...FONTS.B1,
  },
  cardContainer: {
    marginTop: 10,
    marginBottom: 130,
  },
});

import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { COLORS, FONTS } from '@/constants';
import DailyDiaryCard from '@/components/archive/DailyDiaryCard';
import { useModalStore } from '@/store/useModalStore';
import CustomAlertModal from '@/components/common/CustomAlertModal';
import { useDeleteDiary } from '@/api/hooks/useArchive';

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
  const { mutate: deleteDiary } = useDeleteDiary();

  const handleConfirm = () => {
    deleteDiary(diaryId, {
      onSuccess: () => {
        console.log('삭제 확인');
        closeModal(); // 모달 닫기
        router.back(); // 이전 페이지로 이동
      },
      onError: (error) => {
        console.error('삭제 오류:', error);
        closeModal(); // 오류 발생 시에도 모달을 닫음
      },
    });
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

import React, { useRef, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { COLORS, FONTS } from '@/constants';
import DailyDiaryCard from '@/components/archive/DailyDiaryCard';
import { useModalStore, useModalToggleStore } from '@/store/useModalStore';
import CustomAlertModal from '@/components/common/CustomAlertModal';
import { useDeleteDiary } from '@/api/hooks/useArchive';
import CustomSplash from '@/components/common/CustomSplash';
import { splashOptions } from '@/constants/data';
import { useSplashStore } from '@/store/useSplashStore';
import HeaderModalView from '@/components/archive/HeaderModalView';
import { handleSaveToGallery } from '@/utils/image-utils';
import CustomToast from '@/components/common/CustomToast';
import useToastStore from '@/store/useToastStore';

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

  const { showToast } = useToastStore();
  const { toggleModal, isModalOpen } = useModalToggleStore();
  const { activeModal, openModal, closeModal } = useModalStore();

  const { openSplash, closeSplash } = useSplashStore();
  const { mutate: deleteDiary } = useDeleteDiary();

  const cardRef = useRef<View>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const onSave = () => {
    toggleModal();
    handleSaveToGallery({ cardRef, setIsCapturing, showToast });
  };

  const onDelete = () => {
    toggleModal();
    openModal('delete-diary-modal');
  };

  const handleDeleteConfirm = () => {
    deleteDiary(diaryId, {
      onSuccess: () => {
        closeModal();
        openSplash('delete');
      },
      onError: (error) => {
        console.error('삭제 오류:', error);
        closeModal();
      },
    });
  };

  const closeDeleteSplash = () => {
    setTimeout(() => {
      router.back();
    }, 0);
    closeSplash();
  };

  return (
    <>
      <ScrollView style={styles.container}>
        {activeModal && (
          <CustomAlertModal
            name="delete-diary-modal"
            title="이 일기를 정말 삭제하시겠어요?"
            description="한 번 삭제하면 일기를 복구할 수 없어요."
            leftButtonText="아니오, 그냥 둘래요"
            rightButtonText="네, 삭제할래요"
            onLeftButtonPress={closeModal}
            onRightButtonPress={handleDeleteConfirm}
            isDelete={true}
          />
        )}
        <Text style={styles.b1LightText}>{day}</Text>
        <View style={styles.cardContainer}>
          <DailyDiaryCard
            diaryId={diaryId}
            ref={cardRef}
            isCapturing={isCapturing}
          />
        </View>

        {/* ...더보기 눌렸을때 */}
        {isModalOpen ? (
          <HeaderModalView onSavePress={onSave} onDeletePress={onDelete} />
        ) : null}
        {/* 스플래시 화면 */}
        <CustomSplash
          name="delete"
          description={splashOptions.delete.description}
          toastMessage={splashOptions.delete.toastMessage}
          svg={splashOptions.delete.svg}
          onClose={closeDeleteSplash}
        />
      </ScrollView>
      <CustomToast position="center" />
    </>
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

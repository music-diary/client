/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import dummy_archive_day from '@/data/dummy_archive_day.json';
import DailyDiaryCard from '@/components/archive/DailyDiaryCard';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { useModalToggleStore } from '@/store/useModalStore';
import CustomAlert from '@/components/common/CustomAlert';
import UploadIcon from 'assets/images/archiveIcon/Upload.svg';
import TrashIcon from 'assets/images/archiveIcon/Trash.svg';

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
        <UploadIcon fill={Colors.white} />
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity style={styles.modalContent} onPress={onDeletePress}>
        <Text style={styles.b1RedText}>삭제</Text>
        <TrashIcon fill={Colors.red} />
      </TouchableOpacity>
    </View>
  );
};

const DayScreen = () => {
  // ...모달 토글 상태 (zustand 사용)
  const { toggleModal, isModalOpen } = useModalToggleStore();
  // 삭제 모달 상태
  const [isDeleteModalVisible, setModalVisible] = useState<boolean>(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
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
      url: dailyDiaryData[0].albumCoverUrl, // 수정 필요.. 이미지 형식으로 저장해야하나 고민중
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
  const onDeletePress = () => {
    toggleModal();
    openModal();
  };

  const { day } = useLocalSearchParams<{ day: string }>();
  const dailyDiaryData: DailyDiaryData[] = dummy_archive_day;

  return (
    <ScrollView style={styles.container}>
      {/* ...더보기 눌렸을때 */}
      {isModalOpen ? (
        <ModalOpenView
          onSharePress={onSharePress}
          onDeletePress={onDeletePress}
        />
      ) : null}
      {/* 삭제버튼 눌렸을 때 */}
      {isDeleteModalVisible ? (
        <CustomAlert
          isVisible={isDeleteModalVisible}
          onConfirm={handleConfirm}
          onCancel={closeModal}
          firstLine="이 일기를 정말 삭제하시겠어요?"
          secondLine="한 번 삭제하면 일기를 복구할 수 없어요."
          cancleMent="아니오, 그냥 둘래요"
          confirmMent="네, 삭제할래요"
          isDelete={true}
        />
      ) : null}
      <Text style={styles.b1LightText}>{day}</Text>
      <View style={styles.cardContainer}>
        <DailyDiaryCard {...dailyDiaryData[0]} />
      </View>
    </ScrollView>
  );
};

export default DayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.black,
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
    backgroundColor: Colors.contents_light,
    marginHorizontal: -16,
  },
  b1LightText: {
    paddingTop: 20,
    color: Colors.contents_light,
    ...Fonts.b1,
  },
  b1WhiteText: {
    color: Colors.white,
    ...Fonts.b1,
  },
  b1RedText: {
    color: Colors.red,
    ...Fonts.b1,
  },
  cardContainer: {
    marginTop: 10,
    marginBottom: 130,
  },
});

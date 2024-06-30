import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomAlertModal from '@/components/common/CustomAlertModal';
import { Colors, Fonts } from '@/constants';
import useDraftStore from '@/store/useDraftStore';
import { useModalStore } from '@/store/useModalStore';
import { colorWithOpacity } from '@/utils/color-utils';

const draftList = [
  { id: 1, title: '어쩌구 제목', date: '24.04.23', music: '밤양갱' },
  { id: 2, title: '어쩌구 제목', date: '24.04.23', music: '' },
  { id: 3, title: '어쩌구 제목', date: '24.04.23', music: '' },
  { id: 4, title: '어쩌구 제목', date: '24.04.23', music: '' },
  { id: 5, title: '어쩌구 제목', date: '24.04.23', music: '' },
  { id: 6, title: '어쩌구 제목', date: '24.04.23', music: '밤양갱' },
  { id: 7, title: '어쩌구 제목', date: '24.04.23', music: '' },
  { id: 8, title: '어쩌구 제목', date: '24.04.23', music: '' },
  { id: 9, title: '어쩌구 제목', date: '24.04.23', music: '밤양갱' },
  { id: 10, title: '어쩌구 제목', date: '24.04.23', music: '' },
  { id: 11, title: '어쩌구 제목', date: '24.04.23', music: '' },
  { id: 12, title: '어쩌구 제목', date: '24.04.23', music: '' },
  { id: 13, title: '어쩌구 제목', date: '24.04.23', music: '밤양갱' },
  { id: 14, title: '어쩌구 제목', date: '24.04.23', music: '' },
  { id: 15, title: '어쩌구 제목', date: '24.04.23', music: '' },
  { id: 16, title: '어쩌구 제목', date: '24.04.23', music: '밤양갱' },
  { id: 17, title: '어쩌구 제목', date: '24.04.23', music: '' },
  { id: 18, title: '어쩌구 제목', date: '24.04.23', music: '' },
  { id: 19, title: '어쩌구 제목', date: '24.04.23', music: '' },
  { id: 20, title: '어쩌구 제목', date: '24.04.23', music: '밤양갱' },
  { id: 21, title: '어쩌구 제목', date: '24.04.23', music: '' },
  { id: 22, title: '어쩌구 제목', date: '24.04.23', music: '' },
  { id: 23, title: '어쩌구 제목', date: '24.04.23', music: '밤양갱' },
];

const DraftScreen = () => {
  const { closeModal } = useModalStore();
  const isEditMode = useDraftStore((state) => state.isEditMode);
  const [selectedDrafts, setSelectedDrafts] = useState<number[]>([]);

  useEffect(() => {
    if (!isEditMode) {
      setSelectedDrafts([]);
    }
  }, [isEditMode]);

  const handleDraftPress = (draft: (typeof draftList)[0]) => {
    if (isEditMode) {
      if (selectedDrafts.includes(draft.id)) {
        setSelectedDrafts(selectedDrafts.filter((id) => id !== draft.id));
      } else {
        setSelectedDrafts([...selectedDrafts, draft.id]);
      }
    } else {
      console.log('편집임 클릭');
    }
  };

  const handleDeleteDrafts = () => {
    console.log('삭제');
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.totalText}>
          총 <Text style={styles.number}>{draftList.length}</Text>개
        </Text>
        <ScrollView style={styles.draftListContainer}>
          {draftList.map((draft) => (
            <TouchableOpacity
              key={draft.id}
              style={[
                styles.draftContainer,
                selectedDrafts.includes(draft.id) && styles.selectedDraft,
              ]}
              onPress={() => handleDraftPress(draft)}
            >
              <View style={styles.infoView}>
                <View style={styles.titleView}>
                  <Text style={styles.title}>{draft.title}</Text>
                  {draft.music && (
                    <Text style={styles.music}>{draft.music} 외 2곡</Text>
                  )}
                </View>
                <Text style={styles.date}>{draft.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <CustomAlertModal
        name="delete-drafts"
        title="이 일기를 정말 삭제하시겠어요?"
        description="한 번 삭제하면 일기를 복구할 수 없어요."
        leftButtonText="아니오, 그냥 둘래요"
        rightButtonText="네 삭제할래요"
        onLeftButtonPress={closeModal}
        onRightButtonPress={handleDeleteDrafts}
        isDelete={true}
      />
    </>
  );
};

export default DraftScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: Colors.BLACK,
    flex: 1,
    paddingTop: 22,
    gap: 10,
  },
  totalText: {
    paddingHorizontal: 16,
    color: 'white',
    ...Fonts.LB,
  },
  number: {
    color: Colors.PURPLE,
  },
  draftListContainer: {
    flex: 1,
  },
  draftContainer: {
    paddingHorizontal: 16,
  },
  infoView: {
    gap: 4,
    borderBottomWidth: 1,
    borderColor: Colors.GREY1,
    paddingVertical: 10,
  },
  selectedDraft: {
    backgroundColor: colorWithOpacity(Colors.WHITE, 0.1), // 선택된 항목의 배경 색상
  },
  titleView: {
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    color: Colors.WHITE,
    ...Fonts.B2_SB,
  },
  music: {
    color: Colors.PURPLE,
    ...Fonts.B2_SB,
  },
  date: {
    color: Colors.GREY1,
    ...Fonts.BTN,
  },
});

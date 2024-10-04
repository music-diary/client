import { useCallback, useEffect, useState } from 'react';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateDiary, useDeleteDiary } from '@/api/hooks/useDiaries';
import CustomAlertModal from '@/components/common/CustomAlertModal';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import DetailedEmotionSelector from '@/components/diary/DetailedEmotionSelector';
import EmotionSelector from '@/components/diary/EmotionSelector';
import MoodSelector from '@/components/diary/MoodSelector';
import SelectorView from '@/components/diary/SelectorView';
import TopicSelector from '@/components/diary/TopicSelector';
import { COLORS } from '@/constants';
import { type IEmotion, type ITopic } from '@/models/interfaces';
import { useModalStore } from '@/store/useModalStore';
import { isEmptyObject } from '@/utils/common-utils';
import { trackEvent } from '@/utils/amplitude-utils';

const SubjectEmotionScreen = () => {
  const queryClient = useQueryClient();

  const { stateInit } = useLocalSearchParams();

  const [mood, setMood] = useState<IEmotion>({} as IEmotion);
  const [emotions, setEmotions] = useState<IEmotion[]>([]);
  const [detailedEmotions, setDetailedEmotions] = useState<IEmotion[]>([]);
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [diaryId, setDiaryId] = useState<string>('');
  const [error, setError] = useState<string | null>(null); // 오류 상태

  const { closeModal } = useModalStore();
  const { mutate: deleteDiary } = useDeleteDiary();

  useEffect(() => {
    trackEvent('Start Writing 1');
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (stateInit) {
        setMood({} as IEmotion);
      }
    }, [stateInit]),
  );

  const { mutate: createDiary } = useCreateDiary({
    onSuccess: (id: string) => {
      setDiaryId(id); // 생성된 diaryId 설정
      setError(null); // 오류 상태 초기화
      queryClient.setQueryData(['diary', diaryId], {
        id: diaryId,
        status: 'EDIT',
      });
    },
    onError: () => {
      setError('일기를 생성하는 데 실패했습니다. \n 다시 시도해 주세요.');
    },
  });

  useFocusEffect(
    useCallback(() => {
      // diaryId가 없을 때만 새로 생성
      if (!diaryId) {
        createDiary(); // mutate 함수 호출
      }
    }, []),
  );

  const handleNext = () => {
    const paramsData = {
      mood: JSON.stringify(mood),
      emotions: JSON.stringify(emotions),
      detailedEmotions: JSON.stringify(detailedEmotions),
      topics: JSON.stringify(topics),
      diaryId,
    };
    trackEvent('Start Writing 2', paramsData);
    router.push({
      pathname: '/diary/write',
      params: paramsData,
    });
  };

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <SelectorView title="오늘 하루는 어땠나요?" required>
          <MoodSelector state={mood} setState={setMood} />
        </SelectorView>
        {!isEmptyObject(mood) && (
          <SelectorView
            title="어떤 감정이 느껴지시나요?"
            description="최대 2개까지 선택 가능해요"
            required
          >
            <EmotionSelector
              mood={mood}
              state={emotions}
              setState={setEmotions}
            />
          </SelectorView>
        )}
        {!isEmptyObject(mood) && emotions.length > 0 && (
          <SelectorView
            title="조금 더 자세히 알려주세요"
            description="최대 3개까지 선택 가능해요"
          >
            <DetailedEmotionSelector
              mood={mood}
              emotions={emotions}
              state={detailedEmotions}
              setState={setDetailedEmotions}
            />
          </SelectorView>
        )}
        {!isEmptyObject(mood) && emotions.length > 0 && (
          <SelectorView
            title="오늘은 어떤 주제를 기록하고 싶으신가요?"
            description="선택하신 내용을 기반으로 음악을 추천해 드릴게요"
            subDescription="*최대 2개까지 선택 가능해요"
          >
            <TopicSelector mood={mood} state={topics} setState={setTopics} />
          </SelectorView>
        )}
      </ScrollView>
      <CustomBottomButton
        isActive={!isEmptyObject(mood) && emotions.length > 0}
        onPress={handleNext} // 버튼 클릭 이벤트 핸들러
        label="완료"
      />
      <CustomAlertModal
        name="write-cancel"
        title="작성을 그만두시겠어요?"
        description="지금 그만두시면, 노래를 추천 받을 수 없어요."
        leftButtonText="그만두기"
        rightButtonText="일기 계속 작성하기"
        onLeftButtonPress={() => {
          closeModal();
          deleteDiary(diaryId);
          setDiaryId('');
          router.replace('/(main)');
        }}
        onRightButtonPress={closeModal}
      />
    </>
  );
};

export default SubjectEmotionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  errorContainer: {
    marginVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: COLORS.RED, // 오류 메시지 배경색
    borderRadius: 8,
    padding: 10,
  },
  errorText: {
    color: COLORS.WHITE, // 오류 메시지 텍스트 색상
    fontSize: 16,
    textAlign: 'center',
  },
});

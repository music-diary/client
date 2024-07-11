import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import DetailedEmotionSelector from '@/components/diary/DetailedEmotionSelector';
import EmotionSelector from '@/components/diary/EmotionSelector';
import MoodSelector from '@/components/diary/MoodSelector';
import SelectorView from '@/components/diary/SelectorView';
import TopicSelector from '@/components/diary/TopicSelector';
import { COLORS } from '@/constants';
import { type IEmotion, type ITopic } from '@/models/interfaces';
import { isEmptyObject } from '@/utils/common-utils';
import { createDiary } from '@/api/hooks/useDiaries';

const SubjectEmotionScreen = () => {
  const [mood, setMood] = useState<IEmotion>({} as IEmotion);
  const [emotions, setEmotions] = useState<IEmotion[]>([]);
  const [detailedEmotions, setDetailedEmotions] = useState<IEmotion[]>([]);
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [diaryId, setDiaryId] = useState<string>('');

  useEffect(() => {
    const fetchDiaryId = async () => {
      try {
        const id = await createDiary();
        setDiaryId(id);
      } catch (error) {
        console.error('Failed to create diary:', error);
      }
    };

    fetchDiaryId();
  }, []);

  const handleNext = () => {
    router.push({
      pathname: '/diary/write',
      params: {
        mood: JSON.stringify(mood),
        emotions: JSON.stringify(emotions),
        detailedEmotions: JSON.stringify(detailedEmotions),
        topics: JSON.stringify(topics),
        diaryId,
      },
    });
  };

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
});

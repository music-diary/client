import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import DetailedEmotionSelector from '@/components/diary/DetailedEmotionSelector';
import EmotionSelector from '@/components/diary/EmotionSelector';
import MoodSelector from '@/components/diary/MoodSelector';
import SelectorView from '@/components/diary/SelectorView';
import TopicSelector from '@/components/diary/TopicSelector';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

const DiaryScreen = () => {
  const [topic, setTopic] = useState<string[]>([]);
  const [mood, setMood] = useState('');
  const [emotions, setEmotions] = useState<string[]>([]);
  const [detailedEmotions, setDetailedEmotions] = useState<string[]>([]);
  return (
    <ScrollView style={styles.container}>
      <SelectorView
        title="오늘은 어떤 주제를 기록하고 싶으신가요?"
        description="선택하신 내용을 기반으로 음악을 추천해 드릴게요"
        subDescription="*최대 2개까지 선택 가능해요"
      >
        <TopicSelector state={topic} setState={setTopic} />
      </SelectorView>
      <SelectorView title="오늘 하루는 어땠나요?">
        <MoodSelector state={mood} setState={setMood} />
      </SelectorView>
      {mood && (
        <SelectorView
          title="어떤 감정이 느껴지시나요?"
          description="최대 2개까지 선택 가능해요"
        >
          <EmotionSelector
            mood={mood}
            state={emotions}
            setState={setEmotions}
          />
        </SelectorView>
      )}
      {emotions.length > 0 && (
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
      {detailedEmotions.length > 0 && (
        <SelectorView title="지금 감정이 얼마나 강렬한가요?"></SelectorView>
      )}
    </ScrollView>
  );
};

export default DiaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  titleContainer: {
    gap: 6,
  },
  title: {
    color: Colors.white,
    ...Fonts.t1,
  },
  description: {
    color: Colors.white,
    ...Fonts.btn,
  },
  info: {
    color: '#6F6F6F',
    fontFamily: 'pret-sb',
    fontSize: 12,
  },
});

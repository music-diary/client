import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useEmotions } from '@/api/hooks/useDiaries';
import { type IEmotion } from '@/models/interfaces';
import { type Mood } from '@/models/types';
import SelectorButton from './SelectorButton';

interface EmotionSelectorProps {
  mood: IEmotion;
  state: IEmotion[];
  setState: React.Dispatch<React.SetStateAction<IEmotion[]>>;
}

const EmotionSelector = ({ mood, state, setState }: EmotionSelectorProps) => {
  const { data: emotions, isLoading } = useEmotions();
  if (isLoading || !emotions) return null;

  useEffect(() => {
    setState([]); // mood가 바뀔 때 선택된 감정 초기화
  }, [mood, setState]);

  const setEmotion = (emotion: IEmotion) => {
    if (state.some((e) => e.id === emotion.id)) {
      setState(state.filter((e) => e.id !== emotion.id));
    } else if (state.length < 2) {
      setState((prev) => {
        const newState = [...prev, emotion];
        return newState.sort(
          (a, b) =>
            emotions.findIndex((e) => e.id === a.id) -
            emotions.findIndex((e) => e.id === b.id),
        );
      });
    }
  };

  const emotionList = emotions.filter((e) => e.parentId === mood.id);

  return (
    <View style={styles.container}>
      {emotionList.map((emotion) => (
        <SelectorButton
          key={emotion.id}
          moodName={mood.name as Mood}
          type={emotion.label}
          onPress={() => setEmotion(emotion)}
          isSelected={state.some((e) => e.id === emotion.id)}
        />
      ))}
    </View>
  );
};

export default EmotionSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});

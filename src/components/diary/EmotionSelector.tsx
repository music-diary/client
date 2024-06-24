import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { type Mood } from '@/models/types';
import SelectorButton from './SelectorButton';

const emotionGroupList = {
  happy: [
    '행복한',
    '기대하는',
    '감사한',
    '편안한',
    '후련한',
    '추억하는',
    '벅차오르는',
  ],
  soso: ['평범한', '무관심한', '고민되는', '묘한', '신기한', '회상하는'],
  bad: [
    '불편한',
    '미련남은',
    '부끄러운',
    '황당한',
    '미안한',
    '슬픈',
    '우울한',
    '화나는',
    '혐오스러운',
    '두려운',
  ],
};

interface EmotionSelectorProps {
  mood: Mood;
  state: string[];
  setState: React.Dispatch<React.SetStateAction<string[]>>;
}

const EmotionSelector = ({ mood, state, setState }: EmotionSelectorProps) => {
  const emotionList = emotionGroupList[mood as keyof typeof emotionGroupList];

  useEffect(() => {
    setState([]); // mood가 바뀔 때 선택된 감정 초기화
  }, [mood]);

  const setEmotion = (emotion: string) => {
    if (state.includes(emotion)) {
      setState(state.filter((e) => e !== emotion));
    } else if (state.length < 2) {
      setState([...state, emotion]);
    }
  };

  return (
    <View style={styles.container}>
      {emotionList.map((emotion) => (
        <SelectorButton
          key={emotion}
          mood={mood}
          type={emotion}
          onPress={() => setEmotion(emotion)}
          isSelected={state.includes(emotion)}
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

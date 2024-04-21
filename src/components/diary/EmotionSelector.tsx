import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '@/constants/Colors';
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
  mood: string;
  state: string[];
  setState: React.Dispatch<React.SetStateAction<string[]>>;
}

const EmotionSelector = ({ mood, state, setState }: EmotionSelectorProps) => {
  const emotionList = emotionGroupList[mood as keyof typeof emotionGroupList];

  const color = {
    happy: { backgroundColor: Colors.green, opacity: 0.5 },
    soso: { backgroundColor: Colors.purple, opacity: 0.5 },
    bad: { backgroundColor: Colors.blue, opacity: 0.5 },
  };

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
          type={emotion}
          onPress={() => setEmotion(emotion)}
          isSelected={state.includes(emotion)}
          color={color[mood as keyof typeof color]}
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

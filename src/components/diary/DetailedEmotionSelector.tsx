import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDetailedEmotions } from '@/api/hooks/useDiaries';
import { type Mood } from '@/models/types';
import { type IEmotion } from '@/models/interfaces';
import SelectorButton from './SelectorButton';

interface IEmotionWithParentOrder extends IEmotion {
  parentOrder?: number;
}

interface DetailedEmotionSelectorProps {
  mood: IEmotion;
  emotions: IEmotion[];
  state: IEmotion[];
  setState: React.Dispatch<React.SetStateAction<IEmotion[]>>;
}

const DetailedEmotionSelector = ({
  mood,
  emotions,
  state,
  setState,
}: DetailedEmotionSelectorProps) => {
  const { data: detailedEmotions, isLoading } = useDetailedEmotions();
  if (isLoading || !detailedEmotions) return null;

  const detailedEmotionGroupList = detailedEmotions.reduce(
    (acc, emotion) => {
      if (!acc[emotion.parentId]) {
        acc[emotion.parentId] = [];
      }
      acc[emotion.parentId].push(emotion);
      return acc;
    },
    {} as Record<string, IEmotionWithParentOrder[]>,
  );

  useEffect(() => {
    setState([]); // emotions가 바뀔 때 선택된 감정 초기화
  }, [emotions]);

  const setEmotion = (emotion: IEmotion) => {
    if (state.some((e) => e.id === emotion.id)) {
      setState(state.filter((e) => e.id !== emotion.id));
    } else if (state.length < 3) {
      const { parentOrder, ...emotionWithoutParentOrder } =
        emotion as IEmotionWithParentOrder;
      setState([...state, emotionWithoutParentOrder]);
    }
  };

  // emotions의 순서에 따라 combinedEmotionList를 정렬
  const combinedEmotionList: IEmotionWithParentOrder[] = emotions.flatMap(
    (emotion) => {
      const detailedList = detailedEmotionGroupList[emotion.id] || [];
      return detailedList.map((detailEmotion) => ({
        ...detailEmotion,
        parentOrder: emotions.findIndex((e) => e.id === emotion.id),
      }));
    },
  );
  combinedEmotionList.sort(
    (a, b) => (a.parentOrder ?? 0) - (b.parentOrder ?? 0),
  );

  return (
    <View style={styles.container}>
      {combinedEmotionList.map((emotion) => (
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

export default DetailedEmotionSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});

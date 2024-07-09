import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { type IEmotion, type ITopic } from '@/models/interfaces';
import { useTopics } from '@/api/hooks/useDiaries';
import TopicButton from './TopicButton';

interface TopicSelectorProps {
  mood: IEmotion;
  state: ITopic[];
  setState: React.Dispatch<React.SetStateAction<ITopic[]>>;
}

const TopicSelector = ({ mood, state, setState }: TopicSelectorProps) => {
  const { data: topics } = useTopics();

  useEffect(() => {
    setState([]); // mood가 바뀔 때 선택된 주제 초기화
  }, [mood, setState]);

  const setTopic = (topic: ITopic) => {
    if (state.some((t) => t.id === topic.id)) {
      setState(state.filter((t) => t.id !== topic.id));
    } else if (state.length < 2) {
      setState([...state, topic]);
    }
  };

  return (
    <View style={styles.container}>
      {topics.map((topic) => (
        <TopicButton
          key={topic.id}
          label={topic.label}
          emoji={topic.emoji}
          onPress={() => setTopic(topic)}
          isSelected={state.includes(topic)}
        />
      ))}
    </View>
  );
};

export default TopicSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});

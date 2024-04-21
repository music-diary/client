import { StyleSheet, Text, View } from 'react-native';
import TopicButton from './TopicButton';

const topicList = [
  { id: '1', emoji: '👨‍👩‍👦‍👦', name: '가족' },
  { id: '2', emoji: '💗', name: '연애' },
  { id: '3', emoji: '💔', name: '이별' },
  { id: '4', emoji: '🙌', name: '자존감' },
  { id: '5', emoji: '🤝', name: '인간관계' },
  { id: '6', emoji: '🎓', name: '공부' },
  { id: '7', emoji: '💰', name: '돈' },
  { id: '8', emoji: '🏫', name: '학교' },
  { id: '9', emoji: '💼', name: '일' },
  { id: '10', emoji: '💪', name: '건강' },
  { id: '11', emoji: '❌', name: '이유없음' },
];

interface TopicSelectorProps {
  state: string[];
  setState: React.Dispatch<React.SetStateAction<string[]>>;
}

const TopicSelector = ({ state, setState }: TopicSelectorProps) => {
  const setTopic = (emotion: string) => {
    if (state.includes(emotion)) {
      setState(state.filter((e) => e !== emotion));
    } else if (state.length < 2) {
      setState([...state, emotion]);
    }
  };

  return (
    <View style={styles.container}>
      {topicList.map((topic) => (
        <TopicButton
          key={topic.id}
          type={topic.name}
          emoji={topic.emoji}
          onPress={() => setTopic(topic.name)}
          isSelected={state.includes(topic.name)}
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

import { StyleSheet, View } from 'react-native';
import Colors from '@/constants/Colors';
import SelectorButton from './SelectorButton';

const moodList = [
  { label: '좋았어요!', value: 'happy' },
  { label: '그저그래요', value: 'soso' },
  { label: '별로였어요', value: 'bad' },
];

interface MoodSelectorProps {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const MoodSelector = ({ state, setState }: MoodSelectorProps) => {
  const color = {
    happy: { backgroundColor: Colors.green },
    soso: { backgroundColor: Colors.purple },
    bad: { backgroundColor: Colors.blue },
  };

  return (
    <View style={styles.container}>
      {moodList.map((mood) => (
        <SelectorButton
          key={mood.label}
          type={mood.label}
          onPress={() => setState(mood.value)}
          isSelected={state === mood.value}
          color={color[mood.value as keyof typeof color]}
        />
      ))}
    </View>
  );
};

export default MoodSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
});

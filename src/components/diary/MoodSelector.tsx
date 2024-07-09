import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useMoods } from '@/api/hooks/useDiaries';
import { COLORS } from '@/constants';
import { type IEmotion } from '@/models/interfaces';
import { type Mood } from '@/models/types';
import { colorWithOpacity } from '@/utils/color-utils';
import { emotionColor, moodIcons } from '@/constants/data';

interface MoodSelectorProps {
  state: IEmotion;
  setState: React.Dispatch<React.SetStateAction<IEmotion>>;
}

const MoodSelector = ({ state, setState }: MoodSelectorProps) => {
  const { data: moods, isLoading } = useMoods();
  if (isLoading || !moods) return null;

  const handlePress = (mood: IEmotion) => {
    if (state === mood) {
      setState({} as IEmotion);
    } else {
      setState(mood);
    }
  };

  return (
    <View style={styles.container}>
      {moods.map((mood) => {
        const SvgIcon = moodIcons[mood.name as Mood];
        const isActive = state === mood;
        const fillColor = isActive
          ? emotionColor[mood.name as Mood]
          : colorWithOpacity(COLORS.WHITE, 0.3);
        const color = isActive
          ? COLORS.WHITE
          : colorWithOpacity(COLORS.WHITE, 0.3);
        const borderColor = isActive ? COLORS.WHITE : COLORS.GREY2;

        return (
          <TouchableOpacity
            onPress={() => handlePress(mood)}
            key={mood.label}
            style={[styles.button, { borderColor }]}
          >
            <SvgIcon fill={fillColor} />
            <Text style={[styles.label, { color }]}>{mood.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MoodSelector;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    color: COLORS.WHITE,
  },
});

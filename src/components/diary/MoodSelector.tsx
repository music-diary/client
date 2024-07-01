import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '@/constants';
import { colorWithOpacity } from '@/utils/color-utils';
import { BadSvg, HappySvg, SosoSvg } from 'assets/images/common';
import { type Mood } from '@/models/types';

const moodList = [
  { label: '좋았어요!', value: 'happy' },
  { label: '그저그래요', value: 'soso' },
  { label: '별로였어요', value: 'bad' },
];

const moodIcons = {
  happy: HappySvg,
  soso: SosoSvg,
  bad: BadSvg,
};

interface MoodSelectorProps {
  state: Mood | null;
  setState: React.Dispatch<React.SetStateAction<Mood | null>>;
}

const MoodSelector = ({ state, setState }: MoodSelectorProps) => {
  const handlePress = (value: Mood) => {
    if (state === value) {
      setState(null); // 이미 선택된 무드를 다시 누르면 해제
    } else {
      setState(value); // 선택된 무드를 state에 설정
    }
  };

  const moodColor = {
    happy: COLORS.GREEN,
    soso: COLORS.PURPLE,
    bad: COLORS.BLUE,
  };

  return (
    <View style={styles.container}>
      {moodList.map((mood) => {
        const SvgIcon = moodIcons[mood.value as Mood];
        const isActive = state === mood.value;
        const fillColor = isActive
          ? moodColor[mood.value as Mood]
          : colorWithOpacity(COLORS.WHITE, 0.3);
        const color = isActive
          ? COLORS.WHITE
          : colorWithOpacity(COLORS.WHITE, 0.3);
        const borderColor = isActive ? COLORS.WHITE : COLORS.GREY2;

        return (
          <TouchableOpacity
            onPress={() => handlePress(mood.value as Mood)}
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

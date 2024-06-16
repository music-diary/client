import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/Colors';
import { type MoodType } from '@/interfaces';
import { colorWithOpacity } from '@/utils/colorUtils';
import HappySvg from 'assets/images/happy.svg';
import SosoSvg from 'assets/images/soso.svg';
import BadSvg from 'assets/images/bad.svg';

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
  state: MoodType;
  setState: React.Dispatch<React.SetStateAction<MoodType>>;
}

const MoodSelector = ({ state, setState }: MoodSelectorProps) => {
  const handlePress = (value: MoodType) => {
    setState(value); // 선택된 mood를 state에 설정
  };

  const moodColor = {
    happy: Colors.green,
    soso: Colors.purple,
    bad: Colors.blue,
  };

  return (
    <View style={styles.container}>
      {moodList.map((mood) => {
        const SvgIcon = moodIcons[mood.value as MoodType];
        const isActive = state === mood.value;
        const fillColor = isActive
          ? moodColor[mood.value as MoodType]
          : colorWithOpacity(Colors.white, 0.3);
        const color = isActive
          ? Colors.white
          : colorWithOpacity(Colors.white, 0.3);
        const borderColor = isActive ? Colors.white : Colors.grey2;

        return (
          <TouchableOpacity
            onPress={() => handlePress(mood.value as MoodType)}
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
    color: Colors.white,
  },
});

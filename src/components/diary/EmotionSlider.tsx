import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';
import { COLORS } from '@/constants';

interface TopicSelectorProps {
  setState: React.Dispatch<React.SetStateAction<number>>;
}

const EmotionSlider = ({ setState }: TopicSelectorProps) => {
  const progress = useSharedValue(3);
  const min = useSharedValue(0);
  const max = useSharedValue(10);
  return (
    <Slider
      onValueChange={(value) => {
        setState(value);
      }}
      theme={{
        maximumTrackTintColor: COLORS.CONTENTS_LIGHT,
        minimumTrackTintColor: COLORS.PURPLE,
        cacheTrackTintColor: COLORS.PURPLE,
        bubbleBackgroundColor: COLORS.PURPLE,
      }}
      progress={progress}
      minimumValue={min}
      maximumValue={max}
      step={10}
      markWidth={0}
    />
  );
};

export default EmotionSlider;

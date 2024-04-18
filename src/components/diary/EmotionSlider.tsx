import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';
import Colors from '@/constants/Colors';

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
        maximumTrackTintColor: Colors.contents_light,
        minimumTrackTintColor: Colors.purple,
        cacheTrackTintColor: Colors.purple,
        bubbleBackgroundColor: Colors.purple,
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

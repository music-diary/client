import { type ImageSourcePropType } from 'react-native';

export interface CircleComponentProps {
  order: number;
  color: string;
  imageSource: ImageSourcePropType;
  diameter: number;
}

export interface ITopic {
  id: number;
  emoji: string;
  name: string;
}

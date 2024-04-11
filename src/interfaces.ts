import { type ImageSourcePropType } from 'react-native';

export interface CircleComponentProps {
  order: number;
  color: string;
  imageSource: ImageSourcePropType;
  diameter: number;
}

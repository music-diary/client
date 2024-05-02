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

// 템플릿 관련 스키마 임시로 타입 지정, 추후 수정 필요

export interface Templates {
  id: string; // ObjectId || uuid (PK)
  name: string;
  description: string;
  type: TemplateType;
  title: string;
  content: TemplateContent;
  createdAt: Date;
  updatedAt: Date;
  musicId: string; // FK
}

export type TemplateType = 'SCS' | 'KPT' | 'MSG' | '4L' | '5F';

export interface TemplateContent {
  contentProperies: Scs | Kpt | FiveF | FourL;
}

export interface Scs {
  stop: string;
  continue: string;
  start: string;
}

export interface Kpt {
  keep: string;
  problem: string;
  try: string;
}

export interface Mad {
  mad: string;
  sad: string;
  glad: string;
}

export interface FiveF {
  fact: string;
  feeling: string;
  finding: string;
  futureAction: string;
  feedback: string;
}

export interface FourL {
  loved: string;
  learned: string;
  lacked: string;
  longedFor: string;
}

export type MoodType = 'happy' | 'soso' | 'bad';
export type TemplateType = 'SCS' | 'KPT' | 'MSG' | '4L' | '5F';
export type VerifyStatusType = 'sent' | 'incorrect' | 'resent';

export interface CircleComponentProps {
  order?: number;
  color: string;
  imageSource: string;
  diameter: number;
}
export interface ITopic {
  id: string;
  emoji: string;
  name: string;
}
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
export interface TemplateContent {
  contentProperties: Scs | Kpt | FiveF | FourL;
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

export interface IStatisticEmotion {
  rootId: string;
  rootIdName: string;
  count: number;
  topEmotions: string[];
}

export interface IStatisticTopic {
  id: string;
  userId: string;
  diaryId: string;
  topicId: string;
  musicId: string | null;
  createdAt: string;
  updatedAt: string;
  topic: {
    id: string;
    label: string;
    emoji: string;
    _count: {
      diaries: number;
    };
  };
}

export interface IDiaryYear {
  year: string;
  count: number;
  months: Array<{ month: string; count: number }>;
}

import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '@/constants';
import { BookOpenSvg } from 'assets/images/mypage';
import { colorWithOpacity } from '@/utils/color-utils';

const containerWidth = Dimensions.get('window').width / 2 - 24;

interface DiaryTopicProps {
  topics: Array<{
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
  }>;
}

const DiaryTopic = ({ topics }: DiaryTopicProps) => {
  // 가장 빈도 높은 순으로 sort
  const sortedTopics = topics.sort(
    (a, b) => b.topic._count.diaries - a.topic._count.diaries,
  );

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <BookOpenSvg />
        <Text style={styles.buttonText}>일기 주제</Text>
      </View>
      <Text style={styles.bodyText}>
        <Text style={styles.highlight}>
          {sortedTopics[0].topic.label}, {sortedTopics[1].topic.label},{' '}
          {sortedTopics[2].topic.label}
        </Text>
        에 대해 많이 기록했어요.
      </Text>

      {sortedTopics.map((topic) => (
        <View key={topic.topic.id} style={styles.contentContainer}>
          <Text>{topic.topic.emoji}</Text>
          <Text style={styles.b2sbText}>{topic.topic.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default DiaryTopic;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.GREY3,
    height: 250,
    width: containerWidth,
    borderRadius: 12,
    paddingTop: 20,
    paddingHorizontal: 10,
    gap: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colorWithOpacity(COLORS.WHITE, 0.1),
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  buttonText: {
    color: COLORS.PURPLE_BOX,
    ...FONTS.BTN,
  },
  bodyText: {
    paddingVertical: 6,
    color: colorWithOpacity(COLORS.WHITE, 0.5),
    ...FONTS.B2,
    textAlign: 'center',
  },
  highlight: {
    color: 'white',
  },
  contentContainer: {
    width: '100%',
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colorWithOpacity(COLORS.WHITE, 0.2),
    borderWidth: 1.5,
    borderColor: colorWithOpacity(COLORS.WHITE, 0.1),
    borderRadius: 22,
  },
  b2sbText: {
    color: COLORS.WHITE,
    ...FONTS.B2_SB,
  },
});

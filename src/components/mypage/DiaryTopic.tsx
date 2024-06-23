import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import BookOpenIcon from 'assets/images/mypageIcon/BookOpen.svg';
import Fonts from '@/constants/Fonts';
import { type ITopic } from '@/interfaces';
import { colorWithOpacity } from '@/utils/colorUtils';

const containerWidth = Dimensions.get('window').width / 2 - 24;

const topicList: ITopic[] = [
  { id: '1', emoji: '👨‍👩‍👦‍👦', name: '가족' },
  { id: '2', emoji: '💗', name: '연애' },
  { id: '3', emoji: '💔', name: '이별' },
  { id: '4', emoji: '🙌', name: '자존감' },
  { id: '5', emoji: '🤝', name: '인간관계' },
  { id: '6', emoji: '🎓', name: '공부' },
  { id: '7', emoji: '💰', name: '돈' },
  { id: '8', emoji: '🏫', name: '학교' },
  { id: '9', emoji: '💼', name: '일' },
  { id: '10', emoji: '💪', name: '건강' },
  { id: '11', emoji: '❌', name: '이유없음' },
];
//  const DiaryTopicData = {
//    Topic: ['가족', '연애', '이별'],
//  };

interface DiaryTopicProps {
  Topic: string[];
}

const DiaryTopic = ({ Topic }: DiaryTopicProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <BookOpenIcon />
        <Text style={styles.buttonText}>일기 주제</Text>
      </View>
      <Text style={styles.bodyText}>
        <Text style={styles.highlight}>
          {Topic[0]}, {Topic[1]}, {Topic[2]}
        </Text>
        에 대해 많이 기록했어요.
      </Text>

      {Topic.map((topic) => {
        const topicData = topicList.find((t) => t.name === topic);
        if (topicData) {
          return (
            <View key={topicData.id} style={styles.contentContainer}>
              <Text>{topicData.emoji}</Text>
              <Text style={styles.b2sbText}>{topicData.name}</Text>
            </View>
          );
        }
        return null;
      })}
    </View>
  );
};

export default DiaryTopic;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey3,
    height: 250,
    width: containerWidth,
    borderRadius: 12,
    paddingTop: 20,
    paddingHorizontal: 10,
    gap: 10,
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  buttonText: {
    color: Colors.purple_box,
    ...Fonts.btn,
  },
  bodyText: {
    paddingVertical: 6,
    color: colorWithOpacity(Colors.white, 0.5),
    ...Fonts.b2,
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
    backgroundColor: colorWithOpacity(Colors.white, 0.2),
    borderWidth: 1.5,
    borderColor: colorWithOpacity(Colors.white, 0.1),
    borderRadius: 22,
  },
  b2sbText: {
    color: Colors.white,
    ...Fonts.b2_sb,
  },
});

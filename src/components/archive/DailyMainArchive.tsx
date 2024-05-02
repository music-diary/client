import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import CircleAlbum from '@/components/common/CircleAlbum';

interface DiaryDataProps {
  id: string;
  date: string;
  albumCoverUrl: string;
  songTitle: string;
  artist: string;
  diaryTitle: string;
  emotions: string[];
}

const DailyMainArchive = ({
  id,
  date,
  albumCoverUrl,
  songTitle,
  artist,
  diaryTitle,
  emotions,
}: DiaryDataProps) => {
  return (
    <Link href={`/(main)/archive/day/${date}`} asChild key={id}>
      <TouchableOpacity key={id}>
        <Text style={styles.b2lighttext}>{date}</Text>
        <View style={styles.cardContainer}>
          <CircleAlbum
            color={'rgba(42,237,21, 0.3)'}
            imageSource={albumCoverUrl}
            diameter={195}
          />
          <View style={styles.middleContainer}>
            <View style={styles.sing}>
              <Text style={styles.light10Text}>{artist}</Text>
              <Text style={styles.sb12Text}>{songTitle}</Text>
            </View>
            <Text style={styles.sb12Text}>{diaryTitle}</Text>
          </View>
          <View style={styles.emotionContainer}>
            {emotions.map((emotion, index) => (
              <View key={index} style={styles.emotionCircle}>
                <Text style={styles.white10Text}>{emotion}</Text>
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
export default DailyMainArchive;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.box,
    width: 280,
    height: 335,
    marginTop: 8,
    paddingTop: 25,
    borderRadius: 8,
  },
  b2lighttext: {
    color: Colors.contents_light,
    ...Fonts.b2,
  },
  middleContainer: {
    paddingTop: 18,
    alignItems: 'center',
    gap: 8,
  },
  sing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  light10Text: {
    fontFamily: 'pret',
    color: Colors.contents_light,
    fontSize: 10,
  },
  white10Text: {
    color: Colors.white,
    fontSize: 10,
  },
  sb12Text: {
    fontFamily: 'pret-sb',
    color: Colors.white,
    fontSize: 12,
  },
  emotionContainer: {
    paddingTop: 16,
    flexDirection: 'row',
    gap: 8,
  },
  emotionCircle: {
    backgroundColor: 'rgba(0,128,255, 0.3)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 30,
  },
});

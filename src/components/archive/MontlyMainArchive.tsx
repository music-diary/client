import { BlurView } from 'expo-blur';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import HappyIcon from 'assets/images/happy.svg';
import SosoIcon from 'assets/images/soso.svg';
import BadIcon from 'assets/images/bad.svg';
import Fonts from '@/constants/Fonts';
import { colorWithOpacity } from '@/utils/colorUtils';
import { trimTitle } from '@/utils/textUtils';

const contentWidth = Dimensions.get('window').width / 2 - 22;

interface DiaryEntryProps {
  id: string;
  month: string;
  mood: string;
  albumCoverUrl: string;
  songTitle: string;
  artist: string;
  diaryEntries: number;
}

const getBackgroundColor = (mood: string) => {
  switch (mood) {
    case 'Neutral':
      return Colors.blue;
    case 'Positive':
      return Colors.purple;
    case 'Negative':
      return Colors.green;

    default:
      return '#f5f5f5';
  }
};

// 긍정, 부정, 중립에 따라 분류
const EmotionImage = ({ mood }: { mood: string }) => {
  switch (mood) {
    case 'Positive':
      return (
        <View style={styles.emotion}>
          <HappyIcon width={120} height={120} fill={Colors.green} />
        </View>
      );
    case 'Negative':
      return (
        <View style={styles.emotion}>
          <BadIcon width={125} height={125} fill={Colors.blue} />
        </View>
      );
    case 'Neutral':
      return (
        <View style={styles.emotion}>
          <SosoIcon width={125} height={125} fill={Colors.purple} />
        </View>
      );
    default:
      return null;
  }
};

const MontlyMainArchive = ({
  id,
  month,
  mood,
  albumCoverUrl,
  songTitle,
  artist,
  diaryEntries,
}: DiaryEntryProps) => {
  const backgroundColor = getBackgroundColor(mood);
  const emotionImage = EmotionImage({ mood });

  return (
    <View style={styles.fullContainer}>
      <Link
        href={`/(main)/archive/month/${month}`}
        asChild
        style={[styles.container, { backgroundColor }]}
        key={id}
      >
        <TouchableOpacity>
          <View style={styles.emotionContainer}>{emotionImage}</View>
          <BlurView tint="light" intensity={10} style={styles.absoluteFill} />
          <View style={styles.bodyBottom}>
            <Image
              source={{ uri: albumCoverUrl }}
              style={styles.albumCover}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <Text style={styles.songTitle}>
                {trimTitle(songTitle, 4)} 외 {diaryEntries}곡
              </Text>
              <Text style={styles.artist}>{trimTitle(artist, 8)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
      <Text style={styles.month}>{month}</Text>
    </View>
  );
};

export default MontlyMainArchive;

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    gap: 6,
  },
  container: {
    width: contentWidth,
    height: 165,
    padding: 10,
    borderRadius: 9,
  },
  month: {
    color: Colors.white,
    ...Fonts.b1_sb,
  },
  emotionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emotion: {
    position: 'absolute',
    top: 10,
    zIndex: -1,
  },
  bodyBottom: {
    height: 67,
    width: contentWidth,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colorWithOpacity(Colors.white, 0.2),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  absoluteFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 67,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    overflow: 'hidden',
  },

  albumCover: {
    width: 47,
    height: 47,
    borderRadius: 30,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  textContainer: {
    width: 90,
  },
  songTitle: {
    color: Colors.black,
    ...Fonts.btn,
  },
  artist: {
    paddingTop: 2,
    color: Colors.black,
    ...Fonts.lb,
  },
});

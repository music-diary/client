import { BlurView } from 'expo-blur';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import HappyIcon from 'assets/images/happy.svg';
import SosoIcon from 'assets/images/soso.svg';
import BadIcon from 'assets/images/bad.svg';

interface DiaryEntryProps {
  id: string;
  month: string;
  mood: string;
  albumCoverUrl: string;
  songTitle: string;
  artist: string;
  diaryEntries: number;
}

// 배경식이 월별로 다르다고 가정했을 때, 월별 배경색을 반환 (감정에 따라 다르다면 이 부분 수정)
const getBackgroundColor = (mood: string) => {
  // 문자열에서 월 추출

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
        <View style={styles.emotionHappy}>
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
    <Link
      href={`/(main)/archive/month/${month}`}
      asChild
      style={[styles.container, { backgroundColor }]}
      key={id}
    >
      <TouchableOpacity>
        <Text style={styles.month}>{month}</Text>
        {emotionImage}
        <BlurView tint="light" intensity={10} style={styles.absoluteFill} />
        <View style={styles.bodyBottom}>
          <Image
            source={{ uri: albumCoverUrl }}
            style={styles.albumCover}
            resizeMode="cover"
          />
          <View style={styles.textContainer}>
            <Text style={styles.songTitle}>
              {songTitle} 외 {diaryEntries}개
            </Text>
            <Text style={styles.artist}>{artist}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MontlyMainArchive;

const styles = StyleSheet.create({
  container: {
    width: 165,
    height: 165,
    padding: 10,
    borderRadius: 9,
  },
  month: {
    fontFamily: 'pret-b',
    fontSize: 14,
    color: Colors.black,
  },
  emotion: {
    position: 'absolute',
    top: 25,
    left: 20,
    zIndex: -1,
  },
  emotionHappy: {
    position: 'absolute',
    top: 28,
    left: 20,
    zIndex: -1,
  },
  bodyBottom: {
    height: 67,
    width: 165,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    // 맨 밑에 고정
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
    fontSize: 10,
    fontFamily: 'pret-b',
    color: Colors.black,
  },
  artist: {
    fontSize: 10,
    fontFamily: 'pret',
    color: Colors.black,
  },
});

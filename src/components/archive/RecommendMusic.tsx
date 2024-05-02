import { View, Text, StyleSheet } from 'react-native';
import CircleAlbum from '@/components/common/CircleAlbum';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

interface RecommendData {
  id: string;
  albumCoverUrl: string;
  songTitle: string;
  artist: string;
  emotion: string;
}

const getColorByEmotion = (emotion: string): string => {
  switch (emotion) {
    case '긍정':
      return 'rgba(42, 237, 21, 0.3)'; // 녹색
    case '부정':
      return 'rgba(255, 59, 157, 0.3)'; // 빨간색
    case '보통':
      return 'rgba(0, 128, 255, 0.3)'; // 파란색
    default:
      return 'rgba(128, 128, 128, 0.3)'; // 기본 회색
  }
};

const RecommendMusic = ({
  albumCoverUrl,
  songTitle,
  artist,
  emotion,
}: RecommendData) => {
  const color = getColorByEmotion(emotion);

  return (
    <View style={styles.container}>
      <CircleAlbum color={color} imageSource={albumCoverUrl} diameter={68} />
      <View style={styles.divider} />
      <Text style={styles.btnText}>{songTitle}</Text>
      <Text style={styles.btnText}>{artist}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 17,
  },
  divider: {
    marginTop: 12,
  },
  btnText: {
    color: Colors.white,
    ...Fonts.btn,
  },
});

export default RecommendMusic;

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
import { BadSvg, HappySvg, SosoSvg } from 'assets/images/common';
import { COLORS, FONTS } from '@/constants';
import { colorWithOpacity } from '@/utils/color-utils';
import { trimTitle } from '@/utils/text-utils';
import { formatDateString } from '@/utils/date-utils';
import { type IMusicSummaryEntry } from '@/models/interfaces';
import { emotionBackgroundColor } from '@/constants/data/emotion-colors';

const contentWidth = Dimensions.get('window').width / 2 - 22;

const EmotionImage = ({ mood }: { mood: string }) => {
  switch (mood) {
    case 'good':
      return (
        <View style={styles.emotion}>
          <HappySvg width={120} height={120} fill={COLORS.GREEN} />
        </View>
      );
    case 'bad':
      return (
        <View style={styles.emotion}>
          <BadSvg width={125} height={125} fill={COLORS.BLUE} />
        </View>
      );
    case 'normal':
      return (
        <View style={styles.emotion}>
          <SosoSvg width={125} height={125} fill={COLORS.PURPLE} />
        </View>
      );
    default:
      return null;
  }
};

// 메인 아카이브 컴포넌트
const MonthlyMainArchive = ({
  id,
  month,
  mood,
  albumCoverUrl,
  songTitle,
  artist,
  diaryEntries,
}: IMusicSummaryEntry) => {
  const backgroundColor = emotionBackgroundColor[mood];
  const emotionImage = EmotionImage({ mood });

  const stringMonth = formatDateString(month);

  return (
    <View style={styles.fullContainer}>
      <Link
        href={`/(main)/archive/month/${stringMonth}`}
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
      <Text style={styles.month}>{stringMonth}</Text>
    </View>
  );
};

export default MonthlyMainArchive;

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
    color: COLORS.WHITE,
    ...FONTS.B1_SB,
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
    backgroundColor: colorWithOpacity(COLORS.WHITE, 0.2),
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
    color: COLORS.BLACK,
    ...FONTS.BTN,
  },
  artist: {
    paddingTop: 2,
    color: COLORS.BLACK,
    ...FONTS.LB,
  },
});

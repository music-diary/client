import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import CircleAlbum from '@/components/common/CircleAlbum';
import ArrowsInSimpleIcon from 'assets/images/archiveIcon/ArrowsInSimple.svg';
import ArrowsOutSimpleIcon from 'assets/images/archiveIcon/ArrowsOutSimple.svg';
import { colorWithOpacity, getColorForMood } from '@/utils/colorUtils';

interface DiaryDataProps {
  albumCoverUrl: string;
  songTitle: string;
  artist: string;
  diaryTitle: string;
  emotions: string[];
  lyrics: string;
  diaryContent: string;
  feeling: string;
}

const DailyMainArchive = ({
  albumCoverUrl,
  songTitle,
  artist,
  diaryTitle,
  emotions,
  lyrics,
  diaryContent,
  feeling,
}: DiaryDataProps) => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.expandButton} onPress={handlePress}>
        {expanded ? <ArrowsInSimpleIcon /> : <ArrowsOutSimpleIcon />}
      </TouchableOpacity>
      <View style={styles.divider}>
        <CircleAlbum
          color={colorWithOpacity(getColorForMood(feeling), 0.3)}
          imageSource={albumCoverUrl}
          diameter={240}
        />
        <View style={styles.middleContainer}>
          <View style={styles.sing}>
            <Text style={styles.greyBtnText}>{artist}</Text>
            <Text style={styles.b2sbText}>{songTitle}</Text>
            <Text style={styles.lyricsText}>{lyrics}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.b2sbText}>{diaryTitle}</Text>
      {expanded && <Text style={styles.diaryContent}>{diaryContent}</Text>}
      <View style={styles.emotionContainer}>
        {emotions.map((emotion, index) => (
          <View
            key={index}
            style={[
              styles.emotionCircle,
              { backgroundColor: getColorForMood(feeling) },
            ]}
          >
            <Text style={styles.btnText}>{emotion}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default DailyMainArchive;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.box,
    marginTop: 1,
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 23,
    borderRadius: 10,
  },
  expandButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  middleContainer: {
    paddingTop: 18,
    alignItems: 'center',
    gap: 8,
  },
  divider: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 23,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey1,
  },
  sing: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  },
  greyBtnText: {
    color: Colors.grey1,
    ...Fonts.btn,
  },
  b2sbText: {
    color: Colors.white,
    ...Fonts.b2_sb,
  },
  btnText: {
    color: Colors.black,
    ...Fonts.btn,
  },
  lyricsText: {
    color: Colors.purple,
    ...Fonts.b2_line2_sb,
    paddingTop: 10,
    textAlign: 'center',
  },
  emotionContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    gap: 8,
  },
  emotionCircle: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 30,
  },
  diaryContent: {
    color: Colors.contents_light,
    paddingTop: 16,
    textAlign: 'justify',
    ...Fonts.b2_line2,
  },
});

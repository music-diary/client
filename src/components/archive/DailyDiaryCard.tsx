import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
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
  lyrics: string;
  diaryContent: string;
}

const DailyMainArchive = ({
  id,
  date,
  albumCoverUrl,
  songTitle,
  artist,
  diaryTitle,
  emotions,
  lyrics,
  diaryContent,
}: DiaryDataProps) => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.expandButton} onPress={handlePress}>
        {expanded ? (
          <AntDesign name="shrink" size={20} color={Colors.contents_light} />
        ) : (
          <AntDesign name="arrowsalt" size={20} color={Colors.contents_light} />
        )}
      </TouchableOpacity>
      <View style={styles.divider}>
        <CircleAlbum
          color={'rgba(42,237,21, 0.3)'}
          imageSource={albumCoverUrl}
          diameter={240}
        />
        <View style={styles.middleContainer}>
          <View style={styles.sing}>
            <Text style={styles.lightbtnText}>{artist}</Text>
            <Text style={styles.sb14Text}>{songTitle}</Text>
            {expanded && <Text style={styles.lyricsText}>{lyrics}</Text>}
          </View>
        </View>
      </View>
      <Text style={styles.sb14Text}>{diaryTitle}</Text>
      {expanded && <Text style={styles.diaryContent}>{diaryContent}</Text>}
      <View style={styles.emotionContainer}>
        {emotions.map((emotion, index) => (
          <View key={index} style={styles.emotionCircle}>
            <Text style={styles.white10Text}>{emotion}</Text>
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
    borderBottomColor: Colors.contents_light,
  },
  sing: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  },
  lightbtnText: {
    color: Colors.contents_light,
    ...Fonts.btn,
  },
  white10Text: {
    color: Colors.white,
    fontSize: 11,
  },
  sb14Text: {
    color: Colors.white,
    ...Fonts.b2_sb,
  },
  lyricsText: {
    color: Colors.purple,
    ...Fonts.b2,
    paddingTop: 4,
    textAlign: 'center',
  },
  emotionContainer: {
    paddingTop: 50,
    flexDirection: 'row',
    gap: 8,
  },
  emotionCircle: {
    backgroundColor: 'rgba(0,128,255, 0.3)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 30,
  },
  diaryContent: {
    color: Colors.contents_light,
    paddingTop: 10,
    marginBottom: -20,
    textAlign: 'justify',
    ...Fonts.b2,
  },
});

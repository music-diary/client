import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { COLORS, FONTS } from '@/constants';
import CircleAlbum from '@/components/common/CircleAlbum';
import { colorWithOpacity, getColorForMood } from '@/utils/color-utils';
import { trimTitle } from '@/utils/text-utils';

interface DiaryDataProps {
  id: string;
  date: string;
  albumCoverUrl: string;
  songTitle: string;
  artist: string;
  diaryTitle: string;
  emotions: string[];
  feeling: string;
}

const DailyMainArchive = ({
  id,
  date,
  albumCoverUrl,
  songTitle,
  artist,
  diaryTitle,
  emotions,
  feeling,
}: DiaryDataProps) => {
  return (
    <Link
      href={{
        pathname: `/(main)/archive/day/${date}`,
        params: { id },
      }}
      asChild
      key={id}
    >
      <TouchableOpacity key={id}>
        <Text style={styles.b2LightText}>{date}</Text>
        <View style={styles.cardContainer}>
          <CircleAlbum
            color={colorWithOpacity(getColorForMood(feeling), 0.3)}
            imageSource={albumCoverUrl}
            diameter={195}
          />
          <View style={styles.middleContainer}>
            <View style={styles.sing}>
              <Text style={styles.lightLbText}>{trimTitle(artist, 6)}</Text>
              <Text style={styles.btnText}>{trimTitle(songTitle, 6)}</Text>
            </View>
            <Text style={styles.btnText}>{diaryTitle}</Text>
          </View>
          <View style={styles.emotionContainer}>
            {emotions.map((emotion, index) => (
              <View
                key={index}
                style={[
                  styles.emotionCircle,
                  { backgroundColor: getColorForMood(feeling) },
                ]}
              >
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
    backgroundColor: COLORS.BOX,
    width: 280,
    height: 335,
    marginTop: 8,
    paddingTop: 25,
    borderRadius: 8,
  },
  b2LightText: {
    color: COLORS.GREY1,
    ...FONTS.B2,
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
  lightLbText: {
    color: COLORS.CONTENTS_LIGHT,
    ...FONTS.LB,
  },
  white10Text: {
    color: COLORS.BLACK,
    ...FONTS.LB,
  },
  btnText: {
    color: COLORS.WHITE,
    ...FONTS.BTN,
  },
  emotionContainer: {
    paddingTop: 16,
    flexDirection: 'row',
    gap: 8,
  },
  emotionCircle: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 30,
  },
});

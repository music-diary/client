import { View, Text, StyleSheet } from 'react-native';
import CircleAlbum from '@/components/common/CircleAlbum';
import { COLORS, FONTS } from '@/constants';
import { colorWithOpacity, getColorForMood } from '@/utils/color-utils';
import { trimTitle } from '@/utils/text-utils';

interface RecommendData {
  id: string;
  albumCoverUrl: string;
  songTitle: string;
  artist: string;
  feeling: string;
}

const RecommendMusic = ({
  albumCoverUrl,
  songTitle,
  artist,
  feeling,
}: RecommendData) => {
  const color = colorWithOpacity(getColorForMood(feeling), 0.3);

  return (
    <View style={styles.container}>
      <CircleAlbum color={color} imageSource={albumCoverUrl} diameter={68} />
      <View style={styles.divider} />
      <Text style={styles.btnGrayText}>{trimTitle(songTitle, 6)}</Text>
      <Text style={styles.btnText}>{trimTitle(artist, 6)}</Text>
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
  btnGrayText: {
    color: COLORS.GREY1,
    ...FONTS.BTN,
  },
  btnText: {
    color: COLORS.WHITE,
    ...FONTS.BTN,
  },
});

export default RecommendMusic;

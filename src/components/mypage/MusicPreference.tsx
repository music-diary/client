import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { MusicNotesSvg } from 'assets/images/mypage';
import { COLORS, FONTS } from '@/constants';
import { colorWithOpacity } from '@/utils/color-utils';
import PreferenceGraph from '@/components/mypage/PreferenceGraph';
import { trimTitle } from '@/utils/text-utils';
import { useGenres } from '@/api/hooks/useGenres';
import { getGenreLabel } from '@/utils/label-utils';
import LoadingIndicator from '@/components/common/LoadingIndicator';

const containerWidth = Dimensions.get('window').width / 2 - 24;

const containerYearlyWidth = Dimensions.get('window').width - 32;

interface MusicPreferenceProps {
  genreCounts: Array<{ genre: string; count: number }>;
  isYearly?: boolean;
}

const MusicPreference = ({
  genreCounts = [],
  isYearly,
}: MusicPreferenceProps) => {
  const { data: genres } = useGenres();

  const generateGraphData = () => {
    return genreCounts.map((item) => {
      const genre = genres.find((g) => g.name === item.genre);
      return {
        label: genre?.label ?? item.genre,
        count: item.count,
        color: genre?.color ?? COLORS.BLACK,
      };
    });
  };

  const graphData = generateGraphData(); // 변환된 데이터
  const graphTotal = graphData.reduce((acc, item) => acc + item.count, 0); // count 총합

  const componentWidth = isYearly ? containerYearlyWidth : containerWidth;

  // 에러 케이스 + 로딩케이스
  if (!genres || genreCounts.length === 0) {
    return (
      <View style={[styles.container, { width: componentWidth }]}>
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <View style={[styles.container, { width: componentWidth }]}>
      <View style={styles.title}>
        <MusicNotesSvg />
        <Text style={styles.buttonText}>내 음악취향</Text>
      </View>
      <View>
        <Text
          style={[styles.bodyText, styles.highlight]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {genreCounts
            .slice(0, 3)
            .map((item) => getGenreLabel(item.genre, genres))
            .join(', ')}
        </Text>
        <Text style={styles.bodyText}>장르를 많이 추천받았어요</Text>
      </View>

      <PreferenceGraph data={graphData} total={graphTotal} />
      <View style={styles.genreContainer}>
        {graphData.map((genre, index) => (
          <View key={index} style={styles.genreItem}>
            <View style={[styles.icon, { backgroundColor: genre.color }]} />
            <Text style={styles.genreText}>
              {trimTitle(genre.label ?? '', 3)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default MusicPreference;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.GREY3,
    height: 250,
    borderRadius: 12,
    paddingTop: 20,
    paddingHorizontal: 10,
    gap: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colorWithOpacity(COLORS.WHITE, 0.1),
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  buttonText: {
    color: COLORS.PURPLE_BOX,
    ...FONTS.BTN,
  },
  bodyText: {
    color: colorWithOpacity(COLORS.WHITE, 0.5),
    ...FONTS.B2,
    textAlign: 'center',
  },
  highlight: {
    color: 'white',
  },
  genreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 10,
  },
  genreItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  genreText: {
    color: colorWithOpacity(COLORS.WHITE, 0.5),
    ...FONTS.BTN,
  },
});

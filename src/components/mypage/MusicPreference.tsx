import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import { MusicNotesSvg } from 'assets/images/mypage';
import Fonts from '@/constants/Fonts';
import { colorWithOpacity } from '@/utils/color-utils';
import PreferenceGraph from '@/components/mypage/PreferenceGraph';
import { genres } from '@/constants/data';

const containerWidth = Dimensions.get('window').width / 2 - 24;
const containerYearlyWidth = Dimensions.get('window').width - 32;

interface MusicPreferenceProps {
  musicCount: Array<{ music: string; count: number }>;
  isYearly?: boolean;
}

const getGenreLabel = (music: string) => {
  const genre = genres.find((genre) => genre.name === music);
  return genre ? genre.label : music;
};

const MusicPreference = ({ musicCount, isYearly }: MusicPreferenceProps) => {
  const generateGraphData = () => {
    return musicCount.map((item) => {
      const genre = genres.find((genre) => genre.name === item.music);
      return {
        label: genre ? genre.label : item.music,
        count: item.count,
        color: genre ? genre.color : Colors.black,
      };
    });
  };

  const graphData = generateGraphData(); // 변환된 데이터
  const graphTotal = graphData.reduce((acc, item) => acc + item.count, 0); // count 총합

  const componentWidth = isYearly ? containerYearlyWidth : containerWidth;

  return (
    <View style={[styles.container, { width: componentWidth }]}>
      <View style={styles.title}>
        <MusicNotesSvg />
        <Text style={styles.buttonText}>내 음악취향</Text>
      </View>
      <Text style={styles.bodyText}>
        <Text style={styles.highlight}>
          {getGenreLabel(musicCount[0].music)},{' '}
          {getGenreLabel(musicCount[1].music)},{' '}
          {getGenreLabel(musicCount[2].music)}
          {'\n'}
        </Text>
        장르를 많이 기록했어요.
      </Text>
      <PreferenceGraph data={graphData} total={graphTotal} />
      <View style={styles.genreContainer}>
        {graphData.map((genre, index) => (
          <View key={index} style={styles.genreItem}>
            <View style={[styles.icon, { backgroundColor: genre.color }]} />
            <Text style={styles.genreText}>{genre.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default MusicPreference;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey3,
    height: 250,
    borderRadius: 12,
    paddingTop: 20,
    paddingHorizontal: 10,
    gap: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colorWithOpacity(Colors.white, 0.1),
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  buttonText: {
    color: Colors.purple_box,
    ...Fonts.btn,
  },
  bodyText: {
    marginTop: 4,
    color: colorWithOpacity(Colors.white, 0.5),
    ...Fonts.b2,
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
    color: colorWithOpacity(Colors.white, 0.5),
    ...Fonts.btn,
  },
});

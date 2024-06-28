import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import ConfettiIcon from 'assets/images/mypageIcon/Confetti.svg';
import Fonts from '@/constants/Fonts';
import { colorWithOpacity } from '@/utils/color-utils';
import LineGraph from '@/components/mypage/LineGraph';
import { type DiaryYearNumberData } from '@/models/interfaces';

const containerWidth = Dimensions.get('window').width - 32;

const DiaryYearlyGraph = ({ average, monthlydata }: DiaryYearNumberData) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <ConfettiIcon />
        <Text style={styles.titleText}>작성한 음악일기</Text>
      </View>
      <Text style={styles.bodyText}>
        올해 정말 <Text style={styles.highlight}>꾸준하게</Text> 음악일기를
        찾아주셨네요!
      </Text>
      <View style={styles.boxContainer}>
        <Text style={styles.boxText}>
          월 평균 <Text style={styles.boxHighlight}>{average}회</Text> 작성
        </Text>
      </View>
      <LineGraph data={monthlydata} />
    </View>
  );
};

export default DiaryYearlyGraph;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey3,
    height: 330,
    width: containerWidth,
    borderRadius: 12,
    paddingTop: 20,
    paddingHorizontal: 10,
    gap: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colorWithOpacity(Colors.white, 0.1),
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  titleText: {
    color: Colors.purple_box,
    ...Fonts.btn,
  },
  bodyText: {
    color: colorWithOpacity(Colors.white, 0.5),
    ...Fonts.b2,
    textAlign: 'center',
  },
  highlight: {
    color: 'white',
  },
  boxContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  boxText: {
    color: Colors.black,
    ...Fonts.b2_sb,
  },
  boxHighlight: {
    color: Colors.purple,
  },
});

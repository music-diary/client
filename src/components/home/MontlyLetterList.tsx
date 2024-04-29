import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import CircleAlbum from '@/components/common/CircleAlbum';
const MontlyLetterList = () => {
  const colors = [
    'rgba(42,237,21, 0.3)',
    'rgba(255,59,257, 0.3)',
    'rgba(0,128,255, 0.3)',
    'rgba(255,165,0, 0.3)',
  ];

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.body}>
          {Array.from({ length: 10 }).map(
            (
              _,
              index, // 10개 dummy 생성
            ) => (
              <View style={styles.card} key={index}>
                <CircleAlbum
                  key={index}
                  order={10 - index}
                  color={colors[index % colors.length]}
                  imageSource={require('assets/images/dummy_albumcircle.png')}
                  diameter={68}
                />
                <Text style={styles.cardText}>From. 세비</Text>
              </View>
            ),
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default MontlyLetterList;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  body: {
    flexDirection: 'row',
    marginRight: 4, // 스크롤 후 margin 16 유지 (12 + 4)
  },
  card: {
    height: 120,
    width: 100,
    backgroundColor: Colors.bg_light,
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 12,
    marginRight: 12,
  },
  cardText: {
    marginTop: 13,
    color: Colors.white,
    ...Fonts.lb,
  },
});

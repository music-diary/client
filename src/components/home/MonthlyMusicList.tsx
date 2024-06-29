import { ScrollView, StyleSheet, View } from 'react-native';
import Colors from '@/constants/Colors';
import { HappySvg } from 'assets/images/common';
import CircleAlbum from '../common/CircleAlbum';

const MonthlyMusicList = () => {
  const colors = [
    'rgba(42,237,21, 0.3)',
    'rgba(255,59,257, 0.3)',
    'rgba(0,128,255, 0.3)',
    'rgba(255,165,0, 0.3)',
  ];
  const length = 10;

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.albumStart}>
          <HappySvg width={52} height={52} fill={Colors.green} />
        </View>
        <ScrollView
          style={styles.circleStart}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {Array.from({ length }).map((_, index) => (
            <View style={styles.albumList} key={index}>
              <CircleAlbum
                order={length - index}
                color={colors[index % colors.length]}
                imageSource={'https://picsum.photos/100/100'}
                diameter={68}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default MonthlyMusicList;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  albumStart: {
    height: 68,
    width: 68,
    borderRadius: 6,
    backgroundColor: Colors.purple,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  circleStart: {
    paddingLeft: 12,
  },
  albumList: {
    marginLeft: -18,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

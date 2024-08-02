import { StyleSheet, View, FlatList, Text } from 'react-native';
import { COLORS, FONTS } from '@/constants';
import DiaryNumber from '@/components/mypage/DiaryNumber';
import MyFilling from '@/components/mypage/MyFilling';
import MusicPreference from '@/components/mypage/MusicPreference';
import DiaryTopic from '@/components/mypage/DiaryTopic';
import templateData from '@/data/static_monthly_template.json';
import { colorWithOpacity } from '@/utils/color-utils';

const MonthlyNoDataTemplate = () => {
  return (
    <>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Sample</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.overlay} />
        <View style={styles.bodyContainer}>
          <FlatList
            data={[
              <DiaryNumber
                key="diary1"
                month={templateData.date}
                diaryCount={templateData.diaryCount}
              />,
              <MyFilling key="myFilling" emotionData={templateData.emotions} />,
              <MusicPreference
                key="musicPreference"
                genreCounts={templateData.genreCounts}
              />,

              <DiaryTopic key="diaryTopic" topics={templateData.topics} />,
            ]}
            renderItem={({ item }) => <View style={styles.item}>{item}</View>}
            keyExtractor={(_, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            scrollEnabled={false}
          />
        </View>
      </View>
    </>
  );
};

export default MonthlyNoDataTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingBottom: 50,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: colorWithOpacity(COLORS.BLACK, 0.7),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  button: {
    flex: 1,
    width: 46,
    height: 16,
    justifyContent: 'center',
    backgroundColor: colorWithOpacity(COLORS.PURPLE, 0.3),
    marginLeft: 16,
    borderRadius: 7.5,
  },
  buttonText: {
    textAlign: 'center',
    color: COLORS.PURPLE,
    ...FONTS.LB,
  },
  bodyContainer: {
    paddingHorizontal: 16,
    flex: 1,
  },
  listContainer: {
    alignItems: 'center',
  },
  item: {
    margin: 8,
  },
});

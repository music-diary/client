import { useEffect, useRef, useState } from 'react';
import { router } from 'expo-router';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { useSharedValue } from 'react-native-reanimated';
import Carousel, {
  Pagination,
  type ICarouselInstance,
} from 'react-native-reanimated-carousel';
import CustomAlertModal from '@/components/common/CustomAlertModal';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import LoadingView from '@/components/diary/LoadingView';
import Tooltip from '@/components/diary/Tooltip';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { useModalStore } from '@/store/useModalStore';
import { colorWithOpacity } from '@/utils/color-utils';

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;
const colors = [
  '#26292E',
  '#899F9C',
  '#B3C680',
  '#5C6265',
  '#F5D399',
  '#F1F1F1',
];

const lyricsData = [
  '가사 1번째 줄입니다.',
  '가사 2번째 줄입니다.',
  '가사 3번째 줄입니다.',
  '가사 4번째 줄입니다.',
  '가사 5번째 줄입니다.',
  '가사 1번째 줄입니다.',
  '가사 2번째 줄입니다.',
  '가사 3번째 줄입니다.',
  '가사 4번째 줄입니다.',
  '가사 5번째 줄입니다.',
  '가사 1번째 줄입니다.',
  '가사 2번째 줄입니다.',
  '가사 3번째 줄입니다.',
  '가사 4번째 줄입니다.',
  '가사 5번째 줄입니다.',
  '가사 1번째 줄입니다.',
  '가사 2번째 줄입니다.',
  '가사 3번째 줄입니다.',
  '가사 4번째 줄입니다.',
  '가사 5번째 줄입니다.',
  '가사 1번째 줄입니다.',
  '가사 2번째 줄입니다.',
  '가사 3번째 줄입니다.',
  '가사 4번째 줄입니다.',
  '가사 5번째 줄입니다.',
  '가사 1번째 줄입니다.',
  '가사 2번째 줄입니다.',
  '가사 3번째 줄입니다.',
  '가사 4번째 줄입니다.',
  '가사 5번째 줄입니다.',
];

const MusicRecommendationScreen = () => {
  const ref = useRef<ICarouselInstance>(null);
  const { closeModal } = useModalStore();
  const [isVertical, setIsVertical] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [pagingEnabled, setPagingEnabled] = useState<boolean>(true);
  const [snapEnabled, setSnapEnabled] = useState<boolean>(true);
  const progress = useSharedValue<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  const [selectedLyrics, setSelectedLyrics] = useState<number[]>([]);

  const handleLyricPress = (index: number) => {
    setSelectedLyrics((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else if (prevSelected.length < 3) {
        return [...prevSelected, index];
      }
      return prevSelected;
    });
  };

  const handleNext = () => {
    router.push('/diary/card');
  };

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const handleDraft = () => {
    closeModal();
    router.push('/');
  };

  return loading ? (
    <LoadingView />
  ) : (
    <>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>
          오늘의 윤경 님에게 어울리는 곡들이에요
        </Text>
        <Carousel
          ref={ref}
          {...({
            vertical: false,
            width: PAGE_WIDTH,
            height: PAGE_HEIGHT * 0.68,
          } as const)}
          style={{
            width: PAGE_WIDTH,
          }}
          loop
          pagingEnabled={pagingEnabled}
          snapEnabled={snapEnabled}
          autoPlay={autoPlay}
          autoPlayInterval={1500}
          onProgressChange={progress}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          data={colors}
          renderItem={({ index }) => (
            <Animated.View style={styles.cardContainer}>
              <View style={styles.youtube}></View>
              <View style={styles.musicInfo}>
                <Text style={styles.singer}>비비</Text>
                <Text style={styles.title}>밤양갱</Text>
              </View>
              <View style={styles.lyricsSection}>
                <View style={styles.tooltipContainer}>
                  <Text style={styles.tooltipTitle}>가사</Text>
                  <Tooltip />
                </View>
                <ScrollView style={styles.lyricsContainer}>
                  {lyricsData.map((line, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleLyricPress(index)}
                      style={[
                        styles.lyricLine,
                        selectedLyrics.includes(index) &&
                          styles.selectedLyricLine,
                      ]}
                    >
                      <Text style={styles.lyricsText}>{line}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </Animated.View>
          )}
        />

        <Pagination.Basic
          progress={progress}
          data={colors.map((color) => ({ color }))}
          dotStyle={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 10 }}
          containerStyle={{ gap: 5, marginBottom: 10, borderRadius: 100 }}
          onPress={onPressPagination}
          renderItem={(item) => (
            <View
              style={{
                backgroundColor: 'purple',
                flex: 1,
              }}
            />
          )}
        />
      </View>
      <CustomBottomButton
        isActive={selectedLyrics.length > 0}
        onPress={handleNext} // 버튼 클릭 이벤트 핸들러
        label="다음"
      />
      <CustomAlertModal
        name="music-cancel"
        title="작성을 그만두시겠어요?"
        description="임시저장을 해두면 나중에 다시 적을 수 있어요."
        leftButtonText="일기 계속 작성하기"
        rightButtonText="임시저장하기"
        onLeftButtonPress={closeModal}
        onRightButtonPress={handleDraft}
      />
    </>
  );
};

export default MusicRecommendationScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: Colors.BLACK,
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  headerTitle: {
    color: Colors.WHITE,
    ...Fonts.B1_SB,
  },
  cardContainer: {
    height: '100%',
    flex: 1,
    backgroundColor: Colors.GREY3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colorWithOpacity(Colors.WHITE, 0.1),
    gap: 20,
    alignItems: 'center',
    padding: 20,
  },
  youtube: {
    width: 276,
    height: 155,
    backgroundColor: 'red',
  },
  musicInfo: {
    alignItems: 'center',
    gap: 6,
  },
  singer: {
    color: Colors.GREY1,
    ...Fonts.BTN,
  },
  title: {
    color: Colors.WHITE,
    ...Fonts.B2_SB,
  },
  lyricsSection: {
    flex: 1,
    width: '100%',
    gap: 12,
  },
  tooltipContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tooltipTitle: {
    color: Colors.WHITE,
    ...Fonts.B1_SB,
  },
  lyricsContainer: {
    flex: 1,
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 10,
  },
  lyricLine: {
    padding: 10,
    borderRadius: 5,
  },
  selectedLyricLine: {
    backgroundColor: Colors.CONTENTS_LIGHT,
  },
  lyricsText: {
    color: Colors.WHITE,
    ...Fonts.B2,
  },
});

import { useRef, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import YoutubeIframe from 'react-native-youtube-iframe';
import CustomAlertModal from '@/components/common/CustomAlertModal';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import LoadingView from '@/components/diary/LoadingView';
import Tooltip from '@/components/diary/Tooltip';
import { COLORS, FONTS } from '@/constants';
import { useModalStore } from '@/store/useModalStore';
import { colorWithOpacity } from '@/utils/color-utils';
import { useMusicRecommendation, usePatchDiary } from '@/api/hooks/useDiaries';
import { extractVideoId } from '@/utils/music-utils';
import { type IDiary, type IMusic } from '@/models/interfaces';

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

const MusicRecommendationScreen = () => {
  const { diaryId, diaryData } = useLocalSearchParams();

  const parsedDiaryData: IDiary = JSON.parse(diaryData as string);

  const ref = useRef<ICarouselInstance>(null);
  const { closeModal } = useModalStore();
  const progress = useSharedValue<number>(0);
  const [musicDiaryData, setMusicDiaryData] = useState<IDiary>({} as IDiary); // diaryData 상태 추가

  const [selectedLyrics, setSelectedLyrics] = useState<
    Record<number, number[]>
  >({});

  const {
    data: musicData,
    error,
    isFetching,
  } = useMusicRecommendation(diaryId as string);

  const { mutate: patchDiary } = usePatchDiary({
    onSuccess: () => {
      router.push({ pathname: '/diary/card', params: { diaryId } });
    },
    onError: () => {
      console.error('Failed to patch diary');
    },
  });

  const handleLyricPress = (musicIndex: number, lyricIndex: number) => {
    setSelectedLyrics((prev) => {
      const currentSelections = prev[musicIndex] || [];

      if (currentSelections.includes(lyricIndex)) {
        return {
          ...prev,
          [musicIndex]: currentSelections.filter((i) => i !== lyricIndex),
        };
      }

      if (currentSelections.length < 3) {
        return {
          ...prev,
          [musicIndex]: [...currentSelections, lyricIndex],
        };
      }

      return prev;
    });
  };

  const handleNext = () => {
    const updatedMusicData: IMusic[] = musicData.map((music, index) => ({
      ...music,
      selectedLyric: music.lyric
        .split('\n')
        .filter((_, idx) => selectedLyrics[index]?.includes(idx))
        .join('\n'),
      selected: selectedLyrics[index]?.length > 0 || false, // 가사가 선택된 경우 true로 설정
    }));

    const updatedDiaryData: IDiary = {
      ...parsedDiaryData,
      status: 'EDIT',
      musics: updatedMusicData,
    };

    setMusicDiaryData(updatedDiaryData);
    patchDiary({ id: diaryId as string, payload: updatedDiaryData });
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

  if (isFetching) return <LoadingView />;

  if (musicData.length === 0 || error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>음악 추천을 불러오지 못했어요.</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView edges={['bottom']} style={styles.container}>
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
          autoPlayInterval={1500}
          onProgressChange={progress}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          data={musicData}
          renderItem={({ item, index }) => (
            <Animated.View style={styles.cardContainer}>
              <YoutubeIframe
                height={200}
                play={false}
                videoId={extractVideoId(item.youtubeUrl)}
              />
              <View style={styles.musicInfo}>
                <Text style={styles.singer}>{item.artist}</Text>
                <Text style={styles.title}>{item.title}</Text>
              </View>
              <View style={styles.lyricsSection}>
                <View style={styles.tooltipContainer}>
                  <Text style={styles.tooltipTitle}>가사</Text>
                  <Tooltip />
                </View>
                <ScrollView>
                  {item.lyric
                    .split('\n')
                    .map((line: string, lineIndex: number) => (
                      <TouchableOpacity
                        key={lineIndex}
                        onPress={() => handleLyricPress(index, lineIndex)}
                        style={styles.lyricLine}
                      >
                        <Text
                          style={[
                            styles.lyricsText,
                            selectedLyrics[index]?.includes(lineIndex) &&
                              styles.selectedLyricLine,
                          ]}
                        >
                          {line}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              </View>
            </Animated.View>
          )}
        />

        <Pagination.Basic
          progress={progress}
          data={musicData}
          dotStyle={styles.dot}
          containerStyle={{ gap: 5 }}
          onPress={onPressPagination}
          renderItem={(item) => (
            <View
              style={{
                backgroundColor: COLORS.PURPLE,
                flex: 1,
              }}
            />
          )}
        />
      </SafeAreaView>

      <CustomBottomButton
        isActive={Object.values(selectedLyrics).some(
          (lyrics) => lyrics.length > 0,
        )}
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
    backgroundColor: COLORS.BLACK,
    alignItems: 'center',
    flex: 1,
    paddingTop: 20,
  },
  headerTitle: {
    color: COLORS.WHITE,
    ...FONTS.B1_SB,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: COLORS.GREY3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colorWithOpacity(COLORS.WHITE, 0.1),
    gap: 20,
    padding: 20,
    width: '100%',
  },
  musicInfo: {
    alignItems: 'center',
    gap: 6,
  },
  singer: {
    color: COLORS.GREY1,
    ...FONTS.BTN,
  },
  title: {
    color: COLORS.WHITE,
    ...FONTS.B2_SB,
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
    color: COLORS.WHITE,
    ...FONTS.B1_SB,
  },
  lyricLine: {
    borderRadius: 5,
  },
  selectedLyricLine: {
    color: COLORS.PURPLE_BOX,
  },
  lyricsText: {
    textAlign: 'center',
    color: COLORS.WHITE,
    ...FONTS.B2_LINE2,
  },
  dot: {
    backgroundColor: COLORS.GREY1,
    borderRadius: 10,
    width: 6,
    height: 6,
  },
  errorText: {
    color: COLORS.RED,
    ...FONTS.B1,
    textAlign: 'center',
    marginTop: 20,
  },
});

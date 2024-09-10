import { useEffect, useRef, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
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
import {
  useDeleteDiary,
  useMusicRecommendation,
  usePatchDiary,
} from '@/api/hooks/useDiaries';
import CustomAlertModal from '@/components/common/CustomAlertModal';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import LoadingView from '@/components/diary/LoadingView';
import Tooltip from '@/components/diary/Tooltip';
import { COLORS, FONTS } from '@/constants';
import { type IMusic } from '@/models/interfaces';
import { type DiaryStatus } from '@/models/types';
import { useModalStore } from '@/store/useModalStore';
import { useSplashStore } from '@/store/useSplashStore';
import { colorWithOpacity } from '@/utils/color-utils';
import { extractVideoId } from '@/utils/music-utils';

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

const MusicRecommendationScreen = () => {
  const { diaryId, mood } = useLocalSearchParams();

  const ref = useRef<ICarouselInstance>(null);
  const { closeModal } = useModalStore();
  const { closeSplash } = useSplashStore();
  const progress = useSharedValue<number>(0);

  const [showLoading, setShowLoading] = useState(true);
  const [selectedLyrics, setSelectedLyrics] = useState<
    Record<number, number[]>
  >({});
  const [selectedMusicIndex, setSelectedMusicIndex] = useState<number | null>(
    null,
  );

  const {
    data: musicData,
    error,
    isFetching,
  } = useMusicRecommendation(diaryId as string);

  useEffect(() => {
    setShowLoading(true);
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
      closeSplash();
    };
  }, []);

  const { mutate: deleteDiary } = useDeleteDiary();
  const { mutate: patchDiary } = usePatchDiary({
    onSuccess: () => {
      router.push({ pathname: '/diary/card', params: { diaryId } });
    },
    onError: () => {
      console.warn('Failed to patch diary');
    },
  });

  const handleLyricPress = (musicIndex: number, lyricIndex: number) => {
    if (selectedMusicIndex !== musicIndex) {
      // 다른 음악의 가사를 선택하려고 하면 초기화
      setSelectedLyrics({ [musicIndex]: [lyricIndex] });
      setSelectedMusicIndex(musicIndex);
    } else {
      // 같은 음악의 가사를 선택할 때
      setSelectedLyrics((prev) => {
        const currentSelections = prev[musicIndex] || [];

        if (currentSelections.includes(lyricIndex)) {
          // 이미 선택된 가사를 다시 선택하면 해제
          return {
            ...prev,
            [musicIndex]: currentSelections.filter((i) => i !== lyricIndex),
          };
        }

        if (currentSelections.length < 3) {
          // 최대 세 줄까지 추가 선택 허용
          return {
            ...prev,
            [musicIndex]: [...currentSelections, lyricIndex],
          };
        }

        return prev;
      });
    }
  };

  const handleNext = () => {
    if (selectedMusicIndex === null) {
      console.warn('No music selected.');
      return;
    }

    const musicIndex = selectedMusicIndex;
    const selectedMusic: IMusic = musicData[musicIndex];
    const selectedLyricIndices = selectedLyrics[musicIndex] || [];

    const updatedMusic: IMusic = {
      ...selectedMusic,
      selectedLyric: selectedMusic.lyric
        .split('\n')
        .filter((_, idx) => selectedLyricIndices.includes(idx))
        .join('\n'),
      selected: true, // 선택된 음악으로 설정
    };

    const updatedDiaryData: { status: DiaryStatus; music: IMusic } = {
      status: 'EDIT',
      music: updatedMusic,
    };

    patchDiary({ id: diaryId as string, payload: updatedDiaryData });
  };

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  // const handleDraft = () => {
  //   closeModal();
  //   router.push('/');
  // };

  if (showLoading) {
    return <LoadingView mood={mood as 'good' | 'normal' | 'bad'} />;
  }

  if (isFetching) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color={COLORS.PURPLE} />
      </View>
    );
  }

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
        <View style={styles.headerView}>
          <Text style={styles.headerTitle}>
            뮤다가 오늘의 음악 3곡을 가져왔어요
          </Text>
          <Text style={styles.headerDesc}>마음에 드는 곡을 선택해 볼까요?</Text>
        </View>
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
        onPress={handleNext}
        label="다음"
      />

      <CustomAlertModal
        name="write-cancel"
        title="작성을 그만두시겠어요?"
        description="지금 그만두시면, 노래를 추천 받을 수 없어요."
        leftButtonText="그만두기"
        rightButtonText="일기 계속 작성하기"
        onLeftButtonPress={() => {
          closeModal();
          deleteDiary(diaryId as string);
          router.replace('/(main)');
        }}
        onRightButtonPress={closeModal}
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
  headerView: {
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    color: COLORS.WHITE,
    ...FONTS.B1_SB,
  },
  headerDesc: {
    color: colorWithOpacity(COLORS.WHITE, 0.7),
    ...FONTS.B2,
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
    color: COLORS.PURPLE_LIGHT,
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
  },
});

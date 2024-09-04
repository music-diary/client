import React, { forwardRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDiary } from '@/api/hooks/useDiaries';
import CircleAlbum from '@/components/common/CircleAlbum';
import { COLORS, FONTS } from '@/constants';
import { type IMusic } from '@/models/interfaces';
import { colorWithOpacity, getColorForMood } from '@/utils/color-utils';
import {
  getAllEmotionsFromTree,
  getMoodFromEmotions,
} from '@/utils/emotion-utils';
import { ArrowInSvg, ArrowOutSvg } from 'assets/images/archive';

interface IDailyDiaryCardProps {
  diaryId: string;
  isCapturing?: boolean;
}

// forwardRef로 컴포넌트를 감싸기
const DailyDiaryCard = forwardRef<View, IDailyDiaryCardProps>(
  ({ diaryId, isCapturing = false }, ref) => {
    const [expanded, setExpanded] = useState(true);
    // 다이어리 조회
    const { data: diaryData, error, isFetching } = useDiary(diaryId);
    if (isFetching) return <Text>Loading...</Text>;
    if (error) return <Text>Error!</Text>;

    const { title, content, templates, emotions, musics } = diaryData ?? {};

    const allEmotions = getAllEmotionsFromTree(emotions);
    const mood = getMoodFromEmotions(emotions);

    const handlePress = () => {
      setExpanded(!expanded);
    };

    const mainMusic: IMusic =
      musics && musics.length > 0
        ? musics.find((music) => music.selected) ?? musics[0] // 선택된 음악이 없으면 첫 번째 음악 사용
        : ({} as IMusic); // 빈 객체를 기본값으로 사용

    return (
      <View ref={ref} style={styles.cardContainer}>
        {!isCapturing && (
          <TouchableOpacity style={styles.expandButton} onPress={handlePress}>
            {expanded ? <ArrowInSvg /> : <ArrowOutSvg />}
          </TouchableOpacity>
        )}
        <View style={styles.divider}>
          <CircleAlbum
            color={colorWithOpacity(getColorForMood(mood), 0.3)}
            imageSource={mainMusic.albumUrl}
            diameter={240}
          />
          <View style={styles.middleContainer}>
            <View style={styles.sing}>
              <Text style={styles.greyBtnText}>{mainMusic.artist}</Text>
              <Text style={styles.b2sbText}>{mainMusic.title}</Text>
              <Text style={styles.lyricsText}>{mainMusic.selectedLyric}</Text>
            </View>
          </View>
        </View>
        <View style={styles.diaryTitleView}>
          <Text style={styles.b2sbText}>{title}</Text>
          {templates && (
            <Text style={styles.templateTitle}>{templates?.name}</Text>
          )}
        </View>
        {expanded &&
          (templates ? (
            <View style={styles.templateContainer}>
              {templates.templateContents.map((template) => (
                <View key={template.id}>
                  <Text style={styles.templateSubtitle}>{template.name}</Text>
                  <Text style={styles.templateContent}>{template.content}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.diaryContent}>{content}</Text>
          ))}
        <View style={styles.emotionContainer}>
          {allEmotions.map((data, index) => (
            <View
              key={index}
              style={[
                styles.emotionCircle,
                { backgroundColor: getColorForMood(mood) }, // 감정의 색상 사용
              ]}
            >
              <Text style={styles.btnText}>{data.label}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  },
);

DailyDiaryCard.displayName = 'DailyDiaryCard';

export default DailyDiaryCard;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.BOX,
    marginTop: 1,
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 23,
    borderRadius: 10,
  },
  expandButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  middleContainer: {
    paddingTop: 18,
    alignItems: 'center',
    gap: 8,
  },
  diaryTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  divider: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 23,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GREY1,
  },
  sing: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  },
  greyBtnText: {
    color: COLORS.GREY1,
    ...FONTS.BTN,
  },
  b2sbText: {
    color: COLORS.WHITE,
    ...FONTS.B2_SB,
  },
  btnText: {
    color: COLORS.BLACK,
    ...FONTS.BTN,
  },
  lyricsText: {
    color: COLORS.PURPLE,
    ...FONTS.B2_LINE2_SB,
    paddingTop: 10,
    textAlign: 'center',
  },
  templateContainer: {
    paddingTop: 10,
    paddingBottom: 12,
    flexDirection: 'column',
    gap: 10,
    width: '100%',
  },
  templateTitle: {
    color: colorWithOpacity(COLORS.WHITE, 0.2),
    ...FONTS.B2_SB,
  },
  templateSubtitle: {
    color: colorWithOpacity(COLORS.WHITE, 0.2),
    ...FONTS.LB,
  },
  templateContent: {
    color: COLORS.WHITE,
    ...FONTS.B2_LINE2,
  },
  emotionContainer: {
    paddingTop: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 10,
  },
  emotionCircle: {
    paddingVertical: 8,
    paddingHorizontal: 14.5,
    borderRadius: 30,
  },
  diaryContent: {
    color: COLORS.WHITE,
    paddingTop: 6,
    textAlign: 'justify',
    ...FONTS.B2_LINE2,
  },
});

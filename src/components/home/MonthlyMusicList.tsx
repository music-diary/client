import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { COLORS } from '@/constants';
import { HappySvg } from 'assets/images/common';
import { type IArchiveMusic } from '@/models/interfaces';
import { emotionColor } from '@/constants/data';
import { colorWithOpacity } from '@/utils/color-utils';
import CircleAlbum from '../common/CircleAlbum';

interface MonthlyMusicListProps {
  musics: IArchiveMusic[];
}

const MonthlyMusicList = ({ musics }: MonthlyMusicListProps) => {
  const selectedMusics = musics.filter((music) => music.selected);

  // 선택된 음악 목록을 렌더링하는 함수
  const renderMusic = (music: IArchiveMusic, index: number) => {
    if (!music.diary || !Array.isArray(music.diary.emotions)) {
      console.error(
        `음악 ID ${music.id}에 대한 일기 데이터가 유효하지 않습니다.`,
      );
      return null;
    }

    const emotionName =
      music.diary.emotions.find(
        (emotion) => emotion.emotions.parent.level === 0,
      )?.emotions.parent.name ?? 'normal';
    const color =
      colorWithOpacity(emotionColor[emotionName], 0.3) ||
      colorWithOpacity(COLORS.GREEN, 0.3);

    return (
      <View style={styles.albumList} key={music.id}>
        <CircleAlbum
          order={selectedMusics.length - index}
          color={color}
          imageSource={music.albumUrl}
          diameter={68}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.albumStart}>
          <HappySvg width={52} height={52} fill={COLORS.GREEN} />
        </View>
        <ScrollView
          style={styles.circleStart}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {selectedMusics.map(renderMusic)}
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
    backgroundColor: COLORS.PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  circleStart: {
    paddingLeft: 12,
  },
  albumList: {
    marginLeft: -18,
    alignItems: 'center',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

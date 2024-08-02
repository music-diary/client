import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants';
import { useGenres } from '@/api/hooks/useGenres';
import { type IGenre } from '@/models/interfaces';
import { colorWithOpacity } from '@/utils/color-utils';
import LoadingIndicator from '../common/LoadingIndicator';
import ErrorDisplay from '../common/ErrorDisplay';

interface MusicSelectionProps {
  selectedGenres: IGenre[];
  setSelectedGenres: (genres: IGenre[]) => void;
}

const MusicSelection = ({
  selectedGenres,
  setSelectedGenres,
}: MusicSelectionProps) => {
  const { data: genres, error, isLoading } = useGenres();

  const toggleSelection = (item: IGenre) => {
    const exists = selectedGenres.find((genre) => genre.id === item.id);
    if (exists) {
      if (selectedGenres.length === 1) {
        return;
      }
      setSelectedGenres(selectedGenres.filter((genre) => genre.id !== item.id));
    } else {
      if (selectedGenres.length >= 3) {
        // 3개 이상 선택한 경우
        return;
      }
      setSelectedGenres([...selectedGenres, item]);
    }
  };

  // 로딩 및 에러 처리
  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (!genres || genres.length === 0 || error) {
    return <ErrorDisplay message="장르를 불러오지 못했어요." />;
  }

  return (
    <>
      <Text style={styles.warningText}>
        최소 1개부터 최대 3개까지 선택 가능해요
      </Text>
      <View style={styles.grid}>
        {genres.map((genre) => {
          if (!genre.label) return null;

          const isSelected = !!selectedGenres.find((g) => g.id === genre.id);
          return (
            <TouchableOpacity
              key={genre.id}
              style={[styles.item, isSelected && styles.selectedItem]}
              onPress={() => toggleSelection(genre)}
            >
              <Text
                style={[styles.itemText, isSelected && styles.selectedItemText]}
              >
                {genre.label ?? ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

export default MusicSelection;

const styles = StyleSheet.create({
  warningText: {
    paddingTop: 25,
    paddingHorizontal: 25,
    color: colorWithOpacity(COLORS.WHITE, 0.7),
    ...FONTS.BTN,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 28,
  },
  item: {
    backgroundColor: COLORS.GREY1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  selectedItem: {
    backgroundColor: COLORS.PURPLE,
  },
  itemText: {
    color: COLORS.WHITE,
    ...FONTS.B2_SB,
  },
  selectedItemText: {
    color: COLORS.WHITE,
  },
});

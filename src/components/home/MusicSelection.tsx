import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { COLORS, FONTS } from '@/constants';
import { useGenres } from '@/api/hooks/useGenres';
import LoadingIndicator from '../common/LoadingIndicator';
import ErrorDisplay from '../common/ErrorDisplay';

interface MusicSelectionProps {
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
}

const MusicSelection = ({
  selectedGenres,
  setSelectedGenres,
}: MusicSelectionProps) => {
  const { data: genres, error, isLoading } = useGenres();

  const toggleSelection = (item: string) => {
    if (selectedGenres.includes(item)) {
      if (selectedGenres.length === 1) {
        return;
      }
      setSelectedGenres(selectedGenres.filter((genre) => genre !== item));
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
    <View style={styles.grid}>
      {genres.map((genre) => {
        if (!genre.label) return null;

        const isSelected = selectedGenres.includes(genre.label);
        return (
          <TouchableOpacity
            key={genre.id}
            style={[styles.item, isSelected && styles.selectedItem]}
            onPress={() => toggleSelection(genre.label ?? '')}
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
  );
};

export default MusicSelection;

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 36,
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

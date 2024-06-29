import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

const musicList = [
  '발라드',
  '댄스',
  '랩/힙합',
  'R&B',
  '인디',
  '록/메탈',
  'POP',
  '뉴에이지',
  '포크/블루스',
  '일렉트로니카',
  'OST',
  '재즈',
  'J-pop',
];
interface MusicSelectionProps {
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
}

const MusicSelection = ({
  selectedGenres,
  setSelectedGenres,
}: MusicSelectionProps) => {
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

  return (
    <View style={styles.grid}>
      {musicList.map((item, index) => {
        const isSelected = selectedGenres.includes(item);
        return (
          <TouchableOpacity
            key={index}
            style={[styles.item, isSelected && styles.selectedItem]}
            onPress={() => toggleSelection(item)}
          >
            <Text
              style={[styles.itemText, isSelected && styles.selectedItemText]}
            >
              {item}
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
    backgroundColor: Colors.GREY1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  selectedItem: {
    backgroundColor: Colors.PURPLE,
  },
  itemText: {
    color: Colors.WHITE,
    ...Fonts.B2_SB,
  },
  selectedItemText: {
    color: Colors.WHITE,
  },
});

import { View, StyleSheet, FlatList } from 'react-native';
import { COLORS } from '@/constants';
import MonthlyMainArchive from '@/components/archive/MonthlyMainArchive';
import RouteSwitcher from '@/components/archive/RouteSwitcher';
import { useMusicArchiveSummary } from '@/api/hooks/useArchive';
import LoadingScreen from '@/components/common/LoadingScreen';

interface MusicSummaryEntry {
  id: string;
  month: string;
  mood: string;
  albumCoverUrl: string;
  songTitle: string;
  artist: string;
  diaryEntries: number;
}

const GridScreen = () => {
  const { data: summaryData, isLoading } = useMusicArchiveSummary();

  if (!summaryData || isLoading) {
    return (
      <View>
        <LoadingScreen />
      </View>
    );
  }

  const entryData: MusicSummaryEntry[] =
    summaryData.map((item, index) => ({
      id: String(index),
      month: item.date,
      mood: item.emotion?.parent?.name ?? '',
      albumCoverUrl: item.music?.albumUrl ?? '',
      songTitle: item.music?.title ?? 'Unknown',
      artist: item.music?.artist ?? 'Unknown',
      diaryEntries: item.count,
    })) ?? [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <RouteSwitcher />
      </View>
      <FlatList
        data={entryData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <View style={styles.gridItem}>
            <MonthlyMainArchive {...item} />
          </View>
        )}
        contentContainerStyle={styles.contentContainer}
        style={{ backgroundColor: COLORS.BLACK }}
      />
    </View>
  );
};

export default GridScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  header: {
    height: 50,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 130,
  },

  columnWrapper: {
    justifyContent: 'space-between',
  },

  gridItem: {
    marginTop: 16,
  },
});

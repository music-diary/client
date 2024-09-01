import { View, StyleSheet, FlatList } from 'react-native';
import { COLORS } from '@/constants';
import MonthlyMainArchive from '@/components/archive/MonthlyMainArchive';
import RouteSwitcher from '@/components/archive/RouteSwitcher';
import { useMusicArchiveSummary } from '@/api/hooks/useArchive';
import LoadingScreen from '@/components/common/LoadingScreen';
import { getMoodFromEmotions } from '@/utils/emotion-utils';
import { type IMusicSummaryEntry } from '@/models/interfaces';
import NoArchiveData from '@/components/archive/NoArchiveData';

const GridScreen = () => {
  const { data: summaryData, isLoading } = useMusicArchiveSummary();

  // 로딩 중일때
  if (!summaryData || isLoading) {
    return (
      <>
        <View style={styles.header}>
          <RouteSwitcher />
        </View>
        <LoadingScreen />
      </>
    );
  }

  const entryData: IMusicSummaryEntry[] =
    summaryData.map((item, index) => ({
      id: String(index),
      month: item.date,
      mood: item.emotion?.parent
        ? getMoodFromEmotions([{ emotions: item.emotion?.parent }])
        : '',
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
      {entryData.length === 0 ? (
        <View style={styles.container}>
          <NoArchiveData />
        </View>
      ) : (
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
      )}
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

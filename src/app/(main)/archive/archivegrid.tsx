import { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Colors from '@/constants/Colors';
import dummy_archive_main from '@/data/dummy_archive_main.json';
import MontlyMainArchive from '@/components/archive/MontlyMainArchive';
import RouteSwitcher from '@/components/archive/RouteSwitcher';

interface DiaryEntryData {
  id: string;
  month: string;
  mood: string;
  albumCoverUrl: string;
  songTitle: string;
  artist: string;
  diaryEntries: number;
}

const ArchiveScreen = () => {
  const [entryData, setEntryData] = useState<DiaryEntryData[]>([]);
  useEffect(() => {
    setEntryData(dummy_archive_main);
  }, []);

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
            <MontlyMainArchive {...item} />
          </View>
        )}
        contentContainerStyle={styles.contentContainer}
        style={{ backgroundColor: Colors.black }}
      />
    </View>
  );
};

export default ArchiveScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
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
    marginTop: 20,
    height: 165,
    width: 165,
  },
});

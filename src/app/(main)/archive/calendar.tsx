import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import { CalendarList } from 'react-native-calendars';
import Colors from '@/constants/Colors';
import TempBlack from '@/components/archive/TempBlack';

interface CustomStyle {
  container: React.CSSProperties & {
    borderRadius: number;
    ImageBackground: JSX.Element;
  };
}

interface MarkedDateInfo {
  selected?: boolean;
  marked?: boolean;
  selectedColor?: string;
  customStyles?: CustomStyle;
}

type MarkedDates = Record<string, MarkedDateInfo>;

const CalendarView = () => {
  const [selected, setSelected] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showTempBlack, setShowTempBlack] = useState(false);

  const markedDates: MarkedDates = {
    '2024-04-01': {
      selected: true,
      customStyles: {
        container: {
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          width: 50,
          borderRadius: 25,
          ImageBackground: (
            <ImageBackground
              source={{ uri: 'https://picsum.photos/200' }}
              style={{ width: '100%', height: '100%' }}
            />
          ),
        },
      },
    },
    '2024-04-02': {
      marked: true,
      selected: true,
      customStyles: {
        container: {
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          width: 50,
          borderRadius: 25,
          ImageBackground: (
            <ImageBackground
              source={{ uri: 'https://picsum.photos/200' }}
              style={{ width: '100%', height: '100%' }}
            />
          ),
        },
      },
    },
    '2024-04-03': { selected: true, marked: true, selectedColor: 'blue' },
  };

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 1000);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setShowTempBlack(true);
      setTimeout(() => setShowTempBlack(false), 500);
    }
  }, [isLoaded]);

  return (
    <View style={styles.container}>
      {isLoaded ? (
        <>
          {showTempBlack && (
            <View style={styles.blackContainer}>
              <TempBlack />
            </View>
          )}
          <CalendarList
            hideExtraDays
            horizontal={false}
            theme={{
              calendarBackground: Colors.black,
              monthTextColor: Colors.white,
              textSectionTitleColor: Colors.contents_light,
              dayTextColor: Colors.white,
              textMonthFontFamily: 'pret-b',
            }}
            onDayPress={(day) => {
              setSelected(day.dateString);
            }}
            markedDates={{
              '2024-05-01': {
                selected: true,
                marked: true,
                // selectedColor: 'blue',
                customStyles: {
                  container: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                  },
                },
              },
              '2024-05-02': { marked: true },
              '2024-05-03': {
                selected: true,
                marked: true,
                selectedColor: 'blue',
              },
            }}
          />
        </>
      ) : (
        <ActivityIndicator style={styles.loadingContainer} color="#793FB5" />
      )}
    </View>
  );
};

export default CalendarView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackContainer: {
    position: 'absolute',
    flex: 1,
    height: '100%',
    width: '100%',
    zIndex: 10,
  },
  calendarContainer: {},
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: Colors.box,
    borderRadius: 10,
  },
  itemText: {
    color: Colors.white,
  },
});

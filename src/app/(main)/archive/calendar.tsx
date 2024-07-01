import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { CalendarList, type DateData } from 'react-native-calendars';
import { router } from 'expo-router';
import { COLORS } from '@/constants';
import TempBlack from '@/components/archive/TempBlack';
import dummyArchiveCalendar from '@/data/dummy_archive_calendar.json';
import RouteSwitcher from '@/components/archive/RouteSwitcher';

interface customDayComponentProps {
  date: DateData;
  imageUri?: string;
}
const customDayComponent = ({ date, imageUri }: customDayComponentProps) => {
  // dateData 형식 확인
  const handleDateClick = (dd: DateData) => {
    // console.log('🚀 ~ file: calendar.tsx:22 ~ handleDateClick ~ dd:', dd);
    // 추후 날짜 누르면 이동하게 구현
  };

  // temp date (임시 설정)
  const tempDate = 'archive/day/3%EC%9B%94%202%EC%9D%BC';
  const handleAlbumClick = (date: DateData) => {
    console.log(
      '🚀 ~ file: calendar.tsx:26 ~ handleAlbumClick ~ date:',
      date.dateString,
    );
    router.push(tempDate);
  };

  return (
    <View style={styles.dayContainer}>
      {imageUri ? (
        <TouchableOpacity
          style={styles.albumContainer}
          onPress={() => handleAlbumClick(date)}
        >
          <View style={styles.albumImageContainer}>
            <Image source={{ uri: imageUri }} style={styles.albumImage} />
          </View>
          <Text style={styles.whiteText}>{date.day}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => handleDateClick(date)}>
          <Text style={styles.whiteText}>{date.day}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const CalendarScreen = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showTempBlack, setShowTempBlack] = useState(false);

  // 로딩처리
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setShowTempBlack(true);
      setTimeout(() => setShowTempBlack(false), 500);
    }
  }, [isLoaded]);

  const getImageUriForDate = (dateString?: string) => {
    if (!dateString) return undefined;
    const item = dummyArchiveCalendar.find((item) => item.date === dateString);
    return item ? item.albumCoverUrl : undefined;
  };

  return (
    <View style={styles.container}>
      {isLoaded ? (
        <>
          {showTempBlack && (
            <View style={styles.blackContainer}>
              <TempBlack />
            </View>
          )}
          <View style={styles.routerContainer}>
            <RouteSwitcher />
          </View>
          <CalendarList
            hideExtraDays
            horizontal={false}
            theme={{
              calendarBackground: COLORS.BLACK,
              monthTextColor: COLORS.WHITE,
              textSectionTitleColor: COLORS.CONTENTS_LIGHT,
              dayTextColor: COLORS.WHITE,
              textMonthFontFamily: 'pret-b',
            }}
            dayComponent={({ date, state }) =>
              customDayComponent({
                date: date as DateData,
                imageUri: date
                  ? getImageUriForDate(date.dateString)
                  : undefined,
              })
            }
          />
        </>
      ) : (
        <>
          <ActivityIndicator
            style={styles.loadingContainer}
            color={COLORS.PURPLE}
          />
        </>
      )}
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  routerContainer: {
    position: 'absolute',
    // 중앙 정렬
    width: '100%',

    top: 0,
    left: 0,
    zIndex: 3,
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
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    aspectRatio: 1,
  },
  whiteText: {
    textAlign: 'center',
    color: COLORS.WHITE,
    zIndex: 1,
    opacity: 1,
  },
  albumContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: COLORS.BLACK,
  },
  albumImageContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    opacity: 0.5, // 이미지 투명도 조절
  },
  albumImage: {
    height: '100%',
    width: '100%',
  },
});

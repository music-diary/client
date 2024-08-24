import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Calendar, type DateData } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { COLORS, FONTS } from '@/constants';
import RouteSwitcher from '@/components/archive/RouteSwitcher';
import {
  getFormattedMonth,
  getCurrentMonthRange,
  formatMonthDayDate,
} from '@/utils/date-utils';
import { useDiaryMonthlyArchive } from '@/api/hooks/useArchive';
import { type DiaryMonthArchiveSchema } from '@/models/schemas';

type ProcessedMusicData = Record<
  string,
  {
    albumCoverUrl: string;
    id: string;
  }
>;

const extractProcessedMusicData = (diaries: DiaryMonthArchiveSchema[]) => {
  const processedData: ProcessedMusicData = {};

  diaries.forEach((diary) => {
    const selectedMusic = diary.musics.find((music) => music.selected);
    if (selectedMusic) {
      const updatedAtDate = new Date(diary.updatedAt)
        .toISOString()
        .split('T')[0];
      processedData[updatedAtDate] = {
        albumCoverUrl: selectedMusic.albumUrl,
        id: diary.id,
      };
    }
  });

  return processedData;
};

const CalendarScreen = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [monthRange, setMonthRange] = useState(
    getCurrentMonthRange(currentDate),
  );

  const { data: musicData, isLoading } = useDiaryMonthlyArchive(
    monthRange.startAt,
    monthRange.endAt,
    'month',
  );

  const processedMusicData = musicData
    ? extractProcessedMusicData(musicData)
    : {};

  const handleMonthChange = (month: DateData) => {
    const newDate = new Date(month.year, month.month - 1);
    setCurrentDate(newDate);
    setMonthRange(getCurrentMonthRange(newDate));
  };

  // 화살표 렌더링 함수
  const renderArrow = (direction: 'left' | 'right') => (
    <Feather
      name={`chevron-${direction}`}
      size={24}
      color={COLORS.CONTENTS_LIGHT}
    />
  );

  const getImageUriForDate = (dateString: string) => {
    return processedMusicData?.[dateString]?.albumCoverUrl;
  };

  const renderDay = ({ date, state }: { date: DateData; state: string }) => {
    const textColor =
      state === 'disabled' ? COLORS.CONTENTS_LIGHT : COLORS.WHITE;
    const imageUri = getImageUriForDate(date.dateString);
    const id = processedMusicData?.[date.dateString]?.id;

    return (
      <Link
        href={{
          pathname: `/(main)/archive/day/${formatMonthDayDate(date.dateString)}`,
          params: { id },
        }}
        asChild
        key={id || date.dateString}
      >
        <TouchableOpacity style={styles.dayContainer} disabled={!id}>
          {imageUri && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUri }} style={styles.albumImage} />
            </View>
          )}
          <Text style={[styles.dayText, { color: textColor }]}>{date.day}</Text>
        </TouchableOpacity>
      </Link>
    );
  };

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color={COLORS.PURPLE} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.routerContainer}>
        <RouteSwitcher />
      </View>

      <View style={styles.monthContainer}>
        <Text style={styles.monthText}>{getFormattedMonth(currentDate)}</Text>
      </View>

      <Calendar
        current={getFormattedMonth(currentDate)}
        onMonthChange={handleMonthChange}
        enableSwipeMonths={true}
        renderArrow={renderArrow}
        dayComponent={renderDay}
        theme={{
          backgroundColor: COLORS.BLACK,
          calendarBackground: COLORS.BLACK,
          monthTextColor: COLORS.WHITE,
          selectedDayBackgroundColor: COLORS.PURPLE,
          selectedDayTextColor: COLORS.PURPLE,
          textMonthFontFamily: 'pret-b',
        }}
      />
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
  },
  routerContainer: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 3,
  },
  monthContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  monthText: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontFamily: 'pret-b',
  },
  dayContainer: {
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
  },
  dayText: {
    ...FONTS.B2,
    color: COLORS.WHITE,
  },
  imageContainer: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  albumImage: {
    width: '100%',
    height: '100%',
  },
});

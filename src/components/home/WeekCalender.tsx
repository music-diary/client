import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '@/constants';
import { ArrowButtonSvg } from 'assets/images/home';
import { useDiaryArchive } from '@/api/hooks/useArchive';
import { cvtDateToWeekStr, formatKST, moveWeek } from '@/utils/date-utils';

const WeekCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { weekStart, weekEnd } = cvtDateToWeekStr(selectedDate);

  const koreaDate = formatKST(new Date());
  const today = koreaDate.split('-');

  const weekName = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const weekDays = [];
  for (let i = 0; i <= 6; i++) {
    const day = new Date(weekStart);
    day.setDate(day.getDate() + i);
    const kstDay = formatKST(day);
    weekDays.push(kstDay);
  }
  const displayYear = weekDays.includes(koreaDate)
    ? today[0]
    : weekDays[6].split('-')[0];

  const displayMonth = weekDays.includes(koreaDate)
    ? today[1]
    : weekDays[6].split('-')[1];

  // data fetch
  const { data: diaryData } = useDiaryArchive(
    formatKST(weekStart),
    formatKST(weekEnd),
  );

  const diaryDates = diaryData.map((diary) => diary.updatedAt.split('T')[0]);

  const prevWeek = () => {
    const { startDate } = moveWeek(weekStart, 'prev');
    setSelectedDate(startDate);
  };

  const nextWeek = () => {
    const { startDate } = moveWeek(weekStart, 'post');
    setSelectedDate(startDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarTop}>
        <Text style={styles.currentDate}>
          {displayYear}년 {displayMonth}월
        </Text>
        <View style={styles.arrow}>
          <TouchableOpacity onPress={prevWeek}>
            <ArrowButtonSvg />
          </TouchableOpacity>
          <TouchableOpacity onPress={nextWeek} style={styles.forwardArrow}>
            <ArrowButtonSvg />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.calendarBody}>
        <View style={styles.week}>
          {weekName.map((name, index) => (
            <Text key={index} style={styles.weekText}>
              {name}
            </Text>
          ))}
        </View>
        <View style={styles.days}>
          {weekDays.map((date, index) => (
            <View
              key={index}
              style={
                today.join('-') === date
                  ? styles.dayToday
                  : styles.dayTextContainer
              }
            >
              {/* 실제 데이터 기반으로 dot 표시 */}
              {diaryDates?.includes(date) && (
                <View
                  style={[
                    styles.dot,
                    today.join('-') === date && {
                      backgroundColor: COLORS.WHITE,
                    },
                  ]}
                ></View>
              )}
              <Text
                style={[
                  styles.dayText,
                  today.join('-') === date && { color: '#1D1D1D' },
                ]}
              >
                {date.split('-')[2]}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default WeekCalendar;

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
  },
  calendarTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentDate: {
    color: COLORS.WHITE,
    ...FONTS.B2_SB,
  },
  arrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  forwardArrow: {
    transform: [{ rotate: '180deg' }],
  },
  calendarBody: {
    height: 84,
    backgroundColor: COLORS.BG_LIGHT,
    borderRadius: 10,
    paddingTop: 16,
    paddingHorizontal: 15,
    marginTop: 16,
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekText: {
    fontFamily: 'pret-sb',
    fontSize: 10,
    color: '#AAAAAA',
    width: 32,
    textAlign: 'center',
  },
  days: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  dayTextContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontFamily: 'pret-sb',
    fontSize: 12,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  dayToday: {
    fontFamily: 'pret-sb',
    fontSize: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.PURPLE,
    justifyContent: 'center',
    textAlign: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.PURPLE,
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

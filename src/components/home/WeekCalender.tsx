import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '@/constants';
import { ArrowButtonSvg } from 'assets/images/home';

// toISOString()를 한국 시간으로 변환
const formatKST = (date: Date) => {
  const offset = 1000 * 60 * 60 * 9; // UTC+9
  const koreaDate = new Date(date.getTime() + offset);
  return koreaDate.toISOString().split('T')[0];
};

const cvtDateToWeekStr = (date: Date): { weekStart: Date; weekEnd: Date } => {
  const weekStart = new Date(date);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // 시작일: 일요일로 설정

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6); // 종료일: 토요일로 설정

  return { weekStart, weekEnd };
};

const moveWeek = (date: Date, type: 'prev' | 'post') => {
  const currentDate = new Date(date);

  if (type === 'prev') {
    currentDate.setDate(currentDate.getDate() - currentDate.getDay() - 7);
  } else if (type === 'post') {
    currentDate.setDate(currentDate.getDate() + (7 - currentDate.getDay()));
  }

  const startDate = new Date(currentDate);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  return { startDate, endDate };
};

const WeekCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { weekStart } = cvtDateToWeekStr(selectedDate);

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

  // 추후: 일기 쓴 날짜에 따라 dot 표시 (현재는 dummyDates로 표시)
  const dummyDates = ['2024-03-24', '2024-03-27'];

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
              {dummyDates.includes(date) && <View style={styles.dot}></View>}
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
    marginRight: 16, // 수정 필요
  },
  calendarTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentDate: {
    color: Colors.WHITE,
    ...Fonts.B2_SB,
  },
  arrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  forwardArrow: {
    transform: [{ rotate: '180deg' }],
  },
  calendarBody: {
    height: 84,
    backgroundColor: Colors.BG_LIGHT,
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
    color: Colors.WHITE,
    textAlign: 'center',
  },
  dayToday: {
    fontFamily: 'pret-sb',
    fontSize: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.PURPLE,
    justifyContent: 'center',
    textAlign: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.PURPLE,
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

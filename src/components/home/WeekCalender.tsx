import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Fonts from '@/constants/Fonts';
import Colors from '@/constants/Colors';

// toISOString()를 한국 시간으로 변환
const formatKST = (date: Date) => {
  const offset = 1000 * 60 * 60 * 9; // UTC+9
  const koreaDate = new Date(date.getTime() + offset);
  return koreaDate.toISOString().split('T')[0];
};

const cvtDatetoWeekStr = (date: Date): { weekStart: Date; weekEnd: Date } => {
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
  const { weekStart } = cvtDatetoWeekStr(selectedDate);

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
      <View style={styles.calanderTop}>
        <Text style={styles.currentDate}>
          {displayYear}년 {displayMonth}월
        </Text>
        <View style={styles.arrow}>
          <TouchableOpacity onPress={prevWeek}>
            <Text style={{ color: 'white', paddingRight: 5 }}>{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={nextWeek}>
            {/* <Text style={{ color: 'white' }}>{'>'}</Text> */}
            <AntDesign name="caretright" size={16} color="#34323B" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.calanderBody}>
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
  calanderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentDate: {
    color: Colors.white,
    ...Fonts.b2_sb,
  },
  arrow: {
    flexDirection: 'row',
  },
  calanderBody: {
    height: 84,
    backgroundColor: Colors.bg_light,
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
    color: Colors.white,
    textAlign: 'center',
  },
  dayToday: {
    fontFamily: 'pret-sb',
    fontSize: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.purple,
    justifyContent: 'center',
    textAlign: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.purple,
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

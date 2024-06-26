import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { router, usePathname } from 'expo-router';
import Colors from '@/constants/Colors';
import CardsThreeIcon from 'assets/images/archiveIcon/CardsThree.svg';
import CalendarDotsIcon from 'assets/images/archiveIcon/CalendarDots.svg';
import SquaresFourIcon from 'assets/images/archiveIcon/SquaresFour.svg';

type ViewMode = 'monthly' | 'daily' | 'calendar' | 'archivegrid';

const RouteSwitcher = () => {
  const [activeView, setActiveView] = useState<ViewMode | null>(null);

  const pathname = usePathname();

  // active view 설정
  useEffect(() => {
    if (pathname.includes('/archive/calendar')) {
      setActiveView('calendar');
    } else if (pathname.includes('/archive/archivegrid')) {
      setActiveView('archivegrid');
    } else if (pathname.includes('/archive')) {
      setActiveView('monthly');
    } else {
      setActiveView(null);
    }
  }, [pathname]);

  // 아이콘 색상 설정
  const getIconColor = (viewMode: ViewMode) => {
    return activeView === viewMode ? Colors.white : Colors.bg_light;
  };

  // 만약 activeview상태이면 밑줄 생성
  const getUnderline = (viewMode: ViewMode) => {
    return activeView === viewMode ? styles.highlight : null;
  };

  const handleCalendarClick = () => {
    router.navigate('(main)/archive/calendar');
  };

  const handleArchiveClick = () => {
    router.navigate('(main)/archive/archivegrid');
  };

  const handleMonthClick = () => {
    router.navigate('(main)/archive');
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleMonthClick} style={styles.icon}>
          <CardsThreeIcon fill={getIconColor('monthly')} />
          <View style={getUnderline('monthly')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCalendarClick} style={styles.icon}>
          <CalendarDotsIcon fill={getIconColor('calendar')} />
          <View style={getUnderline('calendar')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleArchiveClick} style={styles.icon}>
          <SquaresFourIcon fill={getIconColor('archivegrid')} />
          <View style={getUnderline('archivegrid')} />
        </TouchableOpacity>
      </View>
      <View style={styles.underline} />
    </>
  );
};

export default RouteSwitcher;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
    paddingVertical: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  icon: {
    width: 90,
    alignItems: 'center',
  },
  underline: {
    height: 1,
    backgroundColor: Colors.bg_light,
  },
  highlight: {
    width: 90,
    marginTop: 8,
    height: 1,
    backgroundColor: Colors.white,
    zIndex: 2,
  },
});

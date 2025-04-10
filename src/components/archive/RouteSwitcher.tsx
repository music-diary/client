import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { router, usePathname } from 'expo-router';
import {
  CardsThreeSvg,
  CalendarDotsSvg,
  SquaresFourSvg,
} from 'assets/images/archive';
import { COLORS } from '@/constants';

type ViewMode = 'monthly' | 'daily' | 'calendar' | 'grid';

const RouteSwitcher = () => {
  const [activeView, setActiveView] = useState<ViewMode | null>(null);

  const pathname = usePathname();

  // active view 설정
  useEffect(() => {
    if (pathname.includes('/archive/calendar')) {
      setActiveView('calendar');
    } else if (pathname.includes('/archive/grid')) {
      setActiveView('grid');
    } else if (pathname.includes('/archive')) {
      setActiveView('monthly');
    } else {
      setActiveView(null);
    }
  }, [pathname]);

  // 아이콘 색상 설정
  const getIconColor = (viewMode: ViewMode) => {
    return activeView === viewMode ? COLORS.WHITE : COLORS.BG_LIGHT;
  };

  // 만약 active view상태이면 밑줄 생성
  const getUnderline = (viewMode: ViewMode) => {
    return activeView === viewMode ? styles.highlight : null;
  };

  const handleCalendarClick = () => {
    router.navigate('(main)/archive/calendar');
  };

  const handleArchiveClick = () => {
    router.navigate('(main)/archive/grid');
  };

  const handleMonthClick = () => {
    router.navigate('(main)/archive');
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleMonthClick} style={styles.icon}>
          <CardsThreeSvg fill={getIconColor('monthly')} />
          <View style={getUnderline('monthly')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCalendarClick} style={styles.icon}>
          <CalendarDotsSvg fill={getIconColor('calendar')} />
          <View style={getUnderline('calendar')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleArchiveClick} style={styles.icon}>
          <SquaresFourSvg fill={getIconColor('grid')} />
          <View style={getUnderline('grid')} />
        </TouchableOpacity>
      </View>
      <View style={styles.underline} />
    </>
  );
};

export default RouteSwitcher;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BLACK,
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
    backgroundColor: COLORS.BG_LIGHT,
  },
  highlight: {
    width: 90,
    marginTop: 8,
    height: 1,
    backgroundColor: COLORS.WHITE,
    zIndex: 2,
  },
});

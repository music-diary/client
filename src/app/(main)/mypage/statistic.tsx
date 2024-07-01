import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '@/constants';
import StaticRouter from '@/components/mypage/StatisticRouter';
import MonthlyStatistic from '@/components/mypage/MonthlyStatistic';
import YearlyStatistic from '@/components/mypage/YearlyStatistic';

type ViewMode = 'yearly' | 'monthly';

const StaticScreen = () => {
  const [activeView, setActiveView] = useState<ViewMode>('monthly');

  return (
    <>
      <StaticRouter activeView={activeView} setActiveView={setActiveView} />
      <ScrollView style={styles.container}>
        {activeView === 'monthly' ? <MonthlyStatistic /> : <YearlyStatistic />}
      </ScrollView>
    </>
  );
};

export default StaticScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
});

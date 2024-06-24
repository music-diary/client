import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import StaticRouter from '@/components/mypage/StatisticRouter';
import MontlyStatisticPage from '@/components/mypage/MontlyStatistic';
import YearlyStatisticPage from '@/components/mypage/YearlyStatistic';

type ViewMode = 'yearly' | 'monthly';

const Statistic = () => {
  const [activeView, setActiveView] = useState<ViewMode>('monthly');

  return (
    <>
      <StaticRouter activeView={activeView} setActiveView={setActiveView} />
      <ScrollView style={styles.container}>
        {activeView === 'monthly' ? (
          <MontlyStatisticPage />
        ) : (
          <YearlyStatisticPage />
        )}
      </ScrollView>
    </>
  );
};

export default Statistic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});

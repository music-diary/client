import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

type ViewMode = 'yearly' | 'monthly';

interface StaticRouterProps {
  activeView: ViewMode;
  setActiveView: (viewMode: ViewMode) => void;
}

const StaticRouter = ({ activeView, setActiveView }: StaticRouterProps) => {
  // 텍스트 색상 설정
  const getTextColor = (viewMode: ViewMode) => {
    return activeView === viewMode ? Colors.white : Colors.bg_light;
  };

  // 만약 activeView 상태이면 밑줄 생성
  const getUnderline = (viewMode: ViewMode) => {
    return activeView === viewMode ? styles.highlight : null;
  };

  const handleViewChange = (viewMode: ViewMode) => {
    setActiveView(viewMode);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => handleViewChange('monthly')}
          style={styles.textContainer}
        >
          <Text style={[styles.text, { color: getTextColor('monthly') }]}>
            월간
          </Text>
          <View style={getUnderline('monthly')} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleViewChange('yearly')}
          style={styles.textContainer}
        >
          <Text style={[styles.text, { color: getTextColor('yearly') }]}>
            년간
          </Text>
          <View style={getUnderline('yearly')} />
        </TouchableOpacity>
      </View>
      <View style={styles.underline} />
    </>
  );
};

export default StaticRouter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    paddingTop: 10,
    height: 38,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  textContainer: {
    width: 90,
    alignItems: 'center',
  },
  text: {
    ...Fonts.b1_sb,
  },
  underline: {
    height: 1,
    backgroundColor: Colors.bg_light,
  },
  highlight: {
    width: 140,
    marginTop: 9,
    height: 1,
    backgroundColor: Colors.white,
    zIndex: 2,
  },
});

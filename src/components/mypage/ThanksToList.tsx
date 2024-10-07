import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS, FONTS } from '@/constants';
import { colorWithOpacity } from '@/utils/color-utils';
import { ThanksStar } from 'assets/images/mypage';
import { thanksName } from '@/constants/data';

const height = Dimensions.get('window').height * 0.7;

const ThanksToList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.divider} />
        <Text style={styles.headerText}>Thanks To</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.bodyText}>
          뮤다를 후원해주신 분들에게 감사의 마음을 담아
        </Text>
      </View>
      <ScrollView>
        <View style={styles.body} onStartShouldSetResponder={() => true}>
          {/* thanksName을 한 줄로 나열 */}
          {thanksName.map((name, index) => (
            <View style={styles.nameItem} key={index}>
              <ThanksStar />
              <Text style={styles.nameText}>{name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ThanksToList;

const styles = StyleSheet.create({
  container: {
    height,
    gap: 20,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },
  body: {
    paddingLeft: 32,
    paddingRight: 48,
  },
  headerText: {
    color: COLORS.WHITE,
    ...FONTS.T1,
  },
  bodyText: {
    color: colorWithOpacity(COLORS.WHITE, 0.3),
    ...FONTS.BTN,
  },
  divider: {
    backgroundColor: 'rgba(235, 235, 245, 0.3)',
    height: 5,
    width: 36,
    borderRadius: 20,
  },
  nameItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 15, 
  },
  nameText: {
    color: COLORS.WHITE,
    ...FONTS.B1_SB,
  },
});

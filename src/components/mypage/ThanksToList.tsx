import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '@/constants';
import { colorWithOpacity } from '@/utils/color-utils';
import { ThanksStar } from 'assets/images/mypage';
import { thanksName } from '@/constants/data';
import { chunkArray } from '@/utils/text-utils';

const ThanksToList = () => {
  const chunkedNames = chunkArray(thanksName, 2);

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
      <View style={styles.body}>
        {chunkedNames.map((pair, index) => (
          <View style={styles.nameRow} key={index}>
            {pair.map((name, idx) => (
              <View style={styles.nameItem} key={idx}>
                <ThanksStar />
                <Text style={styles.nameText}>{name}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default ThanksToList;

const styles = StyleSheet.create({
  container: {
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
  nameRow: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  nameItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nameText: {
    color: COLORS.WHITE,
    ...FONTS.B1_SB,
  },
});

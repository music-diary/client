import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SelectorButton from '@/components/diary/SelectorButton';
import { COLORS, FONTS } from '@/constants';
import { type Mood } from '@/models/types';
import { type IEmotion } from '@/models/interfaces';

interface SelectorButtonGroupProps {
  description: string;
  moodName: Mood;
  emotions: IEmotion[];
}

const SelectorButtonGroup = ({
  description,
  moodName,
  emotions,
}: SelectorButtonGroupProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{description} 내 기분은</Text>
      <View style={styles.buttonContainer}>
        {emotions.map((emotion) => (
          <SelectorButton
            key={emotion.id}
            moodName={moodName}
            type={emotion.label}
            isSelected
            disabled
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  description: {
    color: COLORS.WHITE,
    ...FONTS.B2_SB,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});

export default SelectorButtonGroup;

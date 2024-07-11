import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { type ITemplateContent } from '@/models/interfaces';
import { FONTS, COLORS } from '@/constants';

interface TemplateContentProps {
  content: ITemplateContent[];
}

const TemplateContent = ({ content }: TemplateContentProps) => {
  return (
    <>
      <View style={styles.templateBorder} />
      {content
        .sort((a, b) => a.order - b.order)
        .map((item) => (
          <View key={item.id} style={styles.templateDescView}>
            <Text style={styles.templateName}>{item.name}</Text>
            <Text style={styles.templatePreviewInfo}>{item.label}</Text>
          </View>
        ))}
    </>
  );
};

export default TemplateContent;

const styles = StyleSheet.create({
  templateBorder: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.WHITE,
    opacity: 0.3,
  },
  templateDescView: {
    gap: 10,
  },
  templateName: {
    color: COLORS.WHITE,
    ...FONTS.B1_SB,
  },
  templatePreviewInfo: {
    color: COLORS.CONTENTS_LIGHT,
    ...FONTS.B2,
  },
});

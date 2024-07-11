import React from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import { type ITemplate } from '@/models/interfaces';
import { type Template } from '@/models/types';
import TemplateContent from './TemplateContent';

interface HiddenTemplateViewProps {
  templates: ITemplate[];
  contentRefs: React.MutableRefObject<{ [key in Template]?: View | null }>;
  onLayout: (type: Template) => (event: LayoutChangeEvent) => void;
}

const HiddenTemplateView = ({
  templates,
  contentRefs,
  onLayout,
}: HiddenTemplateViewProps) => {
  return (
    <View style={styles.hiddenContainer}>
      {templates.map((template, index) => (
        <View
          key={index}
          ref={(el) => (contentRefs.current[template.type] = el)}
          style={styles.templatePreviewContainer}
          onLayout={onLayout(template.type)}
        >
          <TemplateContent content={template.templateContents} />
        </View>
      ))}
    </View>
  );
};

export default HiddenTemplateView;

const styles = StyleSheet.create({
  hiddenContainer: {
    position: 'absolute',
    top: -9999,
    left: -9999,
  },
  templatePreviewContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    gap: 20,
  },
});

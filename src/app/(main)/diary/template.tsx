import { useRef, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import { COLORS, FONTS } from '@/constants';
import { type ITemplate } from '@/models/interfaces';
import { type Template } from '@/models/types';
import HiddenTemplateView from '@/components/diary/HiddenTemplateView';
import TemplateContent from '@/components/diary/TemplateContent';

const TemplateScreen = () => {
  const params = useLocalSearchParams();
  const templates = JSON.parse(params.templates as string) as ITemplate[];
  const contentRefs = useRef<{ [key in Template]?: View | null }>({});
  const [expanded, setExpanded] = useState<Template | null>(null);
  const [heights, setHeights] = useState<{ [key in Template]: number }>(
    {} as { [key in Template]: number },
  );

  const heightValues = templates.reduce<{
    [key in Template]: SharedValue<number>;
  }>(
    (acc, curr) => {
      acc[curr.type] = useSharedValue(0);
      return acc;
    },
    {} as { [key in Template]: SharedValue<number> },
  );

  const animatedStyles = (type: Template) =>
    useAnimatedStyle(() => {
      return {
        height: heightValues[type].value,
        overflow: 'hidden',
      };
    });

  const handlePreview = (template: ITemplate) => {
    const { type } = template;
    const isExpanded = expanded === type;

    setExpanded(isExpanded ? null : type);

    if (isExpanded) {
      // 현재 패널 닫기
      heightValues[type].value = withTiming(0, { duration: 300 });
    } else {
      // 다른 모든 패널 닫기
      Object.keys(heightValues).forEach((key) => {
        if (key !== type) {
          heightValues[key as Template].value = withTiming(0, {
            duration: 300,
          });
        }
      });

      const contentHeight = heights[type] || 0;
      heightValues[type].value = withTiming(contentHeight, { duration: 300 });
    }
  };

  const handleSetTemplate = (type: Template) => {
    router.navigate({
      pathname: '/diary/write',
      params: { ...params, type },
    });
  };

  const onLayout = (type: Template) => (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeights((prevHeights) => ({
      ...prevHeights,
      [type]: height + 20,
    }));
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>다양한 템플릿을 활용해보세요</Text>
          <View style={styles.descriptionContainer}>
            <AntDesign
              name="pluscircleo"
              size={16}
              color={COLORS.CONTENTS_LIGHT}
            />
            <Text style={styles.description}>버튼을 누르면 바로 적용돼요!</Text>
          </View>
        </View>

        <View style={styles.templateContainer}>
          {templates.map((template, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handlePreview(template)}
              style={[
                styles.templateView,
                index === 4 && { marginBottom: 100 },
              ]}
            >
              <View style={styles.templateInfoContainer}>
                <View style={styles.templateInfoView}>
                  <Text style={styles.templateName}>{template.name}</Text>
                  <Text style={styles.templateDescription}>
                    {template.description}
                  </Text>
                </View>
                <AntDesign
                  onPress={() => handleSetTemplate(template.type)}
                  name="pluscircleo"
                  size={16}
                  color={COLORS.WHITE}
                />
              </View>
              <Animated.View style={animatedStyles(template.type)}>
                <View style={styles.templatePreviewContainer}>
                  <TemplateContent content={template.templateContents} />
                </View>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <HiddenTemplateView
        templates={templates}
        contentRefs={contentRefs}
        onLayout={onLayout}
      />
    </>
  );
};

export default TemplateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  titleContainer: {
    gap: 8,
    marginBottom: 24,
  },
  title: {
    color: COLORS.WHITE,
    ...FONTS.T1,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  description: {
    color: COLORS.CONTENTS_LIGHT,
    ...FONTS.BTN,
  },
  templateContainer: {
    height: '100%',
    borderRadius: 10,
    gap: 20,
  },
  templateView: {
    paddingVertical: 20,
    paddingLeft: 12,
    paddingRight: 8,
    backgroundColor: COLORS.BOX,
    borderRadius: 10,
  },
  templateInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  templateInfoView: {
    gap: 8,
  },
  templateName: {
    color: COLORS.WHITE,
    ...FONTS.B1_SB,
  },
  templateDescription: {
    color: COLORS.WHITE,
    ...FONTS.B2,
  },
  templatePreviewContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    gap: 20,
  },
});

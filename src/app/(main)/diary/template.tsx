import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import { router, useLocalSearchParams } from 'expo-router';
import Fonts from '@/constants/Fonts';
import Colors from '@/constants/Colors';
import { type Template } from '@/models/types';
import { type ITemplate } from '@/models/interfaces';
import { templates } from '@/constants/data';

const TemplateScreen = () => {
  const params = useLocalSearchParams();

  // 동시에 열릴때 사용할 수 있는 방법
  // const [expanded, setExpanded] = useState<{ [key in TemplateType]?: boolean }>(
  //   {},
  // );
  // const handlePreview = (type: TemplateType) => {
  //   // 선택된 타입에 대한 상태를 토글합니다.
  //   setExpanded((prev: { [key in TemplateType]?: boolean }) => ({
  //     ...prev,
  //     [type]: !prev[type],
  //   }));
  //   // 선택된 타입에 대한 높이 값을 애니메이션합니다.
  //   heightValues[type].value = withTiming(expanded[type] ? 0 : 300, {
  //     duration: 300,
  //   });
  // };

  // 하나만 열릴때 사용할 수 있는 방법
  const [expanded, setExpanded] = useState<Template | null>(null);

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
    const { type, height } = template;
    const isExpanded = expanded === type;

    setExpanded(isExpanded ? null : type);

    if (isExpanded) {
      // Close the current panel
      heightValues[type].value = withTiming(0, { duration: 300 });
    } else {
      // Close all other panels
      Object.keys(heightValues).forEach((key) => {
        if (key !== type) {
          heightValues[key as Template].value = withTiming(0, {
            duration: 300,
          });
        }
      });
      // Open the selected panel
      // height는 나중에 높이를 계산해서 useRef로 수정해야함
      heightValues[type].value = withTiming(height, { duration: 300 });
    }
  };

  const handleSetTemplate = (type: Template) => {
    router.navigate({
      pathname: '/diary/write',
      params: { type, ...params },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>다양한 템플릿을 활용해보세요</Text>
        <View style={styles.descriptionContainer}>
          <AntDesign
            name="pluscircleo"
            size={16}
            color={Colors.contents_light}
          />
          <Text style={styles.description}>버튼을 누르면 바로 적용돼요!</Text>
        </View>
      </View>

      <View style={styles.templateContainer}>
        {templates.map((template, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePreview(template)}
            style={[styles.templateView, index === 4 && { marginBottom: 100 }]}
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
                color={Colors.white}
              />
            </View>
            {/* <View style={styles.templatePreviewContainer}>
              <View style={styles.templateBorder} />
              {Object.entries(template.preview).map(([key, value]) => (
                <View key={key} style={styles.templateDescView}>
                  <Text style={styles.templateName}>{key}</Text>
                  <Text style={styles.templatePreviewInfo}>{value}</Text>
                </View>
              ))}
            </View> */}
            <Animated.View style={animatedStyles(template.type)}>
              <View style={styles.templatePreviewContainer}>
                <View style={styles.templateBorder} />
                {Object.entries(template.preview).map(([key, value]) => (
                  <View key={key} style={styles.templateDescView}>
                    <Text style={styles.templateName}>{key}</Text>
                    <Text style={styles.templatePreviewInfo}>{value}</Text>
                  </View>
                ))}
              </View>
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default TemplateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.black,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  titleContainer: {
    gap: 8,
    marginBottom: 24,
  },
  title: {
    color: Colors.white,
    ...Fonts.t1,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  description: {
    color: Colors.contents_light,
    ...Fonts.btn,
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
    backgroundColor: Colors.box,
    borderRadius: 10,
    // flexDirection: 'co',
    // justifyContent: 'space-between',
  },
  templateInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  templateInfoView: {
    gap: 8,
  },
  templateName: {
    color: Colors.white,
    ...Fonts.b1_sb,
  },
  templateDescription: {
    color: Colors.white,
    ...Fonts.b2,
  },
  templatePreviewContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    gap: 20,
  },
  templateBorder: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.white,
    opacity: 0.3,
  },
  templateDescView: {
    gap: 10,
  },
  templatePreviewInfo: {
    color: Colors.contents_light,
    ...Fonts.b2,
  },
});

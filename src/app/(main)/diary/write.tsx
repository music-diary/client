import { useEffect, useRef, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import CustomAlertModal from '@/components/common/CustomAlertModal';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import CustomSplash from '@/components/common/CustomSplash';
import SelectorButton from '@/components/diary/SelectorButton';
import TopicButton from '@/components/diary/TopicButton';
import { COLORS, FONTS } from '@/constants';
import { type IEmotion, type ITopic } from '@/models/interfaces';
import { type Mood } from '@/models/types';
import { useModalStore } from '@/store/useModalStore';
import { useSplashStore } from '@/store/useSplashStore';
import GroupSvg from 'assets/images/splash/group-dot.svg';
import { useTemplates } from '@/api/hooks/useDiaries';

const WriteScreen = () => {
  const params = useLocalSearchParams();
  const { data: templates } = useTemplates();
  const { mood: m, emotions, detailedEmotions: de, topics, type } = params;

  const mood = JSON.parse(m as string);
  const emotionList: IEmotion[] = JSON.parse(emotions as string);
  const detailedEmotionList: IEmotion[] = JSON.parse(de as string);
  const topicList: ITopic[] = JSON.parse(topics as string);

  const { openSplash } = useSplashStore();
  const { closeModal } = useModalStore();
  const template = templates.find((t) => t.type === type);
  const scrollViewRef = useRef<ScrollView>(null);

  const [title, setTitle] = useState('');
  const [diaryContent, setDiaryContent] = useState('');
  const [templateContents, setTemplateContents] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        scrollViewRef.current?.scrollTo({
          y: e.endCoordinates.height,
          animated: true,
        });
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleTemplate = () => {
    router.push({
      pathname: '/diary/template',
      params: { ...params, templates: JSON.stringify(templates) },
    });
  };

  const handleDraft = () => {
    closeModal();
    openSplash('draft-save');
  };

  const handleMusicRecommendation = () => {
    // 저장 로직 태울 예정
    router.push('/diary/music');
  };

  const isButtonActive = () => {
    if (type && template) {
      return (
        title.length > 0 &&
        Object.values(templateContents).some((content) => content.length > 0)
      );
    } else {
      return title.length > 0 && diaryContent.length > 0;
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: COLORS.BLACK }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.container}
        >
          <View style={styles.subjectContainer}>
            <Text style={styles.title}>이제 오늘을 기록해 볼까요?</Text>
            {topicList.length > 0 && (
              <>
                <Text style={styles.description}>오늘 어떤 일이 있었냐면</Text>
                <View style={styles.buttonContainer}>
                  {topicList.map((topic) => (
                    <TopicButton
                      key={topic.id}
                      label={topic.label}
                      emoji={topic.emoji}
                      isSelected
                    />
                  ))}
                </View>
              </>
            )}
          </View>
          <View style={styles.emotionContainer}>
            <Text style={styles.description}>
              {topicList.length > 0 ? '그래서' : '오늘'} 내 기분은
            </Text>
            <View style={styles.buttonContainer}>
              <SelectorButton
                moodName={mood.name as Mood}
                type={mood.label}
                isSelected
              />
              {emotionList.map((emotion) => (
                <SelectorButton
                  key={emotion.id}
                  moodName={mood.name as Mood}
                  type={emotion.label}
                  isSelected
                />
              ))}
              {detailedEmotionList.map((emotion) => (
                <SelectorButton
                  key={emotion.id}
                  moodName={mood.name as Mood}
                  type={emotion.label}
                  isSelected
                />
              ))}
            </View>
          </View>
          <View
            style={[styles.inputContainer, { gap: type && template ? 20 : 16 }]}
          >
            {type && template ? (
              <>
                <TextInput
                  placeholder="일기제목"
                  style={[styles.inputTitle, { marginBottom: 0 }]}
                  placeholderTextColor={COLORS.CONTENTS_LIGHT}
                  value={title}
                  onChangeText={setTitle}
                />
                {template.templateContents
                  .sort((a, b) => a.order - b.order)
                  .map((content) => (
                    <View key={content.id}>
                      <Text style={styles.previewName}>{content.name}</Text>
                      <View style={styles.inputDiaryView}>
                        <TextInput
                          placeholder={content.label}
                          maxLength={200}
                          multiline
                          textAlignVertical="top"
                          style={[
                            styles.inputDiary,
                            { height: 150, marginBottom: 0 },
                          ]}
                          placeholderTextColor={COLORS.CONTENTS_LIGHT}
                          value={templateContents[content.name] || ''}
                          onChangeText={(text) =>
                            setTemplateContents((prev) => ({
                              ...prev,
                              [content.name]: text,
                            }))
                          }
                        />
                        <Text style={styles.inputDiaryCount}>0/200</Text>
                      </View>
                    </View>
                  ))}
              </>
            ) : (
              <>
                <TextInput
                  placeholder="일기제목"
                  style={styles.inputTitle}
                  placeholderTextColor={COLORS.CONTENTS_LIGHT}
                  value={title}
                  onChangeText={setTitle}
                />
                <View style={styles.inputDiaryView}>
                  <TextInput
                    placeholder="오늘 하루에 대해 적어보세요"
                    maxLength={500}
                    multiline
                    textAlignVertical="top"
                    style={styles.inputDiary}
                    placeholderTextColor={COLORS.CONTENTS_LIGHT}
                    value={diaryContent}
                    onChangeText={setDiaryContent}
                  />
                  <Text style={styles.inputDiaryCount}>0/500</Text>
                </View>
              </>
            )}

            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                일기를 어떻게 써야할지 모르겠나요?
              </Text>
              <TouchableOpacity onPress={handleTemplate}>
                <Text
                  style={[styles.infoText, { textDecorationLine: 'underline' }]}
                >
                  템플릿 사용하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomBottomButton
        isActive={isButtonActive()}
        onPress={handleMusicRecommendation}
        label="노래 추천받기"
      />
      <CustomAlertModal
        name="write-cancel"
        title="작성을 그만두시겠어요?"
        description="지금 그만두시면, 노래를 추천 받을 수 없어요."
        leftButtonText="일기 계속 작성하기"
        rightButtonText="임시저장하고 나가기"
        onLeftButtonPress={closeModal}
        onRightButtonPress={handleDraft}
      />
      <CustomSplash
        name="draft-save"
        description={`미처 마무리 짓지 못한 일기도\n언제든 다시 적어보세요`}
        toastMessage="임시저장 되었습니다"
        svg={GroupSvg}
        onClose={() => router.navigate('(main)')}
      />
    </>
  );
};

export default WriteScreen;

const styles = StyleSheet.create({
  container: {
    rowGap: 44,
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 150,
  },
  subjectContainer: {
    gap: 16,
  },
  emotionContainer: {
    gap: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  inputContainer: {
    minHeight: 300,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: COLORS.WHITE,
    ...FONTS.T1,
  },
  description: {
    color: COLORS.WHITE,
    ...FONTS.B2_SB,
  },
  infoText: {
    color: COLORS.CONTENTS_LIGHT,
    ...FONTS.BTN,
  },
  inputTitle: {
    padding: 10,
    color: COLORS.CONTENTS_LIGHT,
    backgroundColor: COLORS.BOX,
    borderRadius: 10,
    ...FONTS.B1_SB,
  },
  inputDiaryView: {
    flex: 1,
    color: COLORS.CONTENTS_LIGHT,
    gap: 10,
  },
  inputDiary: {
    flex: 1,
    paddingTop: 14,
    paddingBottom: 14,
    paddingHorizontal: 12,
    color: COLORS.CONTENTS_LIGHT,
    backgroundColor: COLORS.BOX,
    borderRadius: 10,
    ...FONTS.B2,
  },
  inputDiaryCount: {
    alignSelf: 'flex-end',
    color: COLORS.CONTENTS_LIGHT,
    ...FONTS.LB,
  },

  previewName: {
    color: COLORS.WHITE,
    ...FONTS.B2,
    marginBottom: 10,
  },
});

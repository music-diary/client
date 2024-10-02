import { useEffect, useRef, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import {
  Dimensions,
  InputAccessoryView,
  Keyboard,
  KeyboardAvoidingView,
  type NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  type TextInputFocusEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {
  useDeleteDiary,
  usePatchDiary,
  useTemplates,
} from '@/api/hooks/useDiaries';
import CustomAlertModal from '@/components/common/CustomAlertModal';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import CustomSplash from '@/components/common/CustomSplash';
import SelectorButtonGroup from '@/components/diary/SelectorButtonGroup';
import TopicButton from '@/components/diary/TopicButton';
import { COLORS, FONTS } from '@/constants';
import { type IEmotion, type ITopic } from '@/models/interfaces';
import { type Mood } from '@/models/types';
import { useModalStore } from '@/store/useModalStore';
import { createDiaryData } from '@/utils/diary-utils';
import GroupSvg from 'assets/images/splash/group-dot.svg';
import { trackEvent } from '@/utils/amplitude-utils';

const WriteScreen = () => {
  const params = useLocalSearchParams();
  const { data: templates } = useTemplates();

  const {
    mood: m,
    emotions,
    detailedEmotions: de,
    topics,
    type,
    diaryId,
  } = params;

  const scrollViewRef = useRef<ScrollView>(null);

  const mood = JSON.parse(m as string);
  const emotionList: IEmotion[] = JSON.parse(emotions as string);
  const detailedEmotionList: IEmotion[] = JSON.parse(de as string);
  const topicList: ITopic[] = JSON.parse(topics as string);

  const template = templates.find((t) => t.type === type);

  const [title, setTitle] = useState('');
  const [diaryContent, setDiaryContent] = useState('');
  const [charCount, setCharCount] = useState<Record<string, number>>({});

  const [templateContents, setTemplateContents] = useState<
    Record<string, string>
  >({});
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const { closeModal } = useModalStore();

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const { mutate: deleteDiary } = useDeleteDiary();
  const { mutate: patchDiary } = usePatchDiary({
    onSuccess: () => {
      router.push({
        pathname: '/diary/music',
        params: { diaryId, mood: mood.name },
      });
    },
    onError: () => {
      console.warn('Failed to patch diary');
    },
  });

  const handleTemplate = () => {
    router.push({
      pathname: '/diary/template',
      params: { ...params, templates: JSON.stringify(templates) },
    });
  };

  const handleMusicRecommendation = () => {
    const generatedDiaryData = createDiaryData({
      title,
      diaryContent,
      type: type as string,
      template,
      templateContents,
      topicList,
      emotions: [...emotionList, ...detailedEmotionList],
      status: 'EDIT',
    });
    trackEvent('Start Writing 3', { generatedDiaryData });
    patchDiary({ id: diaryId as string, payload: generatedDiaryData });
  };

  const handleTextChange = (name: string, text: string) => {
    setTemplateContents((prev) => ({
      ...prev,
      [name]: text,
    }));
    setCharCount((prev) => ({
      ...prev,
      [name]: text.length,
    }));
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

  const handleFocus = (
    event: NativeSyntheticEvent<TextInputFocusEventData>,
  ) => {
    if (!keyboardVisible) return; // 키보드가 올라와 있지 않으면 함수 실행 중단

    const scrollResponder = scrollViewRef.current?.getScrollResponder();
    const targetOffset = event.nativeEvent.target;
    const screenHeight = Dimensions.get('window').height; // 전체 스크린 높이

    const desiredTopMargin = screenHeight * 0.2; // 상단 여백을 전체 높이의 20%로 설정
    // 스크롤뷰가 포커스된 필드를 화면 상단으로 스크롤하도록 요청
    scrollResponder?.scrollResponderScrollNativeHandleToKeyboard(
      targetOffset,
      desiredTopMargin, // 원하는 상단 여백
      true,
    );
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
                      disabled
                    />
                  ))}
                </View>
              </>
            )}
          </View>
          <SelectorButtonGroup
            description={topicList.length > 0 ? '그래서' : '오늘'}
            moodName={mood.name as Mood}
            emotions={[mood, ...emotionList, ...detailedEmotionList]}
          />
          <View
            style={[styles.inputContainer, { gap: type && template ? 20 : 16 }]}
          >
            <TextInput
              placeholder="일기제목"
              style={styles.inputTitle}
              placeholderTextColor={COLORS.CONTENTS_LIGHT}
              value={title}
              onChangeText={setTitle}
              onFocus={handleFocus}
              inputAccessoryViewID={
                Platform.OS === 'ios' ? 'keyboard' : undefined
              }
            />
            {type && template ? (
              <>
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
                            handleTextChange(content.name, text)
                          }
                          onFocus={handleFocus}
                          inputAccessoryViewID={
                            Platform.OS === 'ios' ? 'keyboard' : undefined
                          }
                        />
                        <Text style={styles.inputDiaryCount}>
                          {charCount[content.name] || 0}/200
                        </Text>
                      </View>
                    </View>
                  ))}
              </>
            ) : (
              <>
                <View style={styles.inputDiaryView}>
                  <TextInput
                    placeholder="오늘 하루에 대해 적어보세요"
                    maxLength={500}
                    multiline
                    textAlignVertical="top"
                    style={styles.inputDiary}
                    placeholderTextColor={COLORS.CONTENTS_LIGHT}
                    value={diaryContent}
                    onChangeText={(text) => {
                      setDiaryContent(text);
                      setCharCount((prev) => ({
                        ...prev,
                        diaryContent: text.length,
                      }));
                    }}
                    onFocus={handleFocus}
                    inputAccessoryViewID={
                      Platform.OS === 'ios' ? 'keyboard' : undefined
                    }
                  />
                  <Text style={styles.inputDiaryCount}>
                    {charCount.diaryContent || 0}/500
                  </Text>
                </View>
              </>
            )}

            {Platform.OS === 'ios' && (
              <InputAccessoryView nativeID="keyboard">
                <TouchableOpacity
                  onPress={() => Keyboard.dismiss()}
                  style={{
                    backgroundColor: COLORS.WHITE,
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    alignItems: 'flex-end',
                  }}
                >
                  <Text style={{ color: COLORS.BLUE, ...FONTS.B1 }}>완료</Text>
                </TouchableOpacity>
              </InputAccessoryView>
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
        leftButtonText="그만두기"
        rightButtonText="일기 계속 작성하기"
        onLeftButtonPress={() => {
          closeModal();
          deleteDiary(diaryId as string);
          router.replace('/(main)');
        }}
        onRightButtonPress={closeModal}
      />
      <CustomSplash
        name="draft-save"
        description={`미처 마무리 짓지 못한 일기도\n언제든 다시 적어보세요`}
        toastMessage="임시저장 되었습니다"
        svg={GroupSvg}
        onClose={() => router.navigate('/(main)')}
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
    color: COLORS.WHITE,
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
    color: COLORS.WHITE,
    backgroundColor: COLORS.BOX,
    borderRadius: 10,
    ...FONTS.B2_LINE2,
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

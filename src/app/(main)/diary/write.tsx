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
import CustomSplash from '@/components/common/CustomSplash';
import SelectorButton from '@/components/diary/SelectorButton';
import TopicButton from '@/components/diary/TopicButton';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { templates } from '@/constants/data';
import { type ITopic } from '@/models/interfaces';
import { type Mood } from '@/models/types';
import { useModalStore } from '@/store/useModalStore';
import { useSplashStore } from '@/store/useSplashStore';
import GroupSvg from 'assets/images/splash/group_dot.svg';

const WriteScreen = () => {
  const params = useLocalSearchParams();
  const { mood, emotions, detailedEmotions, topics, type } = params;

  const emotionList: string[] = JSON.parse(emotions as string);
  const detailedEmotionList: string[] = JSON.parse(detailedEmotions as string);
  const topicList: ITopic[] = JSON.parse(topics as string);

  const { openSplash } = useSplashStore();
  const { closeModal } = useModalStore();
  const template = templates.find((t) => t.type === type);
  const scrollViewRef = useRef<ScrollView>(null);

  const [hh] = useState(true);

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
        // setKeyboardShow(false);
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleTemplate = () => {
    router.push({ pathname: '/diary/template', params });
  };

  const handleDraft = () => {
    // 0. 모달 닫기
    closeModal();
    // 1. 임시 저장
    // 2. 스플래시 화면 띄우기
    openSplash('draft-save');
  };

  const handleMusicRecommendation = () => {
    // 저장 로직 태울 예정
    router.push('/diary/music');
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: Colors.black }}
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
                  {topicList.map((topic, index) => (
                    <TopicButton
                      key={topic.id}
                      type={topic.name}
                      emoji={topic.emoji}
                      isSelected={true}
                    />
                  ))}
                </View>
              </>
            )}
          </View>
          <View style={styles.emotionContainer}>
            <Text style={styles.description}>그래서 내 기분은</Text>
            <View style={styles.buttonContainer}>
              {emotionList.map((value, index) => (
                <SelectorButton
                  key={value + index}
                  mood={mood as Mood}
                  type={value}
                  isSelected
                />
              ))}
              {detailedEmotionList.map((value, index) => (
                <SelectorButton
                  key={value + index}
                  mood={mood as Mood}
                  type={value}
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
                  placeholderTextColor={Colors.contents_light}
                />
                {Object.entries(template.preview).map(([key, value]) => (
                  <View key={key}>
                    <Text style={styles.previewName}>{key}</Text>
                    <View style={styles.inputDiaryView}>
                      <TextInput
                        placeholder={value}
                        maxLength={200}
                        multiline={true}
                        textAlignVertical="top"
                        style={[
                          styles.inputDiary,
                          { height: 150, marginBottom: 0 },
                        ]}
                        placeholderTextColor={Colors.contents_light}
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
                  placeholderTextColor={Colors.contents_light}
                />
                <View style={styles.inputDiaryView}>
                  <TextInput
                    placeholder="오늘 하루에 대해 적어보세요"
                    maxLength={500}
                    multiline={true}
                    textAlignVertical="top"
                    style={styles.inputDiary}
                    placeholderTextColor={Colors.contents_light}
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
      <TouchableOpacity
        style={[
          styles.nextButton,
          {
            backgroundColor: hh ? Colors.purple : Colors.contents_light,
            height: Platform.OS === 'android' ? 78 : 112,
          },
        ]}
        onPress={handleMusicRecommendation}
        disabled={!hh}
      >
        <Text style={styles.nextText}>노래 추천받기</Text>
      </TouchableOpacity>
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
    backgroundColor: Colors.black,
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
    color: Colors.white,
    ...Fonts.t1,
  },
  description: {
    color: Colors.white,
    ...Fonts.b2_sb,
  },
  infoText: {
    color: Colors.contents_light,
    ...Fonts.btn,
  },
  inputTitle: {
    padding: 10,
    color: Colors.contents_light,
    backgroundColor: Colors.box,
    borderRadius: 10,
    ...Fonts.b1_sb,
  },
  inputDiaryView: {
    flex: 1,
    color: Colors.contents_light,
    gap: 10,
  },
  inputDiary: {
    flex: 1,
    paddingTop: 14,
    paddingBottom: 14,
    paddingHorizontal: 12,
    color: Colors.contents_light,
    backgroundColor: Colors.box,
    borderRadius: 10,
    ...Fonts.b2,
  },
  inputDiaryCount: {
    alignSelf: 'flex-end',
    color: Colors.contents_light,
    ...Fonts.lb,
  },
  nextButton: {
    alignItems: 'center',
    height: 100,
    paddingTop: 28,
  },
  nextText: {
    color: Colors.white,
    ...Fonts.t1,
  },
  previewName: {
    color: Colors.white,
    ...Fonts.b2,
    marginBottom: 10,
  },
});

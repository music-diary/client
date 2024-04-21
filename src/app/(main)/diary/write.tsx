import { useEffect, useRef, useState } from 'react';
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
import CustomModal from '@/components/common/CustomModal';
import SelectorButton from '@/components/diary/SelectorButton';
import TopicButton from '@/components/diary/TopicButton';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

const WriteScreen = () => {
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
            <Text style={styles.description}>오늘 어떤 일이 있었냐면</Text>
            <TopicButton type="연애" emoji="💗" isSelected={true} />
          </View>
          <View style={styles.emotionContainer}>
            <Text style={styles.description}>그래서 내 기분은</Text>
            <View style={styles.buttonContainer}>
              <SelectorButton
                type="행복"
                isSelected={true}
                color={{ backgroundColor: Colors.yellow, opacity: 0.3 }}
              />
              <SelectorButton
                type="행복"
                isSelected={true}
                color={{ backgroundColor: Colors.yellow, opacity: 0.3 }}
              />
              <SelectorButton
                type="행복"
                isSelected={true}
                color={{ backgroundColor: Colors.yellow, opacity: 0.3 }}
              />
              <SelectorButton
                type="행복"
                isSelected={true}
                color={{ backgroundColor: Colors.yellow, opacity: 0.3 }}
              />
              <SelectorButton
                type="행복"
                isSelected={true}
                color={{ backgroundColor: Colors.yellow, opacity: 0.3 }}
              />
              <SelectorButton
                type="행복"
                isSelected={true}
                color={{ backgroundColor: Colors.yellow, opacity: 0.3 }}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="일기제목"
              style={styles.inputTitle}
              placeholderTextColor={Colors.contents_light}
            />
            <TextInput
              placeholder="오늘 하루에 대해 적어보세요"
              maxLength={500}
              multiline={true}
              textAlignVertical="top"
              style={styles.inputDiary}
              placeholderTextColor={Colors.contents_light}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                일기를 어떻게 써야할지 모르겠나요?
              </Text>
              <TouchableOpacity>
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
            height: Platform.OS === 'android' ? 78 : 100,
          },
        ]}
        onPress={() => {}}
        disabled={!hh}
      >
        <Text style={styles.nextText}>노래 추천받기</Text>
      </TouchableOpacity>
      <CustomModal
        name="write-cancel"
        title="작성을 그만두시겠어요?"
        description="일기 내용은 저장되지 않으며, 노래를 추천 받을 수 없어요."
        leftButtonText="일기 계속 작성하기"
        rightButtonText="그만쓰기"
        onLeftButtonPress={() => {}}
        onRightButtonPress={() => {}}
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
    marginBottom: 18,
    ...Fonts.b1_sb,
  },
  inputDiary: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    color: Colors.contents_light,
    backgroundColor: Colors.box,
    borderRadius: 10,
    marginBottom: 14,
    ...Fonts.b2,
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
});

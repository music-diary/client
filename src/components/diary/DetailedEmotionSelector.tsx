import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '@/constants/Colors';
import SelectorButton from './SelectorButton';

const detailedEmotionGroupList = {
  행복한: ['반가운', '즐거운', '신나는', '설레는', '발랄한', '아름다운'],
  기대하는: ['의욕적인', '뿌듯한', '희망찬', '설레는', '수줍은', '충만한'],
  감사한: [
    '감격스러운',
    '감동적인',
    '존중받는',
    '뭉클한',
    '든든한',
    '눈물나는',
  ],
  편안한: ['존중받는', '만족스러운', '차분한', '안정된', '느긋한', '나른한'],
  후련한: ['홀가분한', '통쾌한', '개운한'],
  추억하는: ['그리운', '애틋한', '아름다운', '아련한', '몽글몽글한', '소중한'],
  벅차오르는: [
    '꿈꾸는',
    '희망찬',
    '뭉클한',
    '눈물나는',
    '용기가득한',
    '황홀한',
  ],

  평범한: ['일상적인', '그저그런', '담담한', '단조로운'],
  무관심한: ['아무생각없는', '무미건조한', '멍때리는', '귀찮은'],
  고민되는: ['주저하는', '조심스러운', '망설이는', '이해가 안되는'],
  묘한: ['끌리는', '애매한', '이해가 안되는', '아리송한', '아련한', '쎄한'],
  신기한: ['호기심있는', '궁금한', '끌리는'],
  회상하는: ['뒤돌아보는', '아련한', '추억하는', '그리운', '아쉬운', '먹먹한'],

  불편한: [
    '불안한',
    '초조한',
    '긴장되는',
    '심란한',
    '부담스러운',
    '답답한',
    '찝찝한',
  ],
  미련남은: ['서운한', '엉망인', '질척거리는', '구질구질한'],
  부끄러운: ['쑥스러운', '민망한', '창피한', '수치스러운', '오글거리는'],
  황당한: ['어이없는', '당황스러운', '억울한', '실망스러운'],
  미안한: ['후회되는', '죄책감드는', '안타까운', '먹먹한'],
  슬픈: [
    '속상한',
    '서러운',
    '안타까운',
    '가슴 아픈',
    '눈물왈칵',
    '눈물질질',
    '미어지는',
  ],
  우울한: ['피곤한', '무기력한', '외로운', '공허한', '불안한', '힘빠지는'],
  화나는: ['극대노', '괴로운', '짜증나는', '비참한', '절망적인', '원망스러운'],
  혐오스러운: [
    '불쾌한',
    '역겨운',
    '토 나오는',
    '욕하고싶은',
    '한 대 치고 싶은',
    '징그러운',
  ],
  두려운: [
    '쎄한',
    '아찔한',
    '충격적인',
    '소름끼치는',
    '공포스러운',
    '정신이 아득한',
  ],
};

interface DetailedEmotionSelectorProps {
  mood: string;
  emotions: string[];
  state: string[];
  setState: React.Dispatch<React.SetStateAction<string[]>>;
}

const DetailedEmotionSelector = ({
  mood,
  emotions,
  state,
  setState,
}: DetailedEmotionSelectorProps) => {
  const emotionList1 =
    detailedEmotionGroupList[
      emotions[0] as keyof typeof detailedEmotionGroupList
    ];
  let emotionList2: string[] = [];

  if (emotions.length === 2) {
    emotionList2 =
      detailedEmotionGroupList[
        emotions[1] as keyof typeof detailedEmotionGroupList
      ];
  }

  const color = {
    happy: { backgroundColor: Colors.green, opacity: 0.3 },
    soso: { backgroundColor: Colors.purple, opacity: 0.3 },
    bad: { backgroundColor: Colors.blue, opacity: 0.3 },
  };

  useEffect(() => {
    setState([]); // mood가 바뀔 때 선택된 감정 초기화
  }, [emotions]);

  const setEmotion = (emotion: string) => {
    if (state.includes(emotion)) {
      setState(state.filter((e) => e !== emotion));
    } else if (state.length < 3) {
      setState([...state, emotion]);
    }
  };

  return (
    <View style={styles.container}>
      {emotionList1.map((emotion) => (
        <SelectorButton
          key={emotion}
          type={emotion}
          onPress={() => setEmotion(emotion)}
          isSelected={state.includes(emotion)}
          color={color[mood as keyof typeof color]}
        />
      ))}
      {emotions.length === 2 &&
        emotionList2.map((emotion) => (
          <SelectorButton
            key={emotion}
            type={emotion}
            onPress={() => setEmotion(emotion)}
            isSelected={state.includes(emotion)}
            color={color[mood as keyof typeof color]}
          />
        ))}
    </View>
  );
};

export default DetailedEmotionSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});

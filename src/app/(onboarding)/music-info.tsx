import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/onboarding/Header';
import MusicRecModal from '@/components/onboarding/MusicRecModal';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { useDimStore } from '@/store/useDimStore';

const musicList = [
  '발라드',
  '댄스',
  '랩/힙합',
  'R&B',
  '인디',
  '록/메탈',
  'POP',
  '뉴에이지',
  '포크/블루스',
  '일렉트로니카',
  'OST',
  '재즈',
  'J-pop',
];

const MusicInfoScreen = () => {
  const { toggleDim } = useDimStore();

  const [selectedMusic, setSelectedMusic] = useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setIsButtonDisabled(
      !(selectedMusic.length > 0 && selectedMusic.length < 4),
    );
  }, [selectedMusic]);

  const handleSelectMusic = (selectedMusicItem: string) => {
    if (selectedMusic.includes(selectedMusicItem)) {
      setSelectedMusic(
        selectedMusic.filter((music) => music !== selectedMusicItem),
      );
    } else {
      if (selectedMusic.length < 3) {
        setSelectedMusic([...selectedMusic, selectedMusicItem]);
      }
    }
  };

  const handleNext = () => {
    toggleDim();
    setModalVisible(true);
  };

  const handleFinish = (recommend: string) => {
    setModalVisible(false);
    router.push({ pathname: '/complete', params: { recommend } });
  };

  return (
    <>
      <SafeAreaView edges={['top']} style={styles.container}>
        <Header
          title="윤경 님의 음악 취향을 선택해주세요"
          description="최소 1개부터 최대 3개까지 가능해요"
        />

        <View style={styles.keyboardAvoidingContainer}>
          <View style={styles.musicListContainer}>
            {musicList.map((music) => {
              const isSelected = selectedMusic.includes(music);
              return (
                <TouchableOpacity
                  key={music}
                  onPress={() => handleSelectMusic(music)}
                  style={[
                    styles.musicButton,
                    isSelected ? styles.selectedMusicButton : null, // 조건부 스타일 적용
                  ]}
                >
                  <Text style={styles.musicType}>{music}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity
            style={[
              styles.verifyButton,
              {
                backgroundColor: isButtonDisabled
                  ? Colors.contents_light
                  : Colors.purple,
              },
            ]}
            onPress={handleNext}
            disabled={isButtonDisabled}
          >
            <Text style={styles.verifyText}>완료</Text>
          </TouchableOpacity>
        </View>

        <MusicRecModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </SafeAreaView>
      <SafeAreaView
        edges={['bottom']}
        style={{
          backgroundColor: isButtonDisabled
            ? Colors.contents_light
            : Colors.purple,
        }}
      />
    </>
  );
};

export default MusicInfoScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 28,
    backgroundColor: Colors.black,
    flex: 1,
  },
  keyboardAvoidingContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  verifyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: Colors.purple,
  },
  verifyText: {
    color: Colors.white,
    ...Fonts.t1,
  },

  musicButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.contents_light,
    borderWidth: 1,
    borderRadius: 38,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },

  musicType: {
    color: Colors.white,
    ...Fonts.b2_sb,
  },

  musicListContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
  },
  selectedMusicButton: {
    backgroundColor: Colors.purple,
    borderColor: Colors.purple,
  },
});

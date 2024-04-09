import { useState } from 'react';
import { router } from 'expo-router';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

const musicList = [
  '발라드',
  '힙합',
  '댄스',
  '팝',
  '재즈',
  'EDM',
  '랩',
  '인디',
  '일렉트로닉',
  '클래식',
  'OST',
  'R&B',
  '록',
  '트로트',
  '포크',
  '락',
  '뉴에이지',
];

const MusicInfoScreen = () => {
  const [selectedMusic, setSelectedMusic] = useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   setIsButtonDisabled(
  //     !(selectedMusic.length > 0 && selectedMusic.length < 4),
  //   );
  // }, [selectedMusic]);

  const handleSelectMusic = (selectedMusicItem: string) => {
    // 선택된 음악이 이미 목록에 있는지 확인
    if (selectedMusic.includes(selectedMusicItem)) {
      // 이미 있으면 제거
      setSelectedMusic(
        selectedMusic.filter((music) => music !== selectedMusicItem),
      );
    } else {
      // 새로 추가하기 전에 이미 3개가 선택되어 있는지 확인
      if (selectedMusic.length < 3) {
        // 3개 미만이면 추가
        setSelectedMusic([...selectedMusic, selectedMusicItem]);
      }
    }
  };

  const handleNext = () => {
    // 모달 오픈
    setModalVisible(true);
  };

  const handleFinish = (recommend: string) => {
    setModalVisible(false);

    // 완료 페이지로 이동
    router.push({ pathname: '/complete', params: { recommend } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.indicatorContainer}>
          <View style={styles.indicatorCircle}>
            <Text style={styles.indicatorNumber}>1</Text>
          </View>
          <View style={styles.indicatorLine} />
          <View style={styles.indicatorCircle}>
            <Text style={styles.indicatorNumber}>2</Text>
          </View>
        </View>
        <Text style={styles.infoTitle}>윤경 님의 음악 취향을 선택해주세요</Text>
        <Text style={styles.infoDescription}>
          최소 1개부터 최대 3개까지 가능해요
        </Text>
      </View>
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
              height: Platform.OS === 'android' ? 78 : 100,
            },
          ]}
          onPress={handleNext}
          disabled={isButtonDisabled}
        >
          <Text style={styles.verifyText}>완료</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" visible={modalVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalInfoContainer}>
                <Text style={styles.modalTitle}>
                  선택한 장르와 다른 느낌의 곡들도 추천할까요?
                </Text>
                <Text style={styles.modalDescription}>
                  언제든지 마이페이지에서 변경 가능해요.
                </Text>
              </View>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  onPress={() => handleFinish('N')}
                  style={styles.modalCancelButton}
                >
                  <Text style={styles.modalCancelText}>관심없어요</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleFinish('Y')}
                  style={styles.modalConfirmButton}
                >
                  <Text style={styles.modalConfirmText}>다양하게 추천받기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default MusicInfoScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 20,
    backgroundColor: Colors.black,
    flex: 1,
  },
  infoContainer: {
    display: 'flex',
    gap: 40,
    marginTop: 24,
    paddingHorizontal: 16,
  },
  infoTitle: {
    color: Colors.white,
    ...Fonts.t1,
  },
  infoDescription: {
    color: Colors.white,
    opacity: 0.7,
    ...Fonts.btn,
  },
  keyboardAvoidingContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  formContainer: {
    display: 'flex',
    gap: 30,
  },
  inputContainer: {
    display: 'flex',
    gap: 12,
    paddingHorizontal: 16,
  },
  inputLabel: {
    color: Colors.white,
    ...Fonts.b2_sb,
  },
  inputText: {
    color: Colors.white,
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    paddingBottom: 8,
    ...Fonts.b2_sb,
  },
  verifyButton: {
    alignItems: 'center',
    height: 100,
    paddingTop: 28,
  },
  verifyText: {
    color: Colors.white,
    ...Fonts.t1,
  },
  musicButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
    justifyContent: 'center',
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
  selectedGenderButton: {
    backgroundColor: Colors.purple,
    borderWidth: 0,
  },
  musicType: {
    color: Colors.white,
    ...Fonts.b2_sb,
  },
  selectedGenderType: {
    color: Colors.white,
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
  indicatorContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.purple,
    borderRadius: 50,
    width: 30,
    height: 30,
  },
  indicatorNumber: {
    color: Colors.white,
    ...Fonts.b2_sb,
  },
  indicatorLine: {
    backgroundColor: Colors.purple,
    height: 2,
    width: 45,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingVertical: 40,
    paddingHorizontal: 24,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    gap: 32,
  },
  modalInfoContainer: {
    display: 'flex',
    paddingHorizontal: 20,
    gap: 10,
  },
  modalTitle: {
    color: Colors.purple,
    ...Fonts.t1,
  },
  modalDescription: {
    color: Colors.contents_light,
    ...Fonts.btn,
  },
  modalButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 11,
  },
  modalCancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    flex: 1,
  },
  modalCancelText: {
    color: Colors.black,
    ...Fonts.b2,
  },
  modalConfirmButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: Colors.purple,
    borderRadius: 10,
    flex: 1,
  },
  modalConfirmText: {
    color: Colors.white,
    ...Fonts.b2,
  },
});

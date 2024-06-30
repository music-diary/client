import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Colors, Fonts } from '@/constants';
import { useDimStore } from '@/store/useDimStore';
import { colorWithOpacity } from '@/utils/color-utils';

interface GenreRecModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onPress: (recommend: boolean) => void;
}

const GenreRecModal = ({
  modalVisible,
  setModalVisible,
  onPress,
}: GenreRecModalProps) => {
  const { toggleDim } = useDimStore();

  const closeModel = () => {
    toggleDim();
    setModalVisible(false);
  };

  const handleGenreRec = (isGenreSuggested: boolean) => {
    onPress(isGenreSuggested);
  };

  return (
    <Modal animationType="slide" visible={modalVisible} transparent={true}>
      <TouchableWithoutFeedback onPress={closeModel}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>
                선택한 장르와 다른 느낌의 곡들도 추천할까요?
              </Text>
              <Text style={styles.description}>
                언제든지 마이페이지에서 변경 가능해요.
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => handleGenreRec(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>관심없어요</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleGenreRec(true)}
                style={styles.confirmButton}
              >
                <Text style={styles.confirmText}>다양하게 추천받기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default GenreRecModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: Colors.GREY3,
    paddingVertical: 36,
    paddingHorizontal: 22,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    gap: 32,
  },
  infoContainer: {
    display: 'flex',
    gap: 10,
  },
  title: {
    color: Colors.WHITE,
    ...Fonts.T1,
  },
  description: {
    color: colorWithOpacity(Colors.WHITE, 0.7),
    ...Fonts.B2_SB,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 11,
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: Colors.GREY1,
    borderRadius: 10,
    flex: 1,
  },
  cancelText: {
    color: Colors.GREY1,
    ...Fonts.B2,
  },
  confirmButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: Colors.PURPLE,
    borderRadius: 10,
    flex: 1,
  },
  confirmText: {
    color: Colors.WHITE,
    ...Fonts.B2,
  },
});

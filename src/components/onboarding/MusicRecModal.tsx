import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { useDimStore } from '@/store/useDimStore';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { colorWithOpacity } from '@/utils/colorUtils';

interface MusicRecModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MusicRecModal = ({
  modalVisible,
  setModalVisible,
}: MusicRecModalProps) => {
  const { toggleDim } = useDimStore();

  const closeModel = () => {
    toggleDim();
    setModalVisible(false);
  };

  const handleFinish = (recommend: string) => {
    closeModel();
    router.push({ pathname: '/complete', params: { recommend } });
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
                onPress={() => handleFinish('N')}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>관심없어요</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleFinish('Y')}
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

export default MusicRecModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: Colors.grey3,
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
    color: Colors.white,
    ...Fonts.t1,
  },
  description: {
    color: colorWithOpacity(Colors.white, 0.7),
    ...Fonts.b2_sb,
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
    borderColor: Colors.grey1,
    borderRadius: 10,
    flex: 1,
  },
  cancelText: {
    color: Colors.grey1,
    ...Fonts.b2,
  },
  confirmButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: Colors.purple,
    borderRadius: 10,
    flex: 1,
  },
  confirmText: {
    color: Colors.white,
    ...Fonts.b2,
  },
});

import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { useModalStore } from '@/store/useModalStore';
import { colorWithOpacity } from '@/utils/colorUtils';

// 우선 전부 옵셔널 프로퍼티로 설정 - 나중에 수정 예정
interface CustomModalProps {
  name?: string;
  title?: string;
  description?: string;
  leftButtonText?: string;
  rightButtonText?: string;
  onLeftButtonPress?: () => void;
  onRightButtonPress?: () => void;
}

const CustomModal = ({
  name,
  title,
  description,
  leftButtonText,
  rightButtonText,
  onLeftButtonPress,
  onRightButtonPress,
}: CustomModalProps) => {
  const { activeModal, closeModal } = useModalStore();

  return (
    <Modal
      animationType="fade"
      visible={activeModal === name}
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={onLeftButtonPress}
                style={styles.leftButton}
              >
                <Text style={styles.leftText}>{leftButtonText}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onRightButtonPress}
                style={styles.rightButton}
              >
                <Text style={styles.rightText}>{rightButtonText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colorWithOpacity(Colors.black, 0.7),
    paddingHorizontal: 28,
  },
  container: {
    display: 'flex',
    backgroundColor: Colors.box,
    padding: 22,
    width: '100%',
    borderRadius: 10,
    gap: 14,
  },
  infoContainer: {
    gap: 14,
  },
  title: {
    color: Colors.white,
    ...Fonts.b1_sb,
  },
  description: {
    color: Colors.white,
    ...Fonts.b2,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  leftButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.purple,
    paddingVertical: 10,
    flex: 1,
  },
  leftText: {
    color: Colors.purple,
    ...Fonts.b2,
  },
  rightButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.purple,
    borderRadius: 6,
    paddingVertical: 10,
    flex: 1,
  },
  rightText: {
    color: Colors.white,
    ...Fonts.b2,
  },
});

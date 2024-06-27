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

// 2줄 입력, 삭제에 따른 오른쪽 버튼 색깔은 옵셔널로 받음
interface CustomModalProps {
  name: string;
  title: string;
  description?: string;
  leftButtonText: string;
  rightButtonText: string;
  onLeftButtonPress: () => void;
  onRightButtonPress: () => void;
  isDelete?: boolean;
}

// 1줄만 입력시
const firstLinestyle = ({ title }: { title: string }) => {
  return (
    <View>
      <Text style={styles.middleText}>{title}</Text>
    </View>
  );
};
// 2줄 입력 시
const secondLinestyle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <View>
      <Text style={styles.b2Text}>{title}</Text>
      <Text style={styles.b2Text}>{description}</Text>
    </View>
  );
};

const CustomAlertModal = ({
  name,
  title,
  description,
  leftButtonText,
  rightButtonText,
  onLeftButtonPress,
  onRightButtonPress,
  isDelete,
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
            {description
              ? secondLinestyle({ title, description })
              : firstLinestyle({ title })}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={onLeftButtonPress}
                style={styles.leftButton}
              >
                <Text style={styles.leftText}>{leftButtonText}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onRightButtonPress}
                style={[
                  styles.rightButton,
                  isDelete
                    ? { backgroundColor: Colors.red }
                    : { backgroundColor: Colors.purple },
                ]}
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

export default CustomAlertModal;

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

  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  leftButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.grey1,
    paddingVertical: 10,
    flex: 1,
  },
  b2Text: {
    color: Colors.white,
    ...Fonts.b2_line2,
  },
  middleText: {
    textAlign: 'center',
    color: Colors.white,
    ...Fonts.b2,
  },
  leftText: {
    color: Colors.grey1,
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

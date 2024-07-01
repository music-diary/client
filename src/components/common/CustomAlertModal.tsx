import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { COLORS, FONTS } from '@/constants';
import { useModalStore } from '@/store/useModalStore';
import { colorWithOpacity } from '@/utils/color-utils';

// 2줄 입력, 삭제에 따른 오른쪽 버튼 색깔은 옵셔널로 받음
interface CustomAlertModalProps {
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
const firstLineStyle = ({ title }: { title: string }) => {
  return (
    <View>
      <Text style={styles.middleText}>{title}</Text>
    </View>
  );
};
// 2줄 입력 시
const secondLineStyle = ({
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
}: CustomAlertModalProps) => {
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
              ? secondLineStyle({ title, description })
              : firstLineStyle({ title })}
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
                    ? { backgroundColor: COLORS.RED }
                    : { backgroundColor: COLORS.PURPLE },
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
    backgroundColor: colorWithOpacity(COLORS.BLACK, 0.7),
    paddingHorizontal: 28,
  },
  container: {
    display: 'flex',
    backgroundColor: COLORS.BOX,
    paddingVertical: 18,
    paddingHorizontal: 20,
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
    borderColor: COLORS.GREY1,
    paddingVertical: 10,
    flex: 1,
  },
  b2Text: {
    color: COLORS.WHITE,
    ...FONTS.B2_LINE2,
  },
  middleText: {
    textAlign: 'center',
    color: COLORS.WHITE,
    marginBottom: 6,
    ...FONTS.B2,
  },
  leftText: {
    color: COLORS.GREY1,
    ...FONTS.B2,
  },
  rightButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PURPLE,
    borderRadius: 6,
    paddingVertical: 10,
    flex: 1,
  },
  rightText: {
    color: COLORS.WHITE,
    ...FONTS.B2,
  },
});

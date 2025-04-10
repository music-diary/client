import React, { useState, useEffect } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  type GestureResponderEvent,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '@/constants';
import { useDimStore } from '@/store/useDimStore';

interface BottomSheetModalProps {
  title: string;
  visible: boolean;
  onCancel?: () => void;
  onSave: () => void;
  children: React.ReactNode;
}

const CustomBottomSheetModal = ({
  title,
  visible,
  onCancel,
  onSave,
  children,
}: BottomSheetModalProps) => {
  const { isDim, toggleDim } = useDimStore();

  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  useEffect(() => {
    if (modalVisible && !isDim) {
      toggleDim();
    } else if (!modalVisible && isDim) {
      toggleDim();
    }
  }, [modalVisible]);

  const handleClose = () => {
    if (onCancel) {
      onCancel();
    }
    setModalVisible(false);
  };
  const handleSave = () => {
    onSave();
    setModalVisible(false);
  };
  const handleOuterPress = () => {
    if (modalVisible) {
      handleClose();
    }
  };
  const handleContentPress = (event: GestureResponderEvent) => {
    event.stopPropagation(); // 이벤트 전파 중지
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleOuterPress}>
        <SafeAreaProvider>
          <SafeAreaView edges={['top']} style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={handleContentPress}>
              <View style={styles.modalContent}>
                {title !== 'Thanks to' && (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleClose}>
                      <Text style={styles.buttonText}>취소</Text>
                    </TouchableOpacity>
                    <Text style={styles.titleText}>{title}</Text>
                    <TouchableOpacity onPress={handleSave}>
                      <Text style={styles.buttonText}>저장</Text>
                    </TouchableOpacity>
                  </View>
                )}
                <View style={styles.bodyContent}>{children}</View>
              </View>
            </TouchableWithoutFeedback>
          </SafeAreaView>
          <SafeAreaView
            edges={['bottom']}
            style={{ backgroundColor: COLORS.GREY3 }}
          />
        </SafeAreaProvider>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.GREY3,
    paddingTop: 20,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexGrow: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    // t1 수정해야함
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  buttonText: {
    color: COLORS.PURPLE,
    ...FONTS.B1_SB,
  },
  bodyContent: {},
});

export default CustomBottomSheetModal;

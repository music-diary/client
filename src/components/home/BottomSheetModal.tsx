import React, { useState, useEffect } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

interface BottomSheetModalProps {
  title: string;
  visible: boolean;
  onCancel?: () => void;
  onSave: () => void;
  children: React.ReactNode;
}

const BottomSheetModal = ({
  title,
  visible,
  onCancel,
  onSave,
  children,
}: BottomSheetModalProps) => {
  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

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

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleClose}>
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>
            <Text style={styles.titleText}>{title}</Text>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.buttonText}>저장</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bodyContent}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.black_alpha[50],
  },
  modalContent: {
    backgroundColor: Colors.grey3,
    paddingTop: 20,
    paddingBottom: 34, // safe area bottom 설정,
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
    color: Colors.white,
  },
  buttonText: {
    color: Colors.purple,
    ...Fonts.b1_sb,
  },
  bodyContent: {},
});

export default BottomSheetModal;

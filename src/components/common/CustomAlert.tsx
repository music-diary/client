import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

interface CustomAlertProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  firstLine: string;
  secondLine?: string;
  cancleMent: string;
  confirmMent: string;
}

const CustomAlert = ({
  isVisible,
  onConfirm,
  onCancel,
  firstLine: firstline,
  secondLine: secondline,
  cancleMent,
  confirmMent,
}: CustomAlertProps) => {
  // 1줄만 입력시
  const firstLinestyle = ({ firstline }: { firstline: string }) => {
    return (
      <>
        <Text style={styles.b2sbText}>{firstline}</Text>
      </>
    );
  };
  // 2줄 입력 시
  const secondLinestyle = ({
    firstline,
    secondline,
  }: {
    firstline: string;
    secondline: string;
  }) => {
    return (
      <>
        <Text style={styles.btnText}>{firstline}</Text>
        <View style={{ height: 4 }} />
        <Text style={styles.btnText}>{secondline}</Text>
      </>
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCancel}
      // fade효과로 수정하기 위해서는 아래 코드 추가
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={styles.modalContainer}>
        {secondline
          ? secondLinestyle({ firstline, secondline })
          : firstLinestyle({ firstline })}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.b2PurpleText}>{cancleMent}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.btnText}>{confirmMent}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.box,
    paddingTop: 26,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.box,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.purple,
  },
  confirmButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.purple,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  b2sbText: {
    color: Colors.white,
    ...Fonts.b2_sb,
    textAlign: 'center',
  },
  btnText: {
    color: Colors.white,
    ...Fonts.btn,
  },
  b2PurpleText: {
    color: Colors.purple,
    ...Fonts.btn,
  },
});

export default CustomAlert;

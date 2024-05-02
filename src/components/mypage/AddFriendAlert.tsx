import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import * as Clipboard from 'expo-clipboard';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

interface AddFriendAlertProps {
  isVisible: boolean; // 모달의 가시성 여부
  onConfirm: (nickname: string) => void; // 확인 버튼을 눌렀을 때 실행될 함수
  onCancel: () => void; // 취소 버튼을 눌렀을 때 실행될 함수
  myId: string; // 내 아이디
}

const AddFriendAlert = ({
  isVisible,
  onConfirm,
  onCancel,
  myId,
}: AddFriendAlertProps) => {
  const [nickname, setNickname] = useState('');
  const copyToClipboard = () => {
    Clipboard.setStringAsync(myId);
  };
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCancel}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={styles.modalContainer}>
        <Text style={styles.b2sbText}>아이디를 통해 친구를 추가해보세요</Text>
        <View style={styles.myIDContainer}>
          <View style={styles.myID}>
            <Text style={styles.b2GrayText}>{myId}</Text>
          </View>
          <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
            <Text style={styles.b2GrayText}>복사</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="아이디 입력"
            placeholderTextColor={Colors.contents_light}
            value={nickname}
            onChangeText={setNickname}
          />
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => onConfirm(nickname)} // 입력된 닉네임 전달
          >
            <Text style={styles.confirmText}>추가</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.box,
    padding: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 200,
  },
  myIDContainer: {
    marginTop: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myID: {
    flex: 1,
    borderColor: Colors.contents_light,
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 32,
    borderWidth: 1,
    borderRadius: 8,
  },
  InputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    height: 32,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderColor: Colors.purple,
    color: Colors.white,
  },
  copyButton: {
    width: 45,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.contents_light,
  },
  confirmButton: {
    width: 45,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.purple,
    borderRadius: 6,
  },
  b2sbText: {
    color: Colors.white,
    ...Fonts.b2_sb,
  },
  b2GrayText: {
    color: Colors.contents_light,
    ...Fonts.b2,
  },
  confirmText: {
    color: Colors.white,
    ...Fonts.b2,
  },
});

export default AddFriendAlert;

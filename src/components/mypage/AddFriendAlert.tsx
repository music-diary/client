// 추후 친구추가 기능 구현 시 사용할 모달 컴포넌트

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
// } from 'react-native';
// import * as Clipboard from 'expo-clipboard';
// import COLORS from '@/constants/COLORS';
// import FONTS from '@/constants/FONTS';

// interface AddFriendAlertProps {
//   isVisible: boolean; // 모달의 가시성 여부
//   onConfirm: (nickname: string) => void; // 확인 버튼을 눌렀을 때 실행될 함수
//   onCancel: () => void; // 취소 버튼을 눌렀을 때 실행될 함수
//   myId: string; // 내 아이디
// }

// const AddFriendAlert = ({
//   isVisible,
//   onConfirm,
//   onCancel,
//   myId,
// }: AddFriendAlertProps) => {
//   const [nickname, setNickname] = useState('');
//   const copyToClipboard = () => {
//     Clipboard.setStringAsync(myId);
//   };
//   return (
//     <Modal
//       isVisible={isVisible}
//       onBackdropPress={onCancel}
//       animationIn="fadeIn"
//       animationOut="fadeOut"
//     >
//       <View style={styles.modalContainer}>
//         <Text style={styles.b2sbText}>아이디를 통해 친구를 추가해보세요</Text>
//         <View style={styles.myIDContainer}>
//           <View style={styles.myID}>
//             <Text style={styles.b2GrayText}>{myId}</Text>
//           </View>
//           <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
//             <Text style={styles.b2GrayText}>복사</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.InputContainer}>
//           <TextInput
//             style={styles.textInput}
//             placeholder="아이디 입력"
//             placeholderTextColor={COLORS.contents_light}
//             value={nickname}
//             onChangeText={setNickname}
//           />
//           <TouchableOpacity
//             style={styles.confirmButton}
//             onPress={() => onConfirm(nickname)} // 입력된 닉네임 전달
//           >
//             <Text style={styles.confirmText}>추가</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     backgroundColor: COLORS.box,
//     padding: 30,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 200,
//   },
//   myIDContainer: {
//     marginTop: 20,
//     marginBottom: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   myID: {
//     flex: 1,
//     borderColor: COLORS.contents_light,
//     justifyContent: 'center',
//     paddingHorizontal: 10,
//     height: 32,
//     borderWidth: 1,
//     borderRadius: 8,
//   },
//   InputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 10,
//   },
//   textInput: {
//     flex: 1,
//     borderWidth: 1,
//     height: 32,
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     borderColor: COLORS.purple,
//     color: COLORS.white,
//   },
//   copyButton: {
//     width: 45,
//     height: 32,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginLeft: 10,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: COLORS.contents_light,
//   },
//   confirmButton: {
//     width: 45,
//     height: 32,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: COLORS.purple,
//     borderRadius: 6,
//   },
//   b2sbText: {
//     color: COLORS.white,
//     ...FONTS.b2_sb,
//   },
//   b2GrayText: {
//     color: COLORS.contents_light,
//     ...FONTS.b2,
//   },
//   confirmText: {
//     color: COLORS.white,
//     ...FONTS.b2,
//   },
// });

// export default AddFriendAlert;

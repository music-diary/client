// 추후 친구추가 기능 구현 시 사용할 컴포넌트

// import React, { useState } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { Feather } from '@expo/vector-icons';
// import COLORS from '@/constants/COLORS';
// import FONTS from '@/constants/FONTS';
// import CustomAlert from '@/components/common/CustomAlert';

// interface FriendInfoProps {
//   // 프로필 이미지, 이름
//   profileImage?: string;
//   profileName: string;
// }

// const FriendInfo = ({ profileImage, profileName }: FriendInfoProps) => {
//   const [isModalVisible, setModalVisible] = useState<boolean>(false);

//   const openModal = () => setModalVisible(true);
//   const closeModal = () => setModalVisible(false);

//   const handleConfirm = () => {
//     // 여기에 삭제 작업을 수행하는 코드를 추가하면 됨
//     closeModal();
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.friendInfo}>
//         {profileImage ? (
//           <View
//             style={[styles.profileImage, { backgroundColor: COLORS.purple }]}
//           />
//         ) : (
//           <View style={styles.profileImage} />
//         )}
//         <Text style={styles.name}>{profileName}</Text>
//       </View>
//       <TouchableOpacity onPress={openModal}>
//         <Feather name="minus-circle" size={20} color={COLORS.contents_light} />
//         <CustomAlert
//           isVisible={isModalVisible}
//           onConfirm={handleConfirm} // 확인 버튼 눌렀을 때 실행할 함수
//           onCancel={closeModal}
//           firstLine="정말로 삭제하시겠습니까?"
//           secondLine="삭제된 친구는 다시 추가가 불가능합니다."
//           cancelMent="취소할래요"
//           confirmMent="차단할래요"
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default FriendInfo;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   friendInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//   },
//   profileImage: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: COLORS.white,
//     marginRight: 10,
//   },
//   name: {
//     color: COLORS.white,
//     ...FONTS.b1_sb,
//   },
// });

// // 추후 친구 추가 서비스 도입 시 사용 가능한 페이지

// import { useState } from 'react';
// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import COLORS from '@/constants/COLORS';
// import FONTS from '@/constants/FONTS';
// import CustomToggle from '@/components/common/CustomToggle';
// // import FriendInfo from '@/components/mypage/FriendInfo';
// import AddFriendAlert from '@/components/mypage/AddFriendAlert';

// const myFriend = () => {
//   const [isToggled, setIsToggled] = useState(false);

//   const handleToggleChange = (state: boolean) => {
//     setIsToggled(state); // 토글 상태 업데이트
//   };

//   const [isAlertVisible, setAlertVisible] = useState(false);
//   const [friends, setFriends] = useState<string[]>([]);

//   const openAlert = () => setAlertVisible(true);
//   const closeAlert = () => setAlertVisible(false);

//   const handleAddFriend = (nickname: string) => {
//     if (nickname) {
//       setFriends([...friends, nickname]);
//     }
//     closeAlert();
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.profileContainer}>
//         <View style={styles.profile}>
//           <View style={styles.profileImage} />
//           <View style={{ paddingLeft: 10 }}>
//             <Text style={styles.profileName}>Miya</Text>
//             <View style={{ paddingVertical: 3 }} />
//             <Text style={styles.profileID}>@ID</Text>
//           </View>
//         </View>
//         <View style={styles.profileFriend}>
//           <Text style={styles.textB2}>내가 추가한 친구에게만 편지 받기</Text>
//           <CustomToggle
//             isToggled={isToggled}
//             onToggleChange={handleToggleChange}
//           />
//         </View>
//       </View>
//       <View style={styles.addFriend}>
//         <View style={styles.myFriend}>
//           <Text style={styles.textB1_sb}>내 친구</Text>
//           <Text style={styles.textB2_sb}>20명</Text>
//         </View>
//         <TouchableOpacity onPress={openAlert}>
//           <Text style={styles.addFriendText}>친구 추가하기</Text>
//           <AddFriendAlert
//             isVisible={isAlertVisible}
//             onConfirm={handleAddFriend}
//             onCancel={closeAlert}
//             myId="@id"
//           />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.friendList}>
//         <FriendInfo profileName="양세비" />
//         <FriendInfo profileName="김태건" />
//         <FriendInfo profileName="양세비" />
//         <FriendInfo profileName="김태건" />
//         <FriendInfo profileName="양세비" />
//         <FriendInfo profileName="김태건" />
//         <FriendInfo profileName="양세비" />
//         <FriendInfo profileName="김태건" />
//         <FriendInfo profileName="양세비" />
//         <FriendInfo profileName="김태건" />
//         <FriendInfo profileName="양세비" />
//         <FriendInfo profileName="김태건" />
//       </View>
//     </ScrollView>
//   );
// };

// export default myFriend;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.black,
//     paddingHorizontal: 16,
//     paddingTop: 26,
//   },
//   profileContainer: {
//     backgroundColor: COLORS.bg_light,
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 10,
//   },
//   profile: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   profileImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: COLORS.white,
//   },
//   profileName: {
//     color: COLORS.white,
//     fontFamily: 'pret-b',
//     fontSize: 18,
//   },
//   profileID: {
//     color: COLORS.contents_light,
//     ...FONTS.btn,
//   },
//   textB2: {
//     color: COLORS.white,
//     ...FONTS.b2,
//   },
//   profileFriend: {
//     paddingTop: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   addFriend: {
//     marginTop: 30,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   myFriend: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   textB1_sb: {
//     color: COLORS.white,
//     ...FONTS.b1_sb,
//   },
//   textB2_sb: {
//     color: COLORS.purple,
//     ...FONTS.b2_sb,
//     paddingLeft: 6,
//     marginTop: 2,
//   },
//   addFriendText: {
//     color: COLORS.white,
//     ...FONTS.btn,
//     textDecorationLine: 'underline',
//   },
//   friendList: {
//     flex: 1,
//     marginTop: 20,
//     gap: 8,
//     paddingBottom: 80,
//   },
// });

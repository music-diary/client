import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import CustomToggle from '@/components/common/CustomToggle';
import FriendInfo from '@/components/mypage/FriendInfo';
import AddFriendAlert from '@/components/mypage/AddFriendAlert';


// 추후 친구 추가 서비스 도입 시 사용 가능한 페이지
const myfriend = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggleChange = (state: boolean) => {
    setIsToggled(state); // 토글 상태 업데이트
  };

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [friends, setFriends] = useState<string[]>([]);

  const openAlert = () => setAlertVisible(true);
  const closeAlert = () => setAlertVisible(false);

  const handleAddFriend = (nickname: string) => {
    if (nickname) {
      setFriends([...friends, nickname]);
    }
    console.log(
      '🚀 ~ file: myfriend.tsx:33 ~ handleAddFriend ~ nickname:',
      nickname,
    );
    closeAlert();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profile}>
          <View style={styles.profileImage} />
          <View style={{ paddingLeft: 10 }}>
            <Text style={styles.profileName}>Miya</Text>
            <View style={{ paddingVertical: 3 }} />
            <Text style={styles.profileID}>@mshdo23y2</Text>
          </View>
        </View>
        <View style={styles.profilefriend}>
          <Text style={styles.textb2}>내가 추가한 친구에게만 편지 받기</Text>
          <CustomToggle
            isToggled={isToggled}
            onToggleChange={handleToggleChange}
          />
        </View>
      </View>
      <View style={styles.addfriend}>
        <View style={styles.myfriend}>
          <Text style={styles.textb1_sb}>내 친구</Text>
          <Text style={styles.textb2_sb}>20명</Text>
        </View>
        <TouchableOpacity onPress={openAlert}>
          <Text style={styles.addfriendText}>친구 추가하기</Text>
          <AddFriendAlert
            isVisible={isAlertVisible}
            onConfirm={handleAddFriend}
            onCancel={closeAlert}
            myId="mshdo23y2"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.friendList}>
        <FriendInfo profileName="양세비" />
        <FriendInfo profileName="김태건" />
        <FriendInfo profileName="양세비" />
        <FriendInfo profileName="김태건" />
        <FriendInfo profileName="양세비" />
        <FriendInfo profileName="김태건" />
        <FriendInfo profileName="양세비" />
        <FriendInfo profileName="김태건" />
        <FriendInfo profileName="양세비" />
        <FriendInfo profileName="김태건" />
        <FriendInfo profileName="양세비" />
        <FriendInfo profileName="김태건" />
      </View>
    </ScrollView>
  );
};

export default myfriend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: 16,
    paddingTop: 26,
  },
  profileContainer: {
    backgroundColor: Colors.bg_light,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.white,
  },
  profileName: {
    color: Colors.white,
    fontFamily: 'pret-b',
    fontSize: 18,
  },
  profileID: {
    color: Colors.contents_light,
    ...Fonts.btn,
  },
  textb2: {
    color: Colors.white,
    ...Fonts.b2,
  },
  profilefriend: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addfriend: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  myfriend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textb1_sb: {
    color: Colors.white,
    ...Fonts.b1_sb,
  },
  textb2_sb: {
    color: Colors.purple,
    ...Fonts.b2_sb,
    paddingLeft: 6,
    marginTop: 2,
  },
  addfriendText: {
    color: Colors.white,
    ...Fonts.btn,
    textDecorationLine: 'underline',
  },
  friendList: {
    flex: 1,
    marginTop: 20,
    gap: 8,
    paddingBottom: 80,
  },
});

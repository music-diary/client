import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

interface FriendInfoProps {
  // 프로필 이미지, 이름
  profileImage?: string;
  profileName: string;
}

const FriendInfo = ({ profileImage, profileName }: FriendInfoProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.friendInfo}>
        {profileImage ? (
          <View
            style={[styles.profileImage, { backgroundColor: Colors.purple }]}
          />
        ) : (
          <View style={styles.profileImage} />
        )}
        <Text style={styles.name}>{profileName}</Text>
      </View>
      <TouchableOpacity>
        <Feather name="minus-circle" size={20} color={Colors.contents_light} />
      </TouchableOpacity>
    </View>
  );
};

export default FriendInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.white,
    marginRight: 10,
  },
  name: {
    color: Colors.white,
    ...Fonts.b1_sb,
  },
});

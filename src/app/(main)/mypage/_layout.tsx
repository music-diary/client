import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import MypageHeaderTitle from '@/components/mypage/MypageHeaderTitle';
import Colors from '@/constants/Colors';
import CustomBackButton from '@/components/common/CustomBackButton';

export default function MypageLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.black,
        },
        headerTintColor: Colors.white,
        headerTitle: '',
        headerLeft: () => <MypageHeaderTitle title="마이페이지" />,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '마이페이지',
        }}
      />
      <Stack.Screen
        name="editprofile"
        options={{
          title: '프로필 수정',
          headerLeft: () => (
            <View style={styles.headerContainer}>
              <CustomBackButton />
              <MypageHeaderTitle title="프로필 수정" />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="myfriend"
        options={{
          title: '내 친구',
          headerLeft: () => (
            <View style={styles.headerContainer}>
              <CustomBackButton />
              <MypageHeaderTitle title="내 친구" />
            </View>
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

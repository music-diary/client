import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import HeaderTitle from '@/components/common/HeaderTitle';
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
        headerLeft: () => <HeaderTitle title="마이페이지" />,
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
              <HeaderTitle title="프로필 수정" />
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
              <HeaderTitle title="내 친구" />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="inquiry"
        options={{
          title: '문의사항',
          headerLeft: () => (
            <View style={styles.headerContainer}>
              <CustomBackButton />
              <HeaderTitle title="문의사항" />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="withdrawal"
        options={{
          title: '회원탈퇴',
          headerLeft: () => (
            <View style={styles.headerContainer}>
              <CustomBackButton />
              <HeaderTitle title="회원탈퇴" />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="statistic"
        options={{
          title: '루틴 분석',
          headerLeft: () => (
            <View style={styles.headerContainer}>
              <CustomBackButton />
              <HeaderTitle title="루틴 분석" />
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

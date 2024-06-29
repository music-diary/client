import { Stack } from 'expo-router';
import HeaderTitle from '@/components/common/HeaderTitle';
import CustomBackButton from '@/components/common/CustomBackButton';
import Colors from '@/constants/Colors';

export default function MypageLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.black,
        },
        headerTintColor: Colors.white,
        headerTitle: '',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '마이페이지',
          headerTitle: () => <HeaderTitle title="일기쓰기" />,
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          title: '프로필 수정',
          headerTitle: () => <HeaderTitle title="프로필 수정" />,
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Stack.Screen
        name="inquiry"
        options={{
          title: '문의사항',
          headerTitle: () => <HeaderTitle title="문의사항" />,
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Stack.Screen
        name="withdrawal"
        options={{
          title: '회원탈퇴',
          headerTitle: () => <HeaderTitle title="회원탈퇴" />,
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Stack.Screen
        name="statistic"
        options={{
          title: '루틴 분석',
          headerTitle: () => <HeaderTitle title="루틴 분석" />,
          headerLeft: () => <CustomBackButton />,
        }}
      />
    </Stack>
  );
}

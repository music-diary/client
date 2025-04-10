import { Stack } from 'expo-router';
import HeaderTitle from '@/components/common/HeaderTitle';
import CustomBackButton from '@/components/common/CustomBackButton';
import { COLORS } from '@/constants';

export default function MypageLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.BLACK,
        },
        headerTintColor: COLORS.WHITE,
        headerTitle: '',
        contentStyle: {
          backgroundColor: COLORS.BLACK,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '마이페이지',
          headerTitle: () => <HeaderTitle title="마이페이지" />,
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

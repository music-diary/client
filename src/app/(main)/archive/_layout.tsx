import { Stack } from 'expo-router';
import HeaderTitle from '@/components/common/HeaderTitle';
import CustomBackButton from '@/components/common/CustomBackButton';
import HeaderRightMore from '@/components/archive/HeaderRightMore';
import Colors from '@/constants/Colors';

export default function ArchiveLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.black,
        },
        headerTintColor: Colors.white,
        headerBackVisible: false,
        headerTitle: () => <HeaderTitle title="아카이브" />,
        animation: 'none',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '아카이브',
        }}
      />
      <Stack.Screen
        name="day/[day]"
        options={{
          title: '일별 아카이브',
          headerLeft: () => <CustomBackButton />,
          headerRight: () => <HeaderRightMore />,
          animation: 'default',
        }}
      />
    </Stack>
  );
}

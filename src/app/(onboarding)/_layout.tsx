import { Stack } from 'expo-router';
import LogoTitle from '@/components/onboarding/LogoTitle';
import Colors from '@/constants/Colors';
import CustomBackButton from '@/components/common/CustomBackButton';
import { useModalStore } from '@/store/useModalStore';

const LoginLayout = () => {
  const { openModal } = useModalStore();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.black,
        },
        headerTintColor: Colors.white,
        headerTitle: () => <LogoTitle />,
        headerLeft: () => <CustomBackButton />,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="phone-verify"
        options={{
          animation: 'fade',
          headerBackVisible: true,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="user-info"
        options={{
          animation: 'fade',
          headerLeft: () => (
            <CustomBackButton onPress={() => openModal('sign_up-cancel')} />
          ),
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="genre"
        options={{
          animation: 'fade',
          headerBackVisible: true,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="complete"
        options={{
          animation: 'fade',
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
};

export default LoginLayout;

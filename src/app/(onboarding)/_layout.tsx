import { Stack } from 'expo-router';
import LogoTitle from '@/components/onboarding/LogoTitle';
import { COLORS } from '@/constants';
import CustomBackButton from '@/components/common/CustomBackButton';
import { useModalStore } from '@/store/useModalStore';

const LoginLayout = () => {
  const { openModal } = useModalStore();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.BLACK,
        },
        headerTintColor: COLORS.WHITE,
        headerTitle: () => <LogoTitle />,
        headerLeft: () => <CustomBackButton />,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="index" options={{ header: () => null }} />
      <Stack.Screen name="phone-verify" />
      <Stack.Screen
        name="user-info"
        options={{
          headerLeft: () => (
            <CustomBackButton onPress={() => openModal('sign_up-cancel')} />
          ),
        }}
      />
      <Stack.Screen name="genre" />
      <Stack.Screen name="terms" />
      <Stack.Screen name="complete" />
    </Stack>
  );
};

export default LoginLayout;

import { Stack } from 'expo-router';
import LogoTitle from '@/components/onboarding/LogoTitle';
import Colors from '@/constants/Colors';

const LoginLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.black,
        },
        headerTintColor: Colors.white,
        headerTitle: () => <LogoTitle />,
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
          headerBackVisible: true,
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

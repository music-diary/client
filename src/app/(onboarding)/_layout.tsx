import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';
import LogoTitle from '@/components/login/LogoTitle';

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
        name="music-info"
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
        }}
      />
    </Stack>
  );
};

export default LoginLayout;

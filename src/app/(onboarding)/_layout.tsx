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
        headerTitle: '',
        headerLeft: () => <LogoTitle />,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="phone-verify"
        options={{
          headerBackVisible: true,
          animation: 'fade',
        }}
      />
      <Stack.Screen name="user-info" />
      <Stack.Screen
        name="music-info"
        options={{
          headerBackVisible: true,
          animation: 'fade',
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

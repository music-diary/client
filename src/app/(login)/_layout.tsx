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
        }}
      />
    </Stack>
  );
};

export default LoginLayout;

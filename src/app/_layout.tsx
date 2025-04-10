import React, { useEffect, useState } from 'react';
import * as amplitude from '@amplitude/analytics-react-native';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { trackEvent } from '@/utils/amplitude-utils';
import { useAppStore } from '@/store/useAppStore';
import { useColorScheme } from '@/hooks/useColorScheme';
import { COLORS } from '@/constants';
import DImOverlay from '@/components/common/DImOverlay';
const key = process.env.EXPO_PUBLIC_AMPLITUDE_KEY;

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(main)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'pret-r': require(`assets/fonts/Pretendard-Regular.otf`),
    'pret-m': require(`assets/fonts/Pretendard-Medium.otf`),
    'pret-sb': require(`assets/fonts/Pretendard-SemiBold.otf`),
    'pret-b': require(`assets/fonts/Pretendard-Bold.otf`),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [queryClient] = useState(() => new QueryClient());
  const { isFirstLaunch, isAuthenticated } = useAppStore();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (key) {
      amplitude.init(key);
    } else {
      console.warn('Amplitude key is missing');
    }
    if (isFirstLaunch) {
      trackEvent('Open App', { isFirstLaunch: true });
    } else {
      trackEvent('Open App', { isFirstLaunch: false });
    }
  }, []);

  useEffect(() => {
    queryClient.clear();
    if (!isAuthenticated) {
      router.replace('/(onboarding)');
    } else {
      router.replace('/(main)');
    }
  }, [isAuthenticated]);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
          >
            <Stack
              screenOptions={{
                animation: 'fade',
                contentStyle: { backgroundColor: COLORS.BLACK },
              }}
            >
              <Stack.Screen
                name="(onboarding)"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(tutorial)"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="(main)" options={{ headerShown: false }} />
            </Stack>
            <DImOverlay />
          </ThemeProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

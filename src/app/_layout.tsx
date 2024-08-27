import React, { useEffect, useState } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { useAppStore } from '@/store/useAppStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DImOverlay from '@/components/common/DImOverlay';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAppStore } from '@/store/useAppStore';
import { COLORS } from '@/constants';
// import { login } from '@/api/hooks/useAuth';

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

/**
 * FIXME:
 * useFont 정리
 * pret, pret-r, pret-b, pret-sb
 * 명칭 정리 필요.
 * pret-r -> pret 혹은 pret-r
 * pret -> pret-m
 */
export default function RootLayout() {
  const [loaded, error] = useFonts({
    pret: require(`assets/fonts/Pretendard-Medium.otf`),
    'pret-r': require(`assets/fonts/Pretendard-Regular.otf`),
    'pret-b': require(`assets/fonts/Pretendard-Bold.otf`),
    'pret-sb': require(`assets/fonts/Pretendard-SemiBold.otf`),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
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

  const { isAuthenticated } = useAppStore();

  const colorScheme = useColorScheme();

  useEffect(() => {
    // 임시 로그인 처리 (isAuthenticated가 true로 바뀜)
    // login();
    // logout();
    // if (isFirstLaunch) {
    //   router.navigate('intro');
    // }
    if (!isAuthenticated) {
      router.navigate('/(onboarding)');
    } else {
      router.navigate('/(main)/tutorial');
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
              <Stack.Screen name="(main)" options={{ headerShown: false }} />
              <Stack.Screen name="intro" options={{ headerShown: false }} />
              <Stack.Screen name="(modals)" options={{ headerShown: false }} />
            </Stack>
            <DImOverlay />
          </ThemeProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

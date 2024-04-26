import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, usePathname } from 'expo-router';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import {
  Foundation,
  Feather,
  FontAwesome6,
  Fontisto,
} from '@expo/vector-icons';
import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const path = usePathname();
  // 탭바 숨길 페이지 hide에 추가하면 됩니다..!
  const hide = path === '/mypage/myfriend' || path === '/mypage/editprofile';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.purple,
        tabBarActiveBackgroundColor: Colors.white,
        tabBarInactiveTintColor: Colors.white,
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: hide
          ? { display: 'none' }
          : { display: 'flex', ...styles.tabBarStyle },
        headerTransparent: true,

        tabBarBackground: () => (
          <BlurView tint="light" intensity={10} style={styles.absoluteFill} />
        ),
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="home"
        options={{
          title: '홈',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={21} color={color} />
          ),
          tabBarItemStyle: styles.item,
          tabBarLabelStyle: {
            fontFamily: 'pret-sb',
            fontSize: 10,
          },
        }}
      />
      <Tabs.Screen
        name="diary"
        options={{
          title: '일기쓰기',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="pen-nib" size={17} color={color} />
          ),
          tabBarStyle: { display: 'none' },
          tabBarItemStyle: styles.item,
          tabBarLabelStyle: {
            fontFamily: 'pret-sb',
            fontSize: 10,
          },
        }}
      />
      <Tabs.Screen
        name="archive"
        options={{
          title: '아카이브',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="archive" size={18} color={color} />
          ),
          tabBarItemStyle: styles.item,
          tabBarLabelStyle: {
            fontFamily: 'pret-sb',
            fontSize: 10,
          },
        }}
      />
      <Tabs.Screen
        name="letter"
        options={{
          title: '우편함',
          headerShown: false,
          // tabBarStyle: { display: "none" },  // 탭 바 숨기기
          tabBarIcon: ({ color }) => (
            <Fontisto name="email" size={22} color={color} />
          ),
          tabBarItemStyle: styles.item,
          tabBarLabelStyle: {
            fontFamily: 'pret-sb',
            fontSize: 10,
          },
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          title: '마이페이지',
          headerShown: false,

          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-o" size={18} color={color} />
          ),
          tabBarItemStyle: styles.item,
          tabBarLabelStyle: {
            fontFamily: 'pret-sb',
            fontSize: 10,
          },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'absolute',
    marginBottom: 34,
    paddingBottom: 8,
    paddingTop: 8,
    paddingHorizontal: 9,
    height: 60,
    marginHorizontal: 16,
    borderRadius: 43,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    backgroundColor: 'rgba(29, 29, 29, 0.2)',
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 58,
    borderRadius: 43,
    overflow: 'hidden',
  },
  item: {
    borderRadius: 46,
    paddingBottom: 4,
  },
});

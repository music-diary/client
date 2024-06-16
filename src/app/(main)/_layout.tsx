import { Tabs, usePathname } from 'expo-router';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Foundation, Feather, FontAwesome6 } from '@expo/vector-icons';
import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';
import Colors from '@/constants/Colors';
import TempBottomBar from 'assets/images/BottombarIcon';

const ratio = 435 / 375;
const currentWidth = Dimensions.get('window').width * ratio;
const currentheight = (137 / 435) * currentWidth;

export default function TabLayout() {
  console.log('currentWidth', currentWidth);
  const path = usePathname();
  // 탭바 숨길 페이지 hide에 추가하면 됩니다..!
  const hide =
    path === '/mypage/myfriend' ||
    path === '/mypage/editprofile' ||
    path === '/mypage/inquiry' ||
    path === '/mypage/withdrawal';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.purple,
        tabBarInactiveTintColor: Colors.white,
        headerShown: useClientOnlyValue(false, true),
        tabBarShowLabel: false,
        tabBarStyle: hide
          ? { display: 'none' }
          : { display: 'flex', ...styles.tabBarStyle },
        headerTransparent: true,

        tabBarBackground: () => (
          <View style={styles.layout}>
            <TempBottomBar
              color={Colors.grey3}
              width={currentWidth}
              height={currentheight}
            />
          </View>
        ),
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="home"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={21} color={color} />
          ),
          tabBarItemStyle: styles.item,
        }}
      />
      <Tabs.Screen
        name="diary"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="pen-nib" size={17} color={color} />
          ),
          tabBarStyle: { display: 'none' },
          tabBarItemStyle: styles.middleitem,
        }}
      />
      <Tabs.Screen
        name="archive"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="archive" size={18} color={color} />
          ),
          tabBarItemStyle: styles.rightitem,
        }}
      />
      <Tabs.Screen
        name="letter"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    height: 103,
    marginBottom: -34,
    borderTopWidth: 0,
    paddingVertical: 0,
    zIndex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },

  layout: {
    // 중앙정렬
    alignItems: 'center',
    bottom: 34,
    // shadow 설정
    shadowColor: Colors.black,
    shadowOpacity: 0.9,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  item: {
    paddingRight: 50,
    paddingBottom: 20,
  },
  middleitem: {
    backgroundColor: Colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -17,
    left: '50%',
    marginLeft: -30,
    height: 60,
    width: 60,
    borderRadius: 46,
    marginTop: -13,
    zIndex: 1,
    overflow: 'visible',
  },

  rightitem: {
    paddingLeft: 50,
    paddingBottom: 20,
  },
});

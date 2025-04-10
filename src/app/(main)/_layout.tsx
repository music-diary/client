import { useCallback } from 'react';
import { router, Tabs, useFocusEffect, usePathname } from 'expo-router';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Foundation, Feather, FontAwesome6 } from '@expo/vector-icons';
import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';
import { COLORS } from '@/constants';
import BottomBarIcon from '@/components/common/BottomBarIcon';
import { useDiaryArchive } from '@/api/hooks/useArchive';
import { formatKST } from '@/utils/date-utils';
import useDiaryStore from '@/store/useDiaryStore';

const ratio = 435 / 375;
const currentWidth = Dimensions.get('window').width * ratio;
const currentHeight = (137 / 435) * currentWidth;

export default function TabLayout() {
  const path = usePathname();
  // 탭바 숨길 페이지 hide에 추가하면 됩니다..!
  const hide =
    path === '/mypage/edit' ||
    path === '/mypage/inquiry' ||
    path === '/mypage/withdrawal' ||
    path === '/mypage/statistic' ||
    path === '/home/diary-limit';

  const today = new Date();
  const { hasDiaryForToday, setHasDiaryForToday } = useDiaryStore();

  const { data, isLoading, isError } = useDiaryArchive(
    formatKST(today),
    formatKST(today),
  );

  useFocusEffect(
    useCallback(() => {
      if (!isLoading && !isError && data) {
        setHasDiaryForToday(data.length > 0);
      }
    }, [data, isLoading, isError, setHasDiaryForToday]),
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.PURPLE,
        tabBarInactiveTintColor: COLORS.WHITE,
        headerShown: useClientOnlyValue(false, true),
        tabBarShowLabel: false,
        tabBarStyle: hide
          ? { display: 'none' }
          : { display: 'flex', ...styles.tabBarStyle },
        headerTransparent: true,

        tabBarBackground: () => (
          <View style={styles.layout}>
            <BottomBarIcon
              color={COLORS.GREY3}
              width={currentWidth}
              height={currentHeight}
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
          tabBarItemStyle: styles.middleItem,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            if (hasDiaryForToday) {
              router.navigate({ pathname: '/(main)/home/diary-limit' });
            } else {
              navigation.navigate('diary', {
                screen: 'index',
                params: { stateInit: true },
              });
            }
          },
        })}
      />
      <Tabs.Screen
        name="archive"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="archive" size={18} color={color} />
          ),
          tabBarItemStyle: styles.rightItem,
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
          title: '',
          headerShown: false,
          tabBarItemStyle: { display: 'none' },
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
    shadowColor: COLORS.BLACK,
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
  middleItem: {
    backgroundColor: COLORS.PURPLE,
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

  rightItem: {
    paddingLeft: 50,
    paddingBottom: 20,
  },
});

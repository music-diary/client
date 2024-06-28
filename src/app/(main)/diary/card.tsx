import React, { useCallback, useState } from 'react';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { router, useFocusEffect, useNavigation } from 'expo-router';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DailyDiaryCard from '@/components/archive/DailyDiaryCard';
import CustomAlertModal from '@/components/common/CustomAlertModal';
import CustomSplash from '@/components/common/CustomSplash';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import dummy_archive_day from '@/data/dummy_archive_day.json';
import { useModalStore } from '@/store/useModalStore';
import { useSplashStore } from '@/store/useSplashStore';
import useToastStore from '@/store/useToastStore';
import {
  ArchiveCheerSvg,
  ArchiveIdeaSvg,
  ArchiveSaveSvg,
} from 'assets/images/splash';
import { type DailyDiaryData } from '../archive/day/[day]';

const splashOptions = [
  {
    svg: ArchiveCheerSvg,
    description: '당신의 하루를 뮤다가 응원해요',
  },
  {
    svg: ArchiveSaveSvg,
    description: '오늘의 ost가 뮤다에 소중히 담겼어요',
  },
  {
    svg: ArchiveIdeaSvg,
    description: '이 노래가 떠오를 때 언제든지 놀러오세요',
  },
];

const CardScreen = () => {
  const { openModal, closeModal } = useModalStore();
  const dailyDiaryData: DailyDiaryData[] = dummy_archive_day;
  const showToast = useToastStore((state) => state.showToast);
  const [isFirstDiary, setIsFirstDiary] = useState(true);
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { openSplash } = useSplashStore();

  const handleNoPushNotification = () => {
    closeModal();
    return router.replace('/(main)/archive/archivegrid');
  };

  const handlePushNotification = () => {
    // 알림 시간 설정 오픈
    closeModal();
    setShowPicker(true);
  };

  const onChange = (_: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setTempDate(date);
    }
  };

  const cancelDateSelection = () => {
    setSelectedDate(new Date());
    setShowPicker(false);
    return router.replace('/(main)/archive/archivegrid');
  };

  const confirmDateSelection = () => {
    setSelectedDate(tempDate);
    setShowPicker(false);

    // 일기 푸시 알림 설정 로직 작성 예정

    showToast('일기 알림이 설정되었습니다', 2000, () =>
      router.replace('/(main)/archive/archivegrid'),
    );
  };

  // 스택 히스토리 확인용
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      const state = navigation.getState();
      console.log('Current Navigation State:', state);
    }, []),
  );

  const randomIndex = Math.floor(Math.random() * splashOptions.length);
  const { svg, description } = splashOptions[randomIndex];

  const handleSave = () => {
    // 아카이브 저장
    // 첫번째 일기 작성시 푸시 알림 설정
    if (isFirstDiary) {
      openModal('push-notification');
    }
    // 스플래시 오픈
    openSplash('archive-save');
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: Colors.black }}>
        <ScrollView style={styles.container}>
          <Text style={styles.b1LightText}>3월 2일</Text>
          <View style={styles.cardContainer}>
            <DailyDiaryCard {...dailyDiaryData[0]} />
          </View>
        </ScrollView>

        {showPicker ? (
          <View style={styles.pickerContainer}>
            <View style={styles.pickerHeader}>
              <TouchableOpacity onPress={cancelDateSelection}>
                <Text style={styles.btnText}>취소</Text>
              </TouchableOpacity>
              <Text style={styles.pickerTitle}>일기 알림</Text>
              <TouchableOpacity onPress={confirmDateSelection}>
                <Text style={styles.btnText}>저장</Text>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              value={tempDate}
              mode="time"
              display="spinner"
              onChange={onChange}
              textColor={Colors.white}
            />
          </View>
        ) : (
          <TouchableOpacity
            style={[
              styles.nextButton,
              {
                backgroundColor: Colors.purple,
                height: Platform.OS === 'android' ? 78 : 112,
              },
            ]}
            onPress={handleSave}
          >
            <Text style={styles.nextText}>아카이브에 저장</Text>
          </TouchableOpacity>
        )}
        <CustomAlertModal
          name="push-notification"
          title="매일 일기 쓰는 시간에 맞춰 알려드릴까요?"
          leftButtonText="괜찮아요"
          rightButtonText="네, 알려주세요"
          onLeftButtonPress={handleNoPushNotification}
          onRightButtonPress={handlePushNotification}
        />
      </View>
      <CustomSplash
        name="archive-save"
        description={description}
        toastMessage="아카이브에 저장되었습니다"
        svg={svg}
        onClose={() => router.replace('/(main)/archive')}
      />
    </>
  );
};

export default CardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.black,
  },
  b1LightText: {
    paddingTop: 20,
    color: Colors.contents_light,
    ...Fonts.b1,
  },
  cardContainer: {
    marginTop: 10,
    marginBottom: 130,
  },
  nextButton: {
    alignItems: 'center',
    height: 100,
    paddingTop: 28,
  },
  nextText: {
    color: Colors.white,
    ...Fonts.t1,
  },
  // DatePicker
  pickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 50,
    borderRadius: 10,
    backgroundColor: Colors.grey3,
  },
  pickerHeader: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  pickerTitle: {
    color: Colors.white,
    ...Fonts.t1,
  },
  btnText: {
    color: Colors.purple,
    ...Fonts.b1_sb,
  },
});

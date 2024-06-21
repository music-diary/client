import React, { useCallback, useEffect, useState } from 'react';
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
import CustomModal from '@/components/common/CustomModal';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import dummy_archive_day from '@/data/dummy_archive_day.json';
import { useModalStore } from '@/store/useModalStore';
import useToastStore from '@/store/useToastStore';
import { type DailyDiaryData } from '../archive/day/[day]';

const CardScreen = () => {
  const { openModal, closeModal } = useModalStore();
  const dailyDiaryData: DailyDiaryData[] = dummy_archive_day;
  const showToast = useToastStore((state) => state.showToast);
  const [isFirstDiary, setIsFirstDiary] = useState(true);
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleSave = () => {
    console.log('아카이브에 저장');
    // 저장하는 후 토스트
    showToast('아카이브에 저장되었습니다', 2000, () => {
      // 토스트가 닫힌 후 최초 일기 작성시 일기 알림 팝업
      if (isFirstDiary) {
        return openModal('push-notification');
      }
      // 월별 아카이브로 이동
      return router.replace('/(main)/archive/archivegrid');
    });
  };

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

  return (
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
      <CustomModal
        name="push-notification"
        title="매일 일기 쓰는 시간에 맞춰 알려드릴까요?"
        description=""
        leftButtonText="괜찮아요"
        rightButtonText="네, 알려주세요"
        onLeftButtonPress={handleNoPushNotification}
        onRightButtonPress={handlePushNotification}
      />
    </View>
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

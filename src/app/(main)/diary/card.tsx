import React, { useEffect, useRef, useState } from 'react';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  useAllDiaries,
  useDeleteDiary,
  usePatchDiary,
} from '@/api/hooks/useDiaries';
import { useGetUserInfo, usePatchUser } from '@/api/hooks/useUsers';
import DailyDiaryCard from '@/components/archive/DailyDiaryCard';
import CustomAlertModal from '@/components/common/CustomAlertModal';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import CustomBottomSheetModal from '@/components/common/CustomBottomSheetModal';
import CustomSplash from '@/components/common/CustomSplash';
import CustomToast from '@/components/common/CustomToast';
import HeaderRight from '@/components/diary/HeaderRight';
import { COLORS } from '@/constants';
import { splashOptions } from '@/constants/data';
import { type UserPayloadSchema } from '@/models/schemas';
import { type SplashKey } from '@/models/types';
import { useModalStore } from '@/store/useModalStore';
import { useSplashStore } from '@/store/useSplashStore';
import useToastStore from '@/store/useToastStore';
import { convertToTimeString } from '@/utils/date-utils';
import { handleSaveToGallery } from '@/utils/image-utils';
import { scheduleNotification } from '@/utils/push-notifications';
import { trackEvent } from '@/utils/amplitude-utils';

const CardScreen = () => {
  const { diaryId } = useLocalSearchParams(); // URL에서 diaryData 가져오기

  const navigation = useNavigation();
  const cardRef = useRef<View>(null);

  const { data: userInfo } = useGetUserInfo();

  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [splashKey, setSplashKey] = useState<SplashKey>('cheer');
  const [splashConfig, setSplashConfig] = useState(splashOptions[splashKey]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isDeletedDiary, setIsDeletedDiary] = useState(false);

  const { showToast } = useToastStore();
  const { openModal, closeModal } = useModalStore();
  const { openSplash, closeSplash } = useSplashStore();

  const queryClient = useQueryClient();

  const { data: allDiaries } = useAllDiaries('DONE');
  const { mutate: patchUser } = usePatchUser();
  const { mutate: deleteDiary } = useDeleteDiary();
  const { mutate: patchDiary } = usePatchDiary({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archive'] });
      router.push({ pathname: '/(main)/archive' });
    },
    onError: () => {
      console.warn('Failed to patch diary');
    },
  });

  useEffect(() => {
    setSplashConfig(splashOptions[splashKey] || splashOptions.cheer);
  }, [splashKey]);

  const handleSave = () => {
    trackEvent('Start Writing 5');
    if (allDiaries.length === 0) {
      openModal('push-notification');
    } else {
      const randomKey = getRandomSplashKey(['cheer', 'save', 'idea']);
      setSplashKey(randomKey);
      openSplash('archive-save');
    }
  };

  const handlePushNotification = (answer: boolean) => {
    if (answer) {
      setTimeout(() => setShowPicker(true), 200); // 모달이 닫힌 후 200ms 후에 피커를 엽니다.
    } else {
      setSplashKey('idea');
      openSplash('archive-save');
    }
    closeModal();
  };

  const handleCloseSplash = () => {
    closeModal();
    closeSplash();
    setShowPicker(false);
    patchDiary({ id: diaryId as string, payload: { status: 'DONE' } });
    router.replace('/(main)/archive');
  };

  const onChange = (_: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const cancelDateSelection = () => {
    setSelectedDate(new Date());
    setSplashKey('idea');
    openSplash('archive-save');
  };

  const confirmDateSelection = () => {
    scheduleNotification(selectedDate);
    handleUpdateAlarm();
    setSplashKey('alarm');
    openSplash('archive-save');
  };

  const getRandomSplashKey = (keys: SplashKey[]) => {
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
  };

  const handleUpdateAlarm = () => {
    const genres = userInfo?.genre
      ? userInfo.genre.map((g) => ({ id: g.id, label: g.label, name: g.name }))
      : [];
    const updatedTime = convertToTimeString(selectedDate);
    const updatedGenres = genres.map((genre) => ({
      id: genre.id,
    }));
    const payload: UserPayloadSchema = {
      name: userInfo.name,
      birthDay: userInfo.birthDay,
      gender: userInfo.gender,
      isGenreSuggested: userInfo.isGenreSuggested,
      isAgreedMarketing: userInfo.isAgreedMarketing,
      IsAgreedDiaryAlarm: true,
      diaryAlarmTime: updatedTime,
      genres: updatedGenres,
    };
    trackEvent('Alarm On', {
      selected_time: updatedTime,
      isAgreedDiaryAlarm: true,
    });
    patchUser({ id: userInfo.id, payload });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight
          onPressAction={() => {
            handleSaveToGallery({ cardRef, setIsCapturing, showToast });
          }}
        />
      ),
    });
  }, [navigation]);

  // Render
  return (
    <>
      <View style={{ flex: 1, backgroundColor: COLORS.BLACK }}>
        <ScrollView style={styles.container}>
          <View style={styles.cardContainer}>
            {!isDeletedDiary && (
              <DailyDiaryCard
                diaryId={diaryId as string}
                ref={cardRef}
                isCapturing={isCapturing}
              />
            )}
          </View>
        </ScrollView>
      </View>
      <CustomBottomButton
        isActive={true}
        onPress={handleSave}
        label="아카이브에 저장"
      />
      <CustomBottomSheetModal
        title="일기 알림"
        visible={showPicker}
        onCancel={cancelDateSelection}
        onSave={confirmDateSelection}
      >
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={selectedDate}
            mode="time"
            display="spinner"
            onChange={onChange}
            textColor={COLORS.WHITE}
          />
        </View>
      </CustomBottomSheetModal>
      <CustomAlertModal
        name="card-cancel"
        title="작성을 그만두시겠어요?"
        description="지금 그만두시면, 일기가 아카이브에 저장되지 않아요"
        leftButtonText="그만두기"
        rightButtonText="일기 계속 작성하기"
        onLeftButtonPress={() => {
          closeModal();
          deleteDiary(diaryId as string);
          setIsDeletedDiary(true);
          router.replace('/(main)');
        }}
        onRightButtonPress={closeModal}
      />
      <CustomAlertModal
        name="push-notification"
        title="매일 일기 쓰는 시간에 맞춰 알려드릴까요?"
        leftButtonText="괜찮아요"
        rightButtonText="네, 알려주세요"
        onLeftButtonPress={() => handlePushNotification(false)}
        onRightButtonPress={() => handlePushNotification(true)}
      />
      <CustomSplash
        name="archive-save"
        description={splashConfig.description}
        toastMessage={
          splashKey === 'alarm'
            ? '일기 알림이 설정되었습니다'
            : '아카이브에 저장되었습니다'
        }
        svg={splashConfig.svg}
        onClose={handleCloseSplash}
      />
      <CustomToast position="center" />
    </>
  );
};

export default CardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: COLORS.BLACK,
  },
  cardContainer: {
    marginTop: 10,
    marginBottom: 130,
  },
  pickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
});

import { Alert, type View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import {
  requestPermissionsAsync,
  saveToLibraryAsync,
} from 'expo-media-library';

export const handleSaveToGallery = async ({
  cardRef,
  setIsCapturing,
  showToast,
}: {
  cardRef: React.RefObject<View>;
  setIsCapturing: (isCapturing: boolean) => void;
  showToast: (message: string, duration?: number) => void;
}) => {
  setIsCapturing(true);
  try {
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const uri = await captureRef(cardRef, {
      format: 'png',
      quality: 0.8,
    });

    const { status } = await requestPermissionsAsync();
    if (status === 'granted') {
      await saveToLibraryAsync(uri);
      showToast('갤러리에 저장되었습니다.', 1300);
    } else {
      Alert.alert('권한 필요', '갤러리에 접근할 권한이 필요합니다.');
    }
  } catch (error) {
    console.error('갤러리에 이미지 저장 실패:', error);
    Alert.alert('오류', '갤러리에 이미지 저장 실패');
  } finally {
    setIsCapturing(false);
  }
};

import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as amplitude from '@amplitude/analytics-react-native';
import { useSignUp } from '@/api/hooks/useAuth';
import { useGenres } from '@/api/hooks/useGenres';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import GenreRecModal from '@/components/onboarding/GenreRecModal';
import Header from '@/components/onboarding/Header';
import { COLORS, FONTS } from '@/constants';
import { type IGenre } from '@/models/interfaces';
import { type SignUpSchema } from '@/models/schemas';
import { type Gender } from '@/models/types';
import { useDimStore } from '@/store/useDimStore';
import { useSplashStore } from '@/store/useSplashStore';
import { trackEvent } from '@/utils/amplitude-utils';
const AMPLITUDE_KEY = process.env.EXPO_PUBLIC_AMPLITUDE_KEY ?? '';

const GenreScreen = () => {
  const { data: genres, error, isLoading } = useGenres();
  const { phoneNumber, name, birth, gender, isAgreedMarketing } =
    useLocalSearchParams();

  const { openSplash } = useSplashStore();

  const { toggleDim } = useDimStore();
  const { mutate: signUp } = useSignUp();

  const [selectedGenre, setSelectedGenre] = useState<IGenre[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setIsButtonDisabled(
      !(selectedGenre.length > 0 && selectedGenre.length < 4),
    );
  }, [selectedGenre]);

  const handleSelectGenre = (selectedGenreItem: IGenre) => {
    if (selectedGenre.some((genre) => genre.name === selectedGenreItem.name)) {
      setSelectedGenre(
        selectedGenre.filter((genre) => genre.name !== selectedGenreItem.name),
      );
    } else {
      if (selectedGenre.length < 3) {
        setSelectedGenre([...selectedGenre, selectedGenreItem]);
      }
    }
  };

  const handleNext = () => {
    toggleDim();
    setModalVisible(true);
  };

  const parseDate = (birth: string): Date | null => {
    if (/^\d{8}$/.test(birth)) {
      const year = birth.substring(0, 4);
      const month = birth.substring(4, 6);
      const day = birth.substring(6, 8);

      const dateString = `${year}-${month}-${day}`;
      return new Date(dateString);
    } else {
      return null;
    }
  };

  const handleGenreRec = (isGenreSuggested: boolean) => {
    toggleDim();
    setModalVisible(false);

    const userData: SignUpSchema = {
      name: name as string,
      gender: gender as Gender,
      phoneNumber: phoneNumber as string,
      birthDay: parseDate(birth as string),
      genres: selectedGenre,
      isGenreSuggested,
      isAgreedMarketing: isAgreedMarketing === 'true',
    };

    signUp(userData, {
      onSuccess: (data) => {
        amplitude.init(AMPLITUDE_KEY, phoneNumber as string);
        trackEvent('SignUp Completed', userData);
        amplitude.setUserId(phoneNumber as string);
        openSplash('welcome-muda');
      },
      onError: (error) => {
        console.warn('Sign Up Error:', error);
      },
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="small" color={COLORS.WHITE} />
      </SafeAreaView>
    );
  }

  if (genres.length === 0 || error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>장르를 불러오지 못했어요.</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView edges={['top']} style={styles.container}>
        <Header
          title={`${name as string} 님의 음악 취향을 선택해주세요`}
          description="최소 1개부터 최대 3개까지 가능해요"
        />
        <View style={styles.genreListContainer}>
          {genres.map((genre) => {
            const isSelected = selectedGenre.some((g) => g.name === genre.name);
            return (
              <TouchableOpacity
                key={genre.id}
                onPress={() =>
                  handleSelectGenre({ id: genre.id, name: genre.name })
                }
                style={[
                  styles.genreButton,
                  isSelected ? styles.selectedGenreButton : null, // 조건부 스타일 적용
                ]}
              >
                <Text style={styles.genreType}>{genre.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
      <CustomBottomButton
        isActive={!isButtonDisabled}
        onPress={handleNext}
        label="완료"
      />
      <GenreRecModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onPress={handleGenreRec}
      />
    </>
  );
};

export default GenreScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 28,
    backgroundColor: COLORS.BLACK,
    flex: 1,
  },
  genreButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.CONTENTS_LIGHT,
    borderWidth: 1,
    borderRadius: 38,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  genreType: {
    color: COLORS.WHITE,
    ...FONTS.B2_SB,
  },
  genreListContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
  },
  selectedGenreButton: {
    backgroundColor: COLORS.PURPLE,
    borderColor: COLORS.PURPLE,
  },
  errorText: {
    color: COLORS.RED,
    ...FONTS.B1,
    textAlign: 'center',
    marginTop: 20,
  },
});

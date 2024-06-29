import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSignUp } from '@/api/hooks/useAuth';
import GenreRecModal from '@/components/onboarding/GenreRecModal';
import Header from '@/components/onboarding/Header';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { genres } from '@/constants/data';
import { type IGenre } from '@/models/interfaces';
import { type SignUpSchema } from '@/models/schemas';
import { type Gender } from '@/models/types';
import { useDimStore } from '@/store/useDimStore';
import CustomBottomButton from '@/components/common/CustomBottomButton';

const GenreScreen = () => {
  const { phoneNumber, name, birth, gender, isAgreedMarketing } =
    useLocalSearchParams();

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
    console.log('userData:', userData);

    signUp(userData, {
      onSuccess: (data) => {
        console.log('Sign Up Success:', data);
        router.push('/complete');
      },
      onError: (error) => {
        console.warn('Sign Up Error:', error);
      },
    });
  };

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
                key={genre.name}
                onPress={() => handleSelectGenre({ name: genre.name })}
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
    backgroundColor: Colors.BLACK,
    flex: 1,
  },
  genreButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.CONTENTS_LIGHT,
    borderWidth: 1,
    borderRadius: 38,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },

  genreType: {
    color: Colors.WHITE,
    ...Fonts.B2_SB,
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
    backgroundColor: Colors.PURPLE,
    borderColor: Colors.PURPLE,
  },
});

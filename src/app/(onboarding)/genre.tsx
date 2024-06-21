import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLogin, useSignUp } from '@/api/hooks/useOnboarding';
import Header from '@/components/onboarding/Header';
import GenreRecModal from '@/components/onboarding/GenreRecModal';
import { genres } from '@/constants';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { useDimStore } from '@/store/useDimStore';

const GenreScreen = () => {
  const { phoneNumber, name, birth, gender, isAgreedMarketing } =
    useLocalSearchParams();
  const { toggleDim } = useDimStore();

  const { mutate: signUp } = useSignUp();
  const { mutate: login } = useLogin();

  const [selectedGenre, setSelectedGenre] = useState<Array<{ name: string }>>(
    [],
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setIsButtonDisabled(
      !(selectedGenre.length > 0 && selectedGenre.length < 4),
    );
  }, [selectedGenre]);

  const handleSelectGenre = (selectedGenreItem: { name: string }) => {
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
    // Check if the input is exactly 8 digits
    if (/^\d{8}$/.test(birth)) {
      const year = birth.substring(0, 4);
      const month = birth.substring(4, 6);
      const day = birth.substring(6, 8);

      // Create a Date object from the parsed string
      const dateString = `${year}-${month}-${day}`;
      return new Date(dateString);
    } else {
      // Return null if the input is not valid
      return null;
    }
  };

  const handleGenreRec = (isGenreSuggested: boolean) => {
    toggleDim();
    setModalVisible(false);

    // signUp 로직 추가
    // {
    //   "phoneNumber": "string",
    //   "name": "string",
    //   "birthDay": "2024-06-20T09:33:03.103Z",
    //   "gender": "FEMALE",
    //   "isGenreSuggested": true,
    //   "isAgreedMarketing": true
    // }

    const userData = {
      name,
      gender,
      phoneNumber,
      birthDay: parseDate(birth as string),
      genres: selectedGenre,
      isGenreSuggested,
      isAgreedMarketing: isAgreedMarketing === 'true',
    };
    console.log('userData:', userData);

    signUp(userData, {
      onSuccess: (data) => {
        console.log('Sign Up Success:', data);
        // login 로직 추가
        // router.push({ pathname: '/complete', params: { recommend: true } });
      },
      onError: (error) => {
        console.warn('Sign Up Error:', error);
      },
    });

    // router.push({ pathname: '/complete', params: { recommend: recommend } });
  };

  const loginTest = () => {
    login(
      { phoneNumber: '+8201042334716' },
      {
        onSuccess: (data) => {
          console.log('Login Success:', data);
        },
        onError: (error) => {
          console.warn('Login Error:', error);
        },
      },
    );
  };

  return (
    <>
      <SafeAreaView edges={['top']} style={styles.container}>
        <Header
          title="윤경 님의 음악 취향을 선택해주세요"
          description="최소 1개부터 최대 3개까지 가능해요"
        />

        <View style={styles.keyboardAvoidingContainer}>
          <View style={styles.genreListContainer}>
            {genres.map((genre) => {
              const isSelected = selectedGenre.some(
                (g) => g.name === genre.name,
              );
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
          <TouchableOpacity
            style={[
              styles.verifyButton,
              {
                backgroundColor: isButtonDisabled
                  ? Colors.contents_light
                  : Colors.purple,
              },
            ]}
            // onPress={handleNext}
            onPress={loginTest}
            disabled={isButtonDisabled}
          >
            <Text style={styles.verifyText}>완료</Text>
          </TouchableOpacity>
        </View>

        <GenreRecModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onPress={handleGenreRec}
        />
      </SafeAreaView>
      <SafeAreaView
        edges={['bottom']}
        style={{
          backgroundColor: isButtonDisabled
            ? Colors.contents_light
            : Colors.purple,
        }}
      />
    </>
  );
};

export default GenreScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 28,
    backgroundColor: Colors.black,
    flex: 1,
  },
  keyboardAvoidingContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  verifyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: Colors.purple,
  },
  verifyText: {
    color: Colors.white,
    ...Fonts.t1,
  },
  genreButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.contents_light,
    borderWidth: 1,
    borderRadius: 38,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },

  genreType: {
    color: Colors.white,
    ...Fonts.b2_sb,
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
    backgroundColor: Colors.purple,
    borderColor: Colors.purple,
  },
});

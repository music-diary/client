import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import CustomBottomButton from '@/components/common/CustomBottomButton';
import TermsCheckbox from '@/components/onboarding/TermsCheckbox';
import { COLORS, FONTS } from '@/constants';
import { terms } from '@/constants/data';
import { colorWithOpacity } from '@/utils/color-utils';
import { type SignUpSchema } from '@/models/schemas';
import { type Gender } from '@/models/types';
import { trackEvent } from '@/utils/amplitude-utils';
import { useOAuthSignUp, useSignUp } from '@/api/hooks/useAuth';
import { useSplashStore } from '@/store/useSplashStore';
import { type IGenre } from '@/models/interfaces';

const TermsScreen = () => {
  const { name, gender, birth, selectedGenre, isGenreSuggested, idToken } =
    useLocalSearchParams();

  const genres: IGenre[] = JSON.parse(selectedGenre as string);

  const [checkboxes, setCheckboxes] = useState(terms);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { openSplash } = useSplashStore();

  const { mutate: signUp } = useOAuthSignUp();

  const handleCheckAll = () => {
    const updatedCheckboxes = checkboxes.map((checkbox) => ({
      ...checkbox,
      checked: !checkboxes.every((checkbox) => checkbox.checked),
    }));
    setCheckboxes(updatedCheckboxes);
    setIsButtonDisabled(
      updatedCheckboxes.some(
        (checkbox) => checkbox.required && !checkbox.checked,
      ),
    );
  };

  const handleCheckboxChange = (id: string, value: boolean) => {
    const updatedCheckboxes = checkboxes.map((checkbox) =>
      checkbox.id === id ? { ...checkbox, checked: value } : checkbox,
    );
    setCheckboxes(updatedCheckboxes);
    setIsButtonDisabled(
      updatedCheckboxes.some(
        (checkbox) => checkbox.required && !checkbox.checked,
      ),
    );
  };

  const handleNext = () => {
    const isAgreedMarketing =
      checkboxes.find((checkbox) => !checkbox.required)?.checked ?? false;

    const userData: SignUpSchema = {
      name: name as string,
      gender: gender as Gender,
      birthDay: parseDate(birth as string),
      genres,
      isGenreSuggested: isGenreSuggested === 'true',
      isAgreedMarketing,
      idToken: idToken as string,
    };

    console.log('User Data:', userData);

    signUp(userData, {
      onSuccess: (data) => {
        trackEvent('SignUp Completed', userData);
        openSplash('welcome-muda');
      },
      onError: (error) => {
        console.warn('Sign Up Error:', error);
      },
    });
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

  return (
    <SafeAreaProvider>
      <View style={styles.modalContainer}>
        <View style={styles.termsContainer}>
          <View style={styles.termsTitleContainer}>
            <Text style={styles.termsTitleText}>
              서비스 이용 동의에 동의해주세요
            </Text>
            <TermsCheckbox
              value={
                checkboxes.every((checkbox) => checkbox.checked) &&
                checkboxes.length > 1
              }
              setValue={handleCheckAll}
              title="약관 전체동의"
              type="all"
              url=""
            />
          </View>
          <View style={styles.termsCheckboxContainer}>
            {checkboxes.map((checkbox) => (
              <TermsCheckbox
                key={checkbox.id}
                value={checkbox.checked}
                setValue={(value) => handleCheckboxChange(checkbox.id, value)}
                url={checkbox.url}
                title={checkbox.title}
              />
            ))}
          </View>
        </View>
      </View>
      <CustomBottomButton
        isActive={!isButtonDisabled}
        onPress={handleNext}
        label="완료"
      />
    </SafeAreaProvider>
  );
};

export default TermsScreen;

const styles = StyleSheet.create({
  modalContainer: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingTop: 32,
    width: '100%',
  },
  termsContainer: {
    paddingHorizontal: 24,
  },
  termsTitleContainer: {
    display: 'flex',
    gap: 30,
    borderBottomColor: colorWithOpacity(COLORS.WHITE, 0.2),
    borderBottomWidth: 1,
    paddingBottom: 24,
  },
  termsTitleText: {
    ...FONTS.T1,
    color: COLORS.WHITE,
  },
  termsCheckboxContainer: {
    display: 'flex',
    gap: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
});

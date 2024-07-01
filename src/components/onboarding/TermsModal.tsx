import { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '@/constants';
import { terms } from '@/constants/data';
import { colorWithOpacity } from '@/utils/color-utils';
import CustomBottomButton from '../common/CustomBottomButton';
import TermsCheckbox from './TermsCheckbox';

interface TermsModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onPress: (isAgreedMarketing: boolean) => void;
}

const TermsModal = ({
  modalVisible,
  setModalVisible,
  onPress,
}: TermsModalProps) => {
  const [checkboxes, setCheckboxes] = useState(terms);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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
    onPress(isAgreedMarketing);
  };

  return (
    <Modal animationType="slide" visible={modalVisible} transparent={true}>
      <View style={styles.modalOverlay}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }} />
          <SafeAreaView
            edges={['top']}
            style={[
              styles.modalOverlay,
              {
                backgroundColor: isButtonDisabled
                  ? COLORS.CONTENTS_LIGHT
                  : COLORS.PURPLE,
              },
            ]}
          >
            <View style={styles.modalContainer}>
              <View style={styles.termsContainer}>
                <View style={styles.termsTitleContainer}>
                  <Text style={styles.termsTitleText}>서비스 이용 동의</Text>
                  <TermsCheckbox
                    value={
                      checkboxes.every((checkbox) => checkbox.checked) &&
                      checkboxes.length > 1
                    }
                    setValue={handleCheckAll}
                    title="약관 전체동의"
                    type="all"
                  />
                </View>
                <View style={styles.termsCheckboxContainer}>
                  {checkboxes.map((checkbox) => (
                    <TermsCheckbox
                      key={checkbox.id}
                      value={checkbox.checked}
                      setValue={(value) =>
                        handleCheckboxChange(checkbox.id, value)
                      }
                      title={checkbox.title}
                    />
                  ))}
                </View>
              </View>
            </View>
          </SafeAreaView>
          <CustomBottomButton
            isActive={!isButtonDisabled}
            onPress={handleNext}
            label="다음으로"
          />
        </SafeAreaProvider>
      </View>
    </Modal>
  );
};

export default TermsModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    display: 'flex',
    backgroundColor: COLORS.GREY3,
    paddingTop: 32,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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

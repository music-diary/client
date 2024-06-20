import { useState } from 'react';
import { router } from 'expo-router';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { termsCheckboxes } from '@/constants';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { useDimStore } from '@/store/useDimStore';
import TermsCheckbox from './TermsCheckbox';

interface TermsModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const TermsModal = ({ modalVisible, setModalVisible }: TermsModalProps) => {
  const { toggleDim } = useDimStore();

  const [checkboxes, setCheckboxes] = useState(termsCheckboxes);
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
    toggleDim();
    setModalVisible(false);
    router.push('/user-info');
  };

  return (
    <Modal animationType="slide" visible={modalVisible} transparent={true}>
      <View style={styles.modalOverlay}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }} />
          <SafeAreaView
            style={[
              styles.modalOverlay,
              {
                backgroundColor: isButtonDisabled
                  ? Colors.contents_light
                  : Colors.purple,
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
              <TouchableOpacity
                style={[
                  styles.modalNextButton,
                  {
                    backgroundColor: isButtonDisabled
                      ? Colors.contents_light
                      : Colors.purple,
                  },
                ]}
                onPress={handleNext}
                disabled={isButtonDisabled}
              >
                <Text style={styles.buttonText}>모두 동의하고 다음으로</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
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
    backgroundColor: Colors.white,
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
    borderBottomColor: Colors.contents_light,
    borderBottomWidth: 1,
    paddingBottom: 24,
  },
  termsTitleText: {
    ...Fonts.t1,
    color: '#000000',
  },
  modalNextButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: Colors.purple,
  },
  termsCheckboxContainer: {
    display: 'flex',
    gap: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
  buttonText: {
    color: Colors.white,
    ...Fonts.t1,
  },
});

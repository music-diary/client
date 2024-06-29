import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import useDraftStore from '@/store/useDraftStore';
import { useModalStore } from '@/store/useModalStore';
import CustomBackButton from '../common/CustomBackButton';

const HeaderRightDraft = () => {
  const navigation = useNavigation();
  const { openModal } = useModalStore();
  const { isEditMode, toggleEditMode } = useDraftStore();

  const handlePress = () => {
    if (isEditMode) {
      openModal('delete-drafts');
    } else {
      toggleEditMode();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () =>
        isEditMode ? (
          <TouchableOpacity onPress={toggleEditMode}>
            <Text style={styles.cancelText}>취소</Text>
          </TouchableOpacity>
        ) : (
          <CustomBackButton />
        ),
    });
  }, [isEditMode]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={isEditMode ? styles.deleteText : styles.editText}>
        {isEditMode ? '삭제' : '편집'}
      </Text>
    </TouchableOpacity>
  );
};

export default HeaderRightDraft;

const styles = StyleSheet.create({
  editText: {
    color: Colors.PURPLE,
    ...Fonts.B1_SB,
  },
  deleteText: {
    color: Colors.RED,
    ...Fonts.B1_SB,
  },
  cancelText: {
    color: Colors.GREY1,
    ...Fonts.B1_SB,
  },
});

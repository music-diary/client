import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import useDraftStore from '@/store/useDraftStore';
import { useModalStore } from '@/store/useModalStore';

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
      headerBackVisible: !isEditMode,
      headerLeft: () =>
        isEditMode ? (
          <TouchableOpacity onPress={toggleEditMode}>
            <Text style={styles.cancelText}>취소</Text>
          </TouchableOpacity>
        ) : null,
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
    color: Colors.purple,
    ...Fonts.b1_sb,
  },
  deleteText: {
    color: Colors.red,
    ...Fonts.b1_sb,
  },
  cancelText: {
    color: Colors.grey1,
    ...Fonts.b1_sb,
  },
});

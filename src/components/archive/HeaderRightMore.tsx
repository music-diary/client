import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { TrashSvg } from 'assets/images/archive'; // SVG 파일이 있다고 가정합니다.
import { COLORS } from '@/constants';
import { useModalStore } from '@/store/useModalStore';

const HeaderRightMore = () => {
  const { openModal } = useModalStore();

  const onDeletePress = () => {
    openModal('delete-diary-modal');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onDeletePress}>
      <TrashSvg fill={COLORS.WHITE} />
    </TouchableOpacity>
  );
};

export default HeaderRightMore;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

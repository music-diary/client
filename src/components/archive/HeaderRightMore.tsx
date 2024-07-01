import React from 'react';
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '@/constants';
import { useModalToggleStore } from '@/store/useModalStore';

const HeaderRightMore = () => {
  const { toggleModal, isModalOpen } = useModalToggleStore();

  return (
    <TouchableOpacity style={styles.container} onPress={toggleModal}>
      <Feather
        name={isModalOpen ? 'x' : 'more-horizontal'}
        size={18}
        color={COLORS.WHITE}
      />
    </TouchableOpacity>
  );
};

export default HeaderRightMore;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

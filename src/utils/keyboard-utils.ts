import { useEffect } from 'react';
import {
  Keyboard,
  // type NativeSyntheticEvent,
  // type TextInput,
  type ScrollView,
} from 'react-native';

/**
 * TODO:
 * 이거 파일 삭제를 하든 뭘 하든 정리할 필요 있음
 *
 */
export const useKeyboardListeners = (
  scrollViewRef: React.RefObject<ScrollView>,
) => {
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        scrollViewRef.current?.scrollTo({
          y: e.endCoordinates.height,
          animated: true,
        });
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [scrollViewRef]);
};

// export const useKeyboardAwareFocus = (
//   scrollViewRef: React.RefObject<ScrollView>,
//   inputRefs: Array<React.RefObject<TextInput>>,
// ) => {
//   useEffect(() => {
//     const handleKeyboardDidShow = (
//       event: NativeSyntheticEvent<KeyboardEvent>,
//     ) => {
//       const currentlyFocusedInput = inputRefs.find((ref) =>
//         ref.current?.isFocused(),
//       );

//       if (
//         currentlyFocusedInput?.current &&
//         'endCoordinates' in event.nativeEvent
//       ) {
//         const scrollResponder = scrollViewRef.current?.getScrollResponder();
//         const extraOffset = 100; // Add additional offset if needed
//         const keyboardHeight =
//           event.nativeEvent.endCoordinates.height + extraOffset;
//         console.log('fff');
//         scrollResponder?.scrollResponderScrollNativeHandleToKeyboard(
//           currentlyFocusedInput.current,
//           keyboardHeight,
//           true,
//         );
//       }
//     };

//     const keyboardDidShowListener = Keyboard.addListener(
//       'keyboardDidShow',
//       handleKeyboardDidShow,
//     );

//     const keyboardDidHideListener = Keyboard.addListener(
//       'keyboardDidHide',
//       () => {
//         scrollViewRef.current?.scrollTo({ y: 0, animated: true });
//       },
//     );

//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, [scrollViewRef, inputRefs]);
// };

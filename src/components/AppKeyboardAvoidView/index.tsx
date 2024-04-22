import React, {FC} from 'react';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {StyleProp, ViewStyle} from 'react-native';

type props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const AppKeyboardAvoidView: FC<props> = ({
  children,
  style = undefined,
}) => {
  const keyboard = useAnimatedKeyboard();
  const paddingStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      paddingBottom: keyboard.height.value,
    };
  }, [keyboard.height.value]);

  return (
    <Animated.View style={[paddingStyle, style]}>{children}</Animated.View>
  );
};

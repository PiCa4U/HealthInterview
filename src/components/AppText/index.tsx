import React, {FC} from 'react';
import {StyleProp, TextProps, TextStyle} from 'react-native';
import {TEXT_VARIANT} from './types.ts';
import {textTypographyStyles} from './styles.ts';
import Animated from 'react-native-reanimated';

export type AppTextProps = TextProps & {
  style?: StyleProp<TextStyle>;
  variant?: `${TEXT_VARIANT}`;
  text?: string | number;
  children?: React.ReactNode;
};

export const AppText: FC<AppTextProps> = ({
  style,
  children,
  text,
  numberOfLines,
  onPress,
  variant = TEXT_VARIANT.BODY_MEDIUM,
  ...props
}) => {
  if (
    (text === undefined || text === null) &&
    (children === undefined || children === null)
  ) {
    return null;
  }
  return (
    <Animated.Text
      {...props}
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[textTypographyStyles[variant], style]}>
      {text ?? children ?? ''}
    </Animated.Text>
  );
};

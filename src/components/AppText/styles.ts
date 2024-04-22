import {StyleSheet, TextStyle} from 'react-native';
import {TEXT_VARIANT} from './types.ts';

export const textTypographyStyles = StyleSheet.create<{
  [key in TEXT_VARIANT]: TextStyle;
}>({
  [TEXT_VARIANT.BODY_LARGE]: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
  },
  [TEXT_VARIANT.BODY_MEDIUM]: {
    fontWeight: '400',
    lineHeight: 20,
    fontSize: 14,
  },
});

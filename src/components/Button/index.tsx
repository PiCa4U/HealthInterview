import React, {FC} from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {AppText} from '../AppText';
import {styles} from './styles.ts';

type ButtonProps = {
  text: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
};

export const Button: FC<ButtonProps> = ({text, onPress, style}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <AppText text={text} />
    </TouchableOpacity>
  );
};

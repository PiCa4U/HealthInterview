import React, {FC, ReactNode} from 'react';
import {View, ViewProps} from 'react-native';
import {styles} from './styles';

type Props = ViewProps & {
  children: ReactNode;
};
export const FormFieldContainer: FC<Props> = ({
  children,
  style,
  ...restProps
}) => {
  return (
    <View {...restProps} style={[styles.container, style]}>
      {children}
    </View>
  );
};

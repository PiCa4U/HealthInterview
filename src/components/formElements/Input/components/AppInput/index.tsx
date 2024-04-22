import React, {memo, useState} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {AppText} from '../../../../AppText';
import {TEXT_VARIANT} from '../../../../AppText/types.ts';
import {Colors} from '../../../../../constants/colors.ts';
import {textTypographyStyles} from '../../../../AppText/styles.ts';

export type AppInputProps = TextInputProps & {
  isError?: boolean;
  title?: string;
};

export const AppInput = memo<AppInputProps>(
  ({onChangeText, title, onBlur, onFocus, isError, value, style, ...props}) => {
    const [isFocused, setIsFocudes] = useState(false);

    return (
      <View style={[styles.container, style]}>
        <AppText
          text={title}
          variant={TEXT_VARIANT.BODY_MEDIUM}
          style={styles.title}
        />
        <TextInput
          autoCapitalize={'none'}
          {...props}
          onFocus={e => {
            onFocus && onFocus(e);
            setIsFocudes(true);
          }}
          onChangeText={onChangeText}
          onBlur={e => {
            onBlur && onBlur(e);
            setIsFocudes(false);
          }}
          value={value}
          placeholderTextColor={Colors.CARD_TITLE}
          style={[
            styles.inputContainer,
            textTypographyStyles.bodyLarge,
            styles.textWithoutLineHeight,
            isFocused && styles.focus,
            isError && styles.error,
          ]}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  title: {
    color: Colors.CARD_TITLE,
  },
  inputContainer: {
    height: 48,
    borderWidth: 3,
    borderRadius: 28,
    borderColor: Colors.CARD_SUBTITLE,
    backgroundColor: Colors.CARD_BACKGROUND,
    textAlignVertical: 'center',
    justifyContent: 'center',
    color: Colors.CARD_TITLE,
    paddingLeft: 16,
    paddingVertical: 8,
    paddingRight: 42,
  },
  icon: {
    paddingRight: 72,
  },
  textWithoutLineHeight: {
    lineHeight: undefined,
  },
  error: {
    borderColor: Colors.BORDER_NEGATIVE,
  },
  focus: {
    borderColor: Colors.CARD_TITLE,
  },
  iconsContainer: {
    position: 'absolute',
    right: 8,
    top: 8,
    bottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  icons: {
    paddingHorizontal: 8,
  },
});

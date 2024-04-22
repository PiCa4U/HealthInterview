import React, {FC} from 'react';
import {AppText} from '../../../../components';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../../../../constants/colors.ts';

export type NoteProps = {
  title: string;
};

export const Note: FC<NoteProps> = ({title}) => {
  return (
    <View style={styles.container}>
      <AppText text={title} style={styles.title} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: Colors.CARD_BACKGROUND,
  },
  title: {
    color: Colors.CARD_TITLE,
  },
});

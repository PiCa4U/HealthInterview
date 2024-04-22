import {FC} from 'react';
import {View} from 'react-native';
import {styles} from './styles.ts';
import {AppText} from '../../../../AppText';
import {TEXT_VARIANT} from '../../../../AppText/types.ts';

type props = {
  errorMessage: string;
};
export const ErrorTint: FC<props> = ({errorMessage}) => {
  return (
    <View style={styles.container}>
      <AppText
        variant={TEXT_VARIANT.BODY_MEDIUM}
        style={styles.error}
        text={errorMessage}
      />
    </View>
  );
};

import {StyleSheet} from 'react-native';
import {Colors} from '../../../../../constants/colors.ts';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  error: {
    color: Colors.BORDER_NEGATIVE,
  },
});

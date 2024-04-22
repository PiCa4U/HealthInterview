import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/colors.ts';

export const styles = StyleSheet.create({
  container: {
    marginTop: -24,
    justifyContent: 'flex-end',
  },
  title: {
    color: Colors.CARD_TITLE,
  },
  content: {
    gap: 16,
    borderRadius: 12,
    padding: 16,
    backgroundColor: Colors.CARD_BACKGROUND,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 48,
    marginHorizontal: 32,
    gap: 16,
  },
});

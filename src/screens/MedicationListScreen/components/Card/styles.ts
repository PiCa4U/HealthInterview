import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants/colors.ts';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.CARD_BACKGROUND,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  leftAction: {},
  actionText: {
    color: Colors.BORDER_NEGATIVE,
  },
  title: {
    color: Colors.CARD_TITLE,
  },
  subTitle: {
    color: Colors.CARD_SUBTITLE,
  },
});

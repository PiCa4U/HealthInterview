import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants/colors.ts';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    marginTop: 16,
    alignSelf: 'center',
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  modal: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  headerBtn: {
    gap: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteBtn: {backgroundColor: Colors.BORDER_NEGATIVE},
  title: {
    color: Colors.CARD_TITLE,
  },
  subTitle: {
    color: Colors.CARD_SUBTITLE,
  },
});

import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors.ts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_DARK,
  },
  header: {
    height: 200,
  },
  list: {
    flexGrow: 1,
    gap: 12,
  },
  fubBtn: {
    position: 'absolute',
    bottom: 48,
    right: 32,
  },
  emptyList: {
    flex: 1,
    flexGrow: 1,
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

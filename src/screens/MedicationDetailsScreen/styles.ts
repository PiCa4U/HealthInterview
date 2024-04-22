import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors.ts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_DARK,
  },
  headerContainer: {
    height: 200,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 64,
  },
  footer: {
    marginTop: 12,
  },
  listHeader: {
    flexGrow: 1,
  },
});

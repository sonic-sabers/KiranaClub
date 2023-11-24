import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  flatlist: {flex: 1},
  flatListContent: {
    alignItems: 'center',
    padding: 20,
  },
  container: {flex: 1},
  error: {
    color: Colors.alertAndStatus.error,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  spinnerTextStyle: {
    color: Colors.grey.default,
  },
});

export default styles;

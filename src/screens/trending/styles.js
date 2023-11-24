import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: { backgroundColor: '#121212', flex: 1 },
  header: {
    fontSize: 18,
    color: Colors.black.default,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  flatlist: { flex: 1 },
  flatListContent: {
    alignItems: 'center',
    padding: 20,
  },
  switchView: {
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 },
  buttonContainer: { width: '100%', alignItems: 'center', paddingRight: 20, paddingVertical: 12, flexDirection: 'row', justifyContent: "space-between" }
});

export default styles;

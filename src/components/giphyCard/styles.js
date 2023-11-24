import { StyleSheet, Dimensions } from 'react-native';
const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  giphyCard: {
    padding: 10,
    backgroundColor: '#2a2a2a',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    borderRadius: 7,
    margin: 8,
  },
  gif: { width: width * 0.5 - 40, height: width * 0.5 - 40 },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  playContainer: { marginBottom: -40, zIndex: 300, alignSelf: 'flex-end', height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 16 }
});

export default styles;

import {Linking} from 'react-native';

export default handleShareWhatsApp = async url => {
  try {
    Linking.openURL(`whatsapp://send?text=${url}`);
  } catch (err) {
    console.log('Error = ', err);
  }
};

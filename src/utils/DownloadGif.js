import {Platform, PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const checkPermission = async url => {
  // Function to check the platform
  // If iOS then start downloading
  // If Android then ask for permission

  if (Platform.OS === 'ios') {
    downloadImage(url);
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'App needs access to your storage to download Photos',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        alert('Storage Permission Not Granted');
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  }
};

const downloadImage = async (url, callback) => {
  // Main function to download the image

  // To add the time suffix in filename
  let date = new Date();
  // Image URL which we want to download
  let image_URL = url;
  // Getting the extention of the file
  let ext = getExtention(image_URL);
  ext = '.' + ext[0];
  const {config, fs} = RNFetchBlob;
  let PictureDir = fs.dirs.PictureDir;

  let options = {
    fileCache: true,
    addAndroidDownloads: {
      // Related to the Android only
      useDownloadManager: true,
      notification: true,
      path:
        PictureDir +
        '/image_' +
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        ext,
      description: 'Image',
    },
  };
  config(options)
    .fetch('GET', image_URL)
    .then(res => {
      // Showing alert after successful downloading
      callback();
      alert('Image Downloaded Successfully.');
    })
    .catch(err => {
      callback();
      console.log(err);
    });
};

const getExtention = filename => {
  // To get the file extension
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
};

export default downloadGif = async (gifUrl, setLoading) => {
  setLoading(true);
  const isAccepted = await checkPermission(gifUrl);

  if (isAccepted) {
    await downloadImage(gifUrl, () => setLoading(false));
  }
};

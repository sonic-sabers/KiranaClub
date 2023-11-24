//Third party imports
import {
  Text,
  Button,
  View,
  FlatList,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

//Local imports
import Colors from '../../constants/Colors';
import {
  getSearchedExtraTrendingGif,
  getSearchedTrendingGif,
} from '../../store/giphy/thunk';
import {
  searchedGifSelector,
  searchedGifLoadingSelector,
  searchedExtraGifLoadingSelector,
  errorSelector,
} from '../../store/giphy/selector';
import GiphyCard from '../../components/giphyCard';
import styles from './styles';
import { isDarkThemeSelector } from '../../store/theme/selector';
import { removeError, removeSearchedResult } from '../../store/giphy/slice';
import CustomSearchTextInput from '../../components/common/customSearchTextInput';
import WhatsappShare from '../../utils/WhatsappShare';
import DownloadGif from '../../utils/DownloadGif';
import { toggleGifPlaying } from '../../store/giphy/slice';

const Search = ({ setModalVisible }) => {
  const dispatch = useDispatch();
  const searchResult = useSelector(searchedGifSelector);
  const searchloading = useSelector(searchedGifLoadingSelector);
  const listEndLoading = useSelector(searchedExtraGifLoadingSelector);
  const isDarkTheme = useSelector(isDarkThemeSelector);
  const error = useSelector(errorSelector);
  const [text, setText] = useState('');
  const [loading, setDownloadLoading] = useState(false);
  const textRef = useRef(null);

  // handle text
  const handleTextChange = text => {
    setText(text);
  };

  // handle search
  const searchGifs = () => {
    dispatch(getSearchedTrendingGif({ q: text }));
    Keyboard.dismiss();
  };

  //play/stop Gifs
  const onPlayGif = (id, playing) => {
    dispatch(toggleGifPlaying({ id: id, play: !playing, from: 'search' }));
  };

  // handle infinite scroll
  const loadExtraGifs = () => {
    dispatch(getSearchedExtraTrendingGif({ q: text ? text : 'trending' }));
  };

  //handle fetch data
  const fetchSearchData = () => {
    dispatch(getSearchedTrendingGif({ q: text ? text : 'trending' }));
  }

  //clear the input and search to trending gifs
  const clearInput = () => {
    handleTextChange('')
    if (error) {
      fetchSearchData()
    }
  }

  // cleanup function
  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus();
    }
    fetchSearchData()
    return () => {
      dispatch(removeSearchedResult());
      dispatch(removeError());
    };
  }, []);

  // render gif's
  const renderGifs = ({ item }) => {
    return (
      <GiphyCard
        isPlaying={item?.isPlaying}
        onPlay={() => onPlayGif(item.id, item?.isPlaying)}
        isDarkTheme={isDarkTheme}
        onPressWhatsapp={() => WhatsappShare(item?.images?.original?.url)}
        onPressDownload={() =>
          DownloadGif(item?.images?.original?.url, e => setDownloadLoading(e))
        }
        uri={
          item?.isPlaying
            ? item?.images?.original?.url
            : item?.images?.original?.mp4
        }
      />
    );
  };

  // flatlist footer component
  const ListFooterComponent = () =>
    !listEndLoading ? (
      searchResult.length != 0 ? (
        <Button onPress={loadExtraGifs} title="Load more" />
      ) : null
    ) : (
      error ? <></> :
        <ActivityIndicator
          size={24}
          color={isDarkTheme ? Colors.white.default : Colors.black.default}
        />
    );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: !isDarkTheme
            ? Colors.white.default
            : Colors.black.default,
        },
      ]}>
      <CustomSearchTextInput
        isDarkTheme={isDarkTheme}
        ref={textRef}
        searchGifs={searchGifs}
        value={text}
        handleTextChange={handleTextChange}
        clearInput={clearInput}
        onPressBack={() => setModalVisible(false)}
      />
      {searchloading ? (
        <ActivityIndicator
          size={26}
          color={isDarkTheme ? Colors.white.default : Colors.black.default}
        />
      ) : (
        <FlatList
          numColumns={2}
          style={styles.flatlist}
          contentContainerStyle={styles.flatListContent}
          renderItem={renderGifs}
          refreshing={loading}
          onRefresh={fetchSearchData}
          keyExtractor={(item, index) => item.url}
          data={searchResult}
          ListFooterComponent={ListFooterComponent}
          ListEmptyComponent={() =>
            error != '' ? <Text style={styles.error}>{error}</Text> : null
          }
          onEndReached={loadExtraGifs}
          onEndReachedThreshold={0.2}
        />
      )}
      <Spinner
        visible={loading}
        textContent={'Loading...Please Wait'}
        textStyle={[
          styles.spinnerTextStyle,
          { color: isDarkTheme ? Colors.white.default : Colors.black.default },
        ]}
      />
    </View>
  );
};

export default Search;

//Third party imports
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Button,
  Switch,
  Modal,
  Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from 'react-native-vector-icons/Feather';

//Local imports
import { getExtraTrendingGif, getTrendingGif } from '../../store/giphy/thunk';
import {
  trendingExtraGifLoadingSelector,
  trendingGifSelector,
} from '../../store/giphy/selector';
import WhatsappShare from '../../utils/WhatsappShare';
import Colors from '../../constants/Colors';
import { isDarkThemeSelector } from '../../store/theme/selector';
import GiphyCard from '../../components/giphyCard';
import styles from './styles';
import DownloadGif from '../../utils/DownloadGif';
import { toggleGifPlaying } from '../../store/giphy/slice';
import { setTheme } from '../../store/theme/slice';
import Search from '../search';

const Trending = () => {
  const dispatch = useDispatch();
  const trendingGifs = useSelector(trendingGifSelector);
  const listEndLoading = useSelector(trendingExtraGifLoadingSelector);
  const isDarkTheme = useSelector(isDarkThemeSelector);
  const [loading, setDownloadLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchTrendingData = () => {
    dispatch(getTrendingGif())
  }

  // handle first render
  useEffect(() => {
    fetchTrendingData()
  }, []);

  // handle infinite scrolling
  const loadExtraGifs = () => {
    dispatch(getExtraTrendingGif());
  };

  //play/stop Gifs
  const onPlayGif = (id, playing) => {
    dispatch(toggleGifPlaying({ id: id, play: !playing, from: 'trending' }));
  };

  // render gifs
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

  // render footer
  const ListFooterComponent = () =>
    !listEndLoading ? (
      trendingGifs.length != 0 ? (
        <Button title="Load more" onPress={loadExtraGifs} />
      ) : null
    ) : (
      <ActivityIndicator
        size={24}
        color={isDarkTheme ? Colors.white.default : Colors.black.default}
      />
    );

  // render header
  const ListHeaderComponent = () => {
    return (
      <Text
        style={[
          styles.header,
          { color: isDarkTheme ? Colors.white.default : Colors.black.default },
        ]}>
        View Trending Gifs
      </Text>
    )
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkTheme
            ? Colors.black.default
            : Colors.white.default,
        },
      ]}>
      <View style={styles.buttonContainer}>
        <View style={styles.switchView}>
          <Text
            style={{
              color: isDarkTheme ? Colors.white.default : Colors.black.default,
            }}>
            Turn on {!isDarkTheme ? 'Dark Mode' : 'Light Mode'}
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDarkTheme ? Colors.white.default : '#f4f3f4'}
            onChange={() => dispatch(setTheme(!isDarkTheme))}
            value={isDarkTheme}
          />
        </View>
        <Feather
          onPress={() => {
            setModalVisible(true)
          }}
          size={24}
          name="search"
          color={isDarkTheme ? Colors.white.default : Colors.black.default}
          style={{ marginLeft: 20 }}
        />
      </View>


      <FlatList
        style={styles.flatlist}
        contentContainerStyle={styles.flatListContent}
        data={trendingGifs}
        numColumns={2}
        refreshing={loading}
        onRefresh={fetchTrendingData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderGifs}
        ListEmptyComponent={() => (
          listEndLoading ?
            <View style={styles.loadingContainer}>
              <Text style={{ color: isDarkTheme ? Colors.white.default : Colors.black.default }}>Fetching Data</Text>
            </View> :
            <ActivityIndicator
              size={26}
              color={isDarkTheme ? Colors.white.default : Colors.black.default}
            />
        )}
        onEndReached={loadExtraGifs}
        onEndReachedThreshold={0.2}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
      />
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={[
          styles.spinnerTextStyle,
          { color: isDarkTheme ? Colors.white.default : Colors.black.default },
        ]}
      />
      <Modal
        animationType="fade"
        transparent={true}
        animated={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          searchFilterFunction('');
        }}>
        <Pressable
          style={{ flex: 1 }}>
          <Search setModalVisible={setModalVisible} />
        </Pressable>

      </Modal>
    </View>
  );
};


export default Trending;

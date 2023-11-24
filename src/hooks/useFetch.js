import axios from 'axios';
import { useEffect, useRef, useReducer } from 'react';
import Config from 'react-native-config';

export const useFetch = (offSet, search) => {
	const cache = useRef({});
	const url = Config.GIPHY_TRENDING_API
	const initialState = {
		status: 'idle',
		error: null,
		data: [],
	};
	let currentoffSet = offSet || 10
	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case 'FETCHING':
				return { ...initialState, status: 'fetching' };
			case 'FETCHED':
				return { ...initialState, status: 'fetched', data: action.payload };
			case 'FETCH_ERROR':
				return { ...initialState, status: 'error', error: action.payload };
			default:
				return state;
		}
	}, initialState);

	useEffect(() => {
		let cancelRequest = false;
		if (!url || !url.trim()) return;
		const defaultParams = {
			offset: currentoffSet,
			api_key: Config.API_KEY,
			limit: 10,
		}
		const searchedParams = {
			offset: currentoffSet,
			api_key: Config.API_KEY,
			limit: 10,
			search
		}
		let params = search?.length ? searchedParams : defaultParams
		const fetchData = async () => {
			dispatch({ type: 'FETCHING' });
			if (cache.current[url]) {
				const data = cache.current[url];
				dispatch({ type: 'FETCHED', payload: data });
				console.log('from cache');
			} else {
				try {

					const response = await axios.get(url, {
						params
					});
					const responseData = response.data
					const payload1 = responseData.data.map(item => {
						return { ...item, isPlaying: false };
					});
					console.log('responseData', responseData);
					const data = payload1;
					cache.current[url] = data;
					if (cancelRequest) return;
					dispatch({ type: 'FETCHED', payload: data });
				} catch (error) {
					if (cancelRequest) return;
					dispatch({ type: 'FETCH_ERROR', payload: error.message });
				}
			}
		};

		fetchData();

		return function cleanup() {
			cancelRequest = true;
		};
	}, [url]);

	return state;
};
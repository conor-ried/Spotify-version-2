import { fetchSongs as fetchSongsAPI } from '../../api/apiClient';

export const FETCH_SONGS_SUCCESS = 'FETCH_SONGS_SUCCESS';
export const FETCH_SONGS_FAILURE = 'FETCH_SONGS_FAILURE';

export const FETCH_SONGS_REQUEST = 'FETCH_SONGS_REQUEST';

export const fetchSongs = () => async dispatch => {
    dispatch(fetchSongsRequest());
    try {
        const songs = await fetchSongsAPI();
        dispatch(fetchSongsSuccess(songs));
    } catch (error) {
        dispatch(fetchSongsFailure(error.message));
    }
};
export const fetchSongsRequest = () => ({
    type: FETCH_SONGS_REQUEST
});
export const fetchSongsSuccess = (songs) => ({
    type: FETCH_SONGS_SUCCESS,
    payload: songs
});

export const fetchSongsFailure = (error) => ({
    type: FETCH_SONGS_FAILURE,
    payload: error
});


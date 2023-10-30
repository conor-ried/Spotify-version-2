import { 
  fetchPlaylists as apiFetchPlaylists, 
  fetchPlaylist as apiFetchPlaylist,
  addSongToPlaylist as apiAddSongToPlaylist,  
  removeSongFromPlaylist as apiRemoveSongFromPlaylist,  
} from '../../api/apiClient';   

  export const fetchPlaylists = () => async (dispatch) => {
    dispatch(getPlaylistsStart());
  
    try {
      const playlists = await apiFetchPlaylists();  
      dispatch(getPlaylistsSuccess(playlists));
    } catch (error) {
      console.error("Error fetching playlists: ", error);
      dispatch(getPlaylistsFailure(error.toString()));
    }
  };
  export const fetchPlaylist = (playlistTitle) => async (dispatch) => {
    dispatch(getSinglePlaylistStart());
  
    try {
      // using the renamed function
      const playlist = await apiFetchPlaylist(playlistTitle); 
      dispatch(getSinglePlaylistSuccess(playlist));
    } catch (error) {
      dispatch(getSinglePlaylistFailure(error.toString()));
    }
  };


  export const GET_PLAYLISTS_START = 'GET_PLAYLISTS_START';
export const GET_PLAYLISTS_SUCCESS = 'GET_PLAYLISTS_SUCCESS';
export const GET_PLAYLISTS_FAILURE = 'GET_PLAYLISTS_FAILURE';

export const GET_SINGLE_PLAYLIST_START = 'GET_SINGLE_PLAYLIST_START';
export const GET_SINGLE_PLAYLIST_SUCCESS = 'GET_SINGLE_PLAYLIST_SUCCESS';
export const GET_SINGLE_PLAYLIST_FAILURE = 'GET_SINGLE_PLAYLIST_FAILURE';
export const ADD_SONG_TO_PLAYLIST = 'ADD_SONG_TO_PLAYLIST';
export const REMOVE_SONG_FROM_PLAYLIST = 'REMOVE_SONG_FROM_PLAYLIST';
export const ADD_SONG_TO_PLAYLIST_SUCCESS = 'ADD_SONG_TO_PLAYLIST_SUCCESS';
export const ADD_SONG_TO_PLAYLIST_FAILURE = 'ADD_SONG_TO_PLAYLIST_FAILURE';
export const REMOVE_SONG_FROM_PLAYLIST_SUCCESS = 'REMOVE_SONG_FROM_PLAYLIST_SUCCESS';
export const REMOVE_SONG_FROM_PLAYLIST_FAILURE = 'REMOVE_SONG_FROM_PLAYLIST_FAILURE';

// Action creators
export const getPlaylistsStart = () => ({
  type: GET_PLAYLISTS_START,
});

export const getPlaylistsSuccess = (playlists) => ({
  type: GET_PLAYLISTS_SUCCESS,
  payload: playlists,
});

export const getPlaylistsFailure = (error) => ({
  type: GET_PLAYLISTS_FAILURE,
  payload: error,
});

export const getSinglePlaylistStart = () => ({
  type: GET_SINGLE_PLAYLIST_START,
});

export const getSinglePlaylistSuccess = (playlist) => ({
  type: GET_SINGLE_PLAYLIST_SUCCESS,
  payload: playlist,
});

export const getSinglePlaylistFailure = (error) => ({
  type: GET_SINGLE_PLAYLIST_FAILURE,
  payload: error,
});
const addSongToPlaylistSuccess = () => ({
  type: ADD_SONG_TO_PLAYLIST_SUCCESS,
});

const addSongToPlaylistFailure = (error) => ({
  type: ADD_SONG_TO_PLAYLIST_FAILURE,
  payload: error,
});

const removeSongFromPlaylistSuccess = () => ({
  type: REMOVE_SONG_FROM_PLAYLIST_SUCCESS,
});

const removeSongFromPlaylistFailure = (error) => ({
  type: REMOVE_SONG_FROM_PLAYLIST_FAILURE,
  payload: error,
});
export const addSongToPlaylist = (songId, playlistTitle) => async (dispatch) => {
  try {
    dispatch({ type: ADD_SONG_TO_PLAYLIST }); // This represents the start of the process
    const response = await apiAddSongToPlaylist(songId, playlistTitle);

    // Assuming the response contains some indication of success,
    // you can dispatch the success action. Otherwise, you might dispatch a failure action.
    if (response.success) {
      dispatch(addSongToPlaylistSuccess());
      // Optionally, if the response contains updated data, you can pass it as a payload
    } else {
      dispatch(addSongToPlaylistFailure('Some error message here'));
    }
  } catch (error) {
    console.error("Error adding song to playlist: ", error);
    dispatch(addSongToPlaylistFailure(error.toString()));
  }
};

export const removeSongFromPlaylist = (songId, playlistTitle) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_SONG_FROM_PLAYLIST }); // This represents the start of the process
    const response = await apiRemoveSongFromPlaylist(songId, playlistTitle);

    // Similar handling here as in the addSongToPlaylist action
    if (response.success) {
      dispatch(removeSongFromPlaylistSuccess());
    } else {
      dispatch(removeSongFromPlaylistFailure('Some error message here'));
    }
  } catch (error) {
    console.error("Error removing song from playlist: ", error);
    dispatch(removeSongFromPlaylistFailure(error.toString()));
  }
};
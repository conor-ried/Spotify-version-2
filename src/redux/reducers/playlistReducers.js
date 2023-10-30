import {
    GET_PLAYLISTS_START,
    GET_PLAYLISTS_SUCCESS,
    GET_PLAYLISTS_FAILURE,
    // ... other imports
  } from '../actions/playlistActions';
  
  const initialState = {
    playlists: [], // ensures it's an array
    loading: false,
    error: null,
  };
  
  const playlistReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PLAYLISTS_START:
        return {
          ...state,
          loading: true,
        };
        case GET_PLAYLISTS_SUCCESS:
            console.log('Payload 22:', action.payload); // Temporarily log the incoming payload
            return {
              ...state,
              loading: false,
              playlists: action.payload, // this should be your array of playlists
            };
      case GET_PLAYLISTS_FAILURE:
        console.log('Payload 29:', action.payload); 
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      // ... other cases
      default:
        return state;
    }
  };
  
  export default playlistReducer;
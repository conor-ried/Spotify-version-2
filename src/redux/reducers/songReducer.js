import { FETCH_SONGS_SUCCESS, FETCH_SONGS_FAILURE } from '../actions/songActions';

const initialState = {
    songs: [],
    error: null
};

const songReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SONGS_SUCCESS:
            return { ...state, songs: action.payload, error: null };
        case FETCH_SONGS_FAILURE:
            return { ...state, error: action.payload, songs: [] };
        default:
            return state;
    }
};

export default songReducer;
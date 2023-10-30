import { combineReducers } from 'redux';
import authReducer from './authReducer';
import songReducer from './songReducer';
import playlistReducer from './playlistReducers';

const rootReducer = combineReducers({
    auth: authReducer,
    songs: songReducer,
    playlist: playlistReducer
});

export default rootReducer;
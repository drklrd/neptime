import {combineReducers} from 'redux';
import todos from './todoReducer';
import bookmarks from './bookmarksReducer';

const rootReducer = combineReducers({
    todos,
    bookmarks
});

export default rootReducer;